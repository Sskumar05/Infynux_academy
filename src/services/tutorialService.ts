import { supabase } from '../lib/supabase';

export interface Tutorial {
  id?: string;
  title: string;
  category: string;
  thumbnail?: string;
  description?: string;
  video_url: string;
  difficulty_level: string;
  duration?: string;
  created_at?: string;
}

export const tutorialService = {
  async getAllTutorials() {
    const { data, error } = await supabase
      .from('tutorials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createTutorial(tutorial: Tutorial) {
    const { data, error } = await supabase
      .from('tutorials')
      .insert([tutorial])
      .select();

    if (error) throw error;
    return data;
  },

  async updateTutorial(id: string, tutorial: Partial<Tutorial>) {
    const { data, error } = await supabase
      .from('tutorials')
      .update(tutorial)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  },

  async deleteTutorial(id: string) {
    const { error } = await supabase
      .from('tutorials')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
