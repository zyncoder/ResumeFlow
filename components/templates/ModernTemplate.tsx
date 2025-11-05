import React from 'react';
import type { Resume } from '../../types';

declare const marked: any;

interface TemplateProps {
  resume: Resume;
}

const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { contact, summary, experience, education, skills, projects, certifications } = resume;

  const locationString = [
    contact.state_show_on_resume ? contact.state : null,
    contact.country_show_on_resume ? contact.country : null
  ].filter(Boolean).join(', ');

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-4">
      <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-gray-300 mb-2 pb-1 text-gray-800">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="font-sans text-sm text-gray-700">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wider text-black">{contact.full_name}</h1>
        <div className="flex justify-center gap-x-3 gap-y-1 text-xs mt-2 flex-wrap">
          {locationString && (
            <>
              <span>{locationString}</span>
              <span className="text-gray-400">|</span>
            </>
          )}
          <span>{contact.email}</span>
          <span className="text-gray-400">|</span>
          <span>{contact.phone}</span>
          <span className="text-gray-400">|</span>
          <a href={contact.linkedin_url} className="text-blue-600 hover:underline">LinkedIn</a>
           {contact.personal_website && <>
            <span className="text-gray-400">|</span>
            <a href={contact.personal_website} className="text-blue-600 hover:underline">Website</a>
           </>}
        </div>
      </header>
      
      {summary && <Section title="Summary"><p>{summary}</p></Section>}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map(exp => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-md text-black">{exp.role}</h3>
                <span className="text-xs font-mono text-gray-500">{exp.start_date} - {exp.end_date}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <h4 className="italic text-sm text-gray-600">{exp.company}</h4>
                <span className="text-xs font-mono text-gray-500">{exp.location}</span>
              </div>
              <div
                className="mt-1 text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1"
                dangerouslySetInnerHTML={{ __html: marked.parse(exp.description) }}
              />
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map(proj => (
            <div key={proj.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-md text-black">{proj.title}</h3>
                 <span className="text-xs font-mono text-gray-500">{proj.start_date} - {proj.end_date}</span>
              </div>
              <h4 className="italic text-sm text-gray-600">{proj.organization}</h4>
              <div
                className="mt-1 text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1"
                dangerouslySetInnerHTML={{ __html: marked.parse(proj.description) }}
              />
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map(edu => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-black">{edu.institution}</h3>
                <span className="text-xs font-mono text-gray-500">{edu.graduation_year}</span>
              </div>
              <p className="italic text-gray-600">{edu.degree}{edu.minor && `, Minor in ${edu.minor}`}</p>
              {edu.gpa && <p className="text-xs">GPA: {edu.gpa}</p>}
              {edu.additional_info && (
                <div 
                  className="text-xs mt-1 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1"
                  dangerouslySetInnerHTML={{ __html: marked.parse(edu.additional_info) }}
                />
              )}
            </div>
          ))}
        </Section>
      )}
      
       {certifications.length > 0 && (
        <Section title="Certifications">
          {certifications.map(cert => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-black">{cert.certificate_name}</h3>
                <span className="text-xs font-mono text-gray-500">{cert.issue_year}</span>
              </div>
              <p className="italic text-gray-600">{cert.issuing_organization}</p>
              {cert.relevance && (
                <div 
                  className="text-xs mt-1 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1"
                  dangerouslySetInnerHTML={{ __html: marked.parse(cert.relevance) }}
                />
              )}
            </div>
          ))}
        </Section>
      )}

      {skills && (
        <Section title="Skills">
          <p className="whitespace-pre-wrap">{skills}</p>
        </Section>
      )}
    </div>
  );
};

export default ModernTemplate;