import { supabase } from '../lib/supabase';

export interface Roadmap {
  id?: string;
  domain_name: string;
  title: string;
  description?: string;
  pdf_url?: string;
  created_at?: string;
}

export const roadmapService = {
  async getAllRoadmaps() {
    const { data, error } = await supabase
      .from('roadmaps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createRoadmap(roadmap: Roadmap) {
    const { data, error } = await supabase
      .from('roadmaps')
      .insert([roadmap])
      .select();

    if (error) throw error;
    return data;
  },

  async updateRoadmap(id: string, roadmap: Partial<Roadmap>) {
    const { data, error } = await supabase
      .from('roadmaps')
      .update(roadmap)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  },

  async deleteRoadmap(id: string) {
    const { error } = await supabase
      .from('roadmaps')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
