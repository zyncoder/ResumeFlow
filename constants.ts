import type { Resume } from './types';

export const DEFAULT_RESUME: Resume = {
  contact: {
    full_name: "Charles Bloomberg",
    email: "charlesbloomberg@wisc.edu",
    phone: "(621) 799-5548",
    linkedin_url: "https://linkedin.com/in/cbloomberg",
    personal_website: "https://www.charlesbloomberg.com",
    show_on_resume: true,
    country: "",
    country_show_on_resume: true,
    state: "",
    state_show_on_resume: true
  },
  experience: [
    {
      id: 'exp1',
      role: "Marketing Analyst",
      company: "Google",
      start_date: "November 2025",
      end_date: "November 2025",
      location: "New York, NY",
      description: "• Organised and implemented Google Analytics data tracking campaigns to maximize the effectiveness of email remarketing initiatives that were deployed using Salesforce's marketing cloud software."
    }
  ],
  projects: [
    {
      id: 'proj1',
      title: 'Volunteer',
      organization: 'Habitat for Humanity',
      start_date: 'November 2025',
      end_date: 'November 2025',
      project_url: 'https://www.rezi.ai/',
      description: '• Volunteered to help renovate a house and managed a team of 6.'
    }
  ],
  education: [
    {
      id: 'edu1',
      degree: "Bachelor of Science in Economics",
      institution: "University of Wisconsin, Madison",
      location: "Madison, WI",
      graduation_year: "2025",
      minor: "Mathematics",
      gpa: "3.82",
      additional_info: "• Awarded full-scholarship for 4 years due to grades."
    }
  ],
  certifications: [
    {
      id: 'cert1',
      certificate_name: "Project Management Professional (PMP)",
      issuing_organization: "Project Management Institute",
      issue_year: "2025",
      relevance: "• Certified in a standardized and evolving set of project management principles."
    }
  ],
  skills: "Front End: HTML, CSS, Javascript",
  summary: "Results-driven professional with a proven track record of success in managing complex projects and driving business growth. Adept at leveraging data analytics and market research to develop and execute strategic plans. Seeking to apply my expertise in a challenging new role.",
};
