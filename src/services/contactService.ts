import { supabase } from '../lib/supabase';

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at?: string;
}

export const contactService = {
  async submitMessage(msg: ContactMessage) {
    // const { data, error } = await supabase
    //   .from('contact_messages')
    //   .insert([msg])
    //   .select();

    // if (error) throw error;
    // return data;
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: msg.name,
          email: msg.email,
          phone: msg.phone,
          message: msg.message,
        },
      ]);

    if (error) console.log(error);
  },

  async getAllMessages() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async deleteMessage(id: string) {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
