import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { contactService } from "@/services/contactService";
import { emailService } from "@/services/emailService";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().regex(/^[0-9+\-\s]{7,15}$/, "Enter a valid phone"),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});
type Values = z.infer<typeof schema>;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — INFYNUX Academy" },
      { name: "description", content: "Get in touch with the INFYNUX Academy team." },
      { property: "og:title", content: "Contact — INFYNUX Academy" },
      { property: "og:description", content: "Email, phone, WhatsApp, and location." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (d: Values) => {
    try {
      await contactService.submitMessage({
        name: d.name,
        email: d.email,
        phone: d.phone,
        message: d.message,
      });

      // Fire and forget email notification
      emailService.sendContactNotification({
        name: d.name,
        email: d.email,
        phone: d.phone,
        message: d.message,
      });

      toast.success("Message sent!", { description: "We'll get back to you shortly." });
      reset();
    } catch (error: any) {
      toast.error("Failed to send message.", { description: error.message || "Please try again later." });
    }
  };

  const items = [
    { icon: Mail, label: "Email", value: "hello@infynux.academy" },
    { icon: Phone, label: "Phone", value: "+91 98765 43210" },
    { icon: MessageCircle, label: "WhatsApp", value: "+91 98765 43210" },
    { icon: MapPin, label: "Location", value: "Bengaluru, India" },
  ];

  return (
    <SiteLayout>
      <section className="hero-bg pt-16 pb-12">
        <div className="container-x text-center">
          <SectionHeader eyebrow="Contact Us" title="Let's build your future together" description="Have a question about programs, internships, or partnerships? We'd love to hear from you." />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <div data-aos="fade-right" className="space-y-4">
            {items.map((it) => (
              <div key={it.label} className="card-premium p-5 flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--electric)]/15 text-[var(--cyan)] border border-[var(--cyan)]/15">
                  <it.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">{it.label}</div>
                  <div className="text-white font-semibold">{it.value}</div>
                </div>
              </div>
            ))}
            <div className="card-premium overflow-hidden">
              <iframe
                title="INFYNUX Academy location"
                src="https://www.google.com/maps?q=Bengaluru&output=embed"
                className="w-full h-64 border-0 opacity-80"
                loading="lazy"
              />
            </div>
          </div>

          <form data-aos="fade-left" onSubmit={handleSubmit(onSubmit)} className="card-premium p-8 grid gap-4">
            <h3 className="text-2xl font-bold text-white">Send us a message</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label className="text-xs font-semibold text-[var(--cyan)] uppercase tracking-wider">Name *</Label>
                <Input {...register("name")} placeholder="Your name" className="bg-white/5 border-[var(--cyan)]/15 text-white placeholder:text-white/30" />
                {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs font-semibold text-[var(--cyan)] uppercase tracking-wider">Email *</Label>
                <Input type="email" {...register("email")} placeholder="you@email.com" className="bg-white/5 border-[var(--cyan)]/15 text-white placeholder:text-white/30" />
                {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold text-[var(--cyan)] uppercase tracking-wider">Phone *</Label>
              <Input type="tel" {...register("phone")} placeholder="+91 ..." className="bg-white/5 border-[var(--cyan)]/15 text-white placeholder:text-white/30" />
              {errors.phone && <span className="text-xs text-destructive">{errors.phone.message}</span>}
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold text-[var(--cyan)] uppercase tracking-wider">Message *</Label>
              <Textarea rows={5} {...register("message")} placeholder="How can we help?" className="bg-white/5 border-[var(--cyan)]/15 text-white placeholder:text-white/30" />
              {errors.message && <span className="text-xs text-destructive">{errors.message.message}</span>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="btn-cta rounded-full px-6 self-start">
              <Send className="h-4 w-4 mr-1.5" /> {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
