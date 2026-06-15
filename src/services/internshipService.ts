// import { supabase } from '../lib/supabase';

// export interface InternshipApplication {
//   id?: string;
//   user_id?: string;
//   full_name: string;
//   email: string;
//   mobile_number: string;
//   college_name: string;
//   qualification: string;
//   internship_domain: string;
//   linkedin_url?: string;
//   github_url?: string;
//   resume_url: string;
//   status?: 'Pending' | 'Approved' | 'Rejected';
//   created_at?: string;
// }

// export const internshipService = {
//   async submitApplication(application: InternshipApplication) {
//     const { data, error } = await supabase
//       .from('internship_applications')
//       .insert([application])
//       .select();

//     if (error) throw error;
//     return data;
//   },

//   async uploadResume(file: File) {
//     const fileExt = file.name.split('.').pop();
//     const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
//     const filePath = `${fileName}`;

//     const { data, error } = await supabase.storage
//       .from('resumes')
//       .upload(filePath, file, {
//         cacheControl: '3600',
//         upsert: false
//       });

//     if (error) throw error;
    
//     // Get public URL
//     const { data: publicUrlData } = supabase.storage
//       .from('resumes')
//       .getPublicUrl(filePath);

//     return publicUrlData.publicUrl;
//   },

//   async getAllApplications() {
//     const { data, error } = await supabase
//       .from('internship_applications')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (error) throw error;
//     return data;
//   },

//   async updateStatus(id: string, status: 'Pending' | 'Approved' | 'Rejected') {
//     const { data, error } = await supabase
//       .from('internship_applications')
//       .update({ status })
//       .eq('id', id)
//       .select();

//     if (error) throw error;
//     return data;
//   },
  
//   async deleteApplication(id: string) {
//     const { error } = await supabase
//       .from('internship_applications')
//       .delete()
//       .eq('id', id);

//     if (error) throw error;
//     return true;
//   }
// };


import { supabase } from '../lib/supabase';

export interface InternshipApplication {
  id?: string;
  user_id?: string;
  full_name: string;
  email: string;
  mobile_number: string;
  college_name: string;
  qualification: string;
  internship_domain: string;
  linkedin_url?: string;
  github_url?: string;
  resume_url: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
  created_at?: string;
}

export const internshipService = {
  async submitApplication(application: InternshipApplication) {
    // FIX 1: Get current logged-in user
    const { data: { user } } = await supabase.auth.getUser();
    
    // FIX 2: Add user_id to application
    const applicationWithUserId = {
      ...application,
      user_id: user?.id || application.user_id
    };

    const { data, error } = await supabase
      .from('internship_applications')
      .insert([applicationWithUserId])
      .select();

    if (error) throw error;
    return data;
  },

  async uploadResume(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('resumes')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  },

  async getAllApplications() {
    const { data: { user } } = await supabase.auth.getUser();
    
    // FIX 3: Get only current user's applications
    const { data, error } = await supabase
      .from('internship_applications')
      .select('*')
      .eq('user_id', user?.id)  // Add this filter
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: 'Pending' | 'Approved' | 'Rejected') {
    const { data: { user } } = await supabase.auth.getUser();
    
    // FIX 4: Update only if user owns this application
    const { data, error } = await supabase
      .from('internship_applications')
      .update({ status })
      .eq('id', id)
      .eq('user_id', user?.id)  // Add this for security
      .select();

    if (error) throw error;
    return data;
  },
  
  async deleteApplication(id: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    // FIX 5: Delete only if user owns this application
    const { error } = await supabase
      .from('internship_applications')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id);  // Add this for security

    if (error) throw error;
    return true;
  }
};