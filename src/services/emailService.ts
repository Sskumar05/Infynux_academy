import { supabase } from '../lib/supabase';

export const emailService = {
  async sendEmail(type: string, payload: any) {
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: { type, payload }
      });

      if (error) {
        console.error(`Error sending ${type} email:`, error);
        return false;
      }
      return true;
    } catch (err) {
      console.error(`Error invoking send-email function:`, err);
      return false;
    }
  },

  sendInternshipConfirmation(payload: { name: string, email: string, domain: string }) {
    // Fire and forget
    this.sendEmail('internship_confirmation', payload);
  },

  sendAdminNotification(payload: { name: string, email: string, mobile: string, college: string, domain: string }) {
    this.sendEmail('admin_notification', payload);
  },

  sendContactNotification(payload: { name: string, email: string, phone: string, message: string }) {
    this.sendEmail('contact_form', payload);
  },

  sendApprovalEmail(payload: { name: string, email: string, domain: string }) {
    this.sendEmail('approval', payload);
  },

  sendRejectionEmail(payload: { name: string, email: string, domain: string }) {
    this.sendEmail('rejection', payload);
  }
};
