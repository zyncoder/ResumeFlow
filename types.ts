export interface Contact {
  full_name: string;
  email: string;
  phone: string;
  linkedin_url: string;
  personal_website: string;
  show_on_resume: boolean;
  country: string;
  country_show_on_resume: boolean;
  state: string;
  state_show_on_resume: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  organization: string;
  start_date: string;
  end_date: string;
  project_url: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduation_year: string;
  minor: string;
  gpa: string;
  additional_info: string;
}

export interface Certification {
  id: string;
  certificate_name: string;
  issuing_organization: string;
  issue_year: string;
  relevance: string;
}


export interface Resume {
  contact: Contact;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  skills: string;
  summary: string;
}

export type Tab = 'contact' | 'experience' | 'project' | 'education' | 'certifications' | 'skills' | 'summary' | 'preview';
