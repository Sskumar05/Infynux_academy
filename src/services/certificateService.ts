import { supabase } from '../lib/supabase';

export interface Certificate {
  id?: string;
  certificate_id: string;
  student_name: string;
  course_name: string;
  issue_date: string;
  certificate_url?: string;
  created_at?: string;
}

export const certificateService = {
  async getAllCertificates() {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async verifyCertificate(certificateId: string) {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('certificate_id', certificateId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // ignore no rows returned
    return data;
  },

  async createCertificate(cert: Certificate) {
    const { data, error } = await supabase
      .from('certificates')
      .insert([cert])
      .select();

    if (error) throw error;
    return data;
  },

  async updateCertificate(id: string, cert: Partial<Certificate>) {
    const { data, error } = await supabase
      .from('certificates')
      .update(cert)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  },

  async deleteCertificate(id: string) {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
