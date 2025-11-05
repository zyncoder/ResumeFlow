import React from 'react';
import type { Resume } from '../../types';

interface TemplateProps {
  resume: Resume;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { contact, summary, experience, education, skills, projects, certifications } = resume;

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-4">
      <h2 className="text-lg font-bold uppercase tracking-widest">{title}</h2>
      <div className="border-b border-black w-full my-1"></div>
      {children}
    </section>
  );

  return (
    <div className="font-serif text-sm">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold">{contact.full_name}</h1>
        <p className="text-xs">
          {contact.phone} | {contact.email}
        </p>
        <p className="text-xs">
          <a href={contact.linkedin_url} className="text-blue-600 hover:underline">LinkedIn</a> | 
          <a href={contact.personal_website} className="text-blue-600 hover:underline">Website</a>
        </p>
      </header>
      
      {summary && <Section title="Summary"><p className="mt-1">{summary}</p></Section>}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map(exp => (
            <div key={exp.id} className="mb-3 mt-1">
              <div className="flex justify-between items-end">
                  <h3 className="text-md font-bold">{exp.company}, {exp.location}</h3>
                  <span className="text-xs">{exp.start_date} - {exp.end_date}</span>
              </div>
              <p className="italic">{exp.role}</p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </Section>
      )}
      
       {projects.length > 0 && (
        <Section title="Projects">
          {projects.map(proj => (
            <div key={proj.id} className="mb-3 mt-1">
               <div className="flex justify-between items-end">
                  <h3 className="text-md font-bold">{proj.title}</h3>
                  <span className="text-xs">{proj.start_date} - {proj.end_date}</span>
              </div>
              <p className="italic">{proj.organization}</p>
              <p className="text-sm mt-1">{proj.description}</p>
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map(edu => (
            <div key={edu.id} className="flex justify-between items-end mt-1">
              <div>
                <h3 className="font-bold">{edu.institution}, {edu.location}</h3>
                <p>{edu.degree}, {edu.gpa ? `GPA: ${edu.gpa}` : ''}</p>
              </div>
              <span>{edu.graduation_year}</span>
            </div>
          ))}
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
            {certifications.map(cert => (
                <div key={cert.id} className="flex justify-between items-end mt-1">
                    <div>
                        <h3 className="font-bold">{cert.certificate_name}</h3>
                        <p>{cert.issuing_organization}</p>
                    </div>
                    <span>{cert.issue_year}</span>
                </div>
            ))}
        </Section>
      )}
      
      {skills && <Section title="Skills"><p className="mt-1">{skills}</p></Section>}
    </div>
  );
};

export default ClassicTemplate;
