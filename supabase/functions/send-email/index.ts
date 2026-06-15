import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'sshathiskumar54@gmail.com' // Fallback if not set

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  type: 'internship_confirmation' | 'admin_notification' | 'contact_form' | 'approval' | 'rejection'
  payload: any
}

// Brand Colors
const PRIMARY = '#D4AF37'
const SECONDARY = '#0F172A'

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background-color: ${SECONDARY}; padding: 30px 20px; text-center: center; border-bottom: 4px solid ${PRIMARY}; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; text-align: center; }
    .content { padding: 30px 20px; line-height: 1.6; }
    .content h2 { color: ${SECONDARY}; margin-top: 0; }
    .footer { background-color: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
    .highlight { color: ${PRIMARY}; font-weight: 600; }
    .details-box { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 6px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>INFYNUX Academy</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      INFYNUX Academy<br>
      Building Future-Ready Careers
    </div>
  </div>
</body>
</html>
`

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error('Missing RESEND_API_KEY environment variable.')
    }

    const { type, payload } = await req.json() as EmailRequest

    let to = ''
    let subject = ''
    let html = ''

    switch (type) {
      case 'internship_confirmation':
        to = payload.email
        subject = 'Application Received – INFYNUX Academy'
        html = baseTemplate(`
          <h2>Hello ${payload.name},</h2>
          <p>Thank you for applying for the <span class="highlight">${payload.domain}</span> Internship Program at INFYNUX Academy.</p>
          <p>We have successfully received your application and our team will review it shortly.</p>
          <div class="details-box">
            <strong>Application Details:</strong><br>
            Name: ${payload.name}<br>
            Email: ${payload.email}<br>
            Domain Applied: ${payload.domain}
          </div>
          <p>We will contact you soon.</p>
          <p>Regards,<br>INFYNUX Academy Team</p>
        `)
        break

      case 'admin_notification':
        to = ADMIN_EMAIL
        subject = 'New Internship Application Received'
        html = baseTemplate(`
          <h2>New Internship Application</h2>
          <p>A new internship application has been submitted.</p>
          <div class="details-box">
            <strong>Details:</strong><br>
            Name: ${payload.name}<br>
            Email: ${payload.email}<br>
            Mobile Number: ${payload.mobile}<br>
            College Name: ${payload.college}<br>
            Internship Domain: ${payload.domain}
          </div>
          <p>Please review the application in the admin dashboard.</p>
        `)
        break

      case 'contact_form':
        to = ADMIN_EMAIL
        subject = 'New Contact Form Submission'
        html = baseTemplate(`
          <h2>New Contact Form Submission</h2>
          <div class="details-box">
            Name: ${payload.name}<br>
            Email: ${payload.email}<br>
            Phone: ${payload.phone}
          </div>
          <p><strong>Message:</strong></p>
          <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; font-style: italic;">
            ${payload.message.replace(/\n/g, '<br>')}
          </div>
        `)
        break

      case 'approval':
        to = payload.email
        subject = 'Internship Application Approved'
        html = baseTemplate(`
          <h2>Congratulations ${payload.name}!</h2>
          <p>Your application for <span class="highlight">${payload.domain}</span> has been <strong>approved</strong>.</p>
          <p>Our team will contact you shortly with the next steps to begin your internship journey.</p>
          <p>Regards,<br>INFYNUX Academy</p>
        `)
        break

      case 'rejection':
        to = payload.email
        subject = 'Internship Application Status Update'
        html = baseTemplate(`
          <h2>Hello ${payload.name},</h2>
          <p>Thank you for your interest in INFYNUX Academy.</p>
          <p>After reviewing your application for the ${payload.domain} program, we are unable to proceed at this time.</p>
          <p>We received many strong applications, and we encourage you to apply again in the future as you continue to build your skills.</p>
          <p>Regards,<br>INFYNUX Academy</p>
        `)
        break

      default:
        throw new Error(`Invalid email type: ${type}`)
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'INFYNUX Academy <noreply@infynux.com>', // User needs to verify this domain in Resend
        to: [to],
        subject: subject,
        html: html,
      })
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Failed to send email via Resend')
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
