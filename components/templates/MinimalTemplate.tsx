import React from 'react';
import type { Resume } from '../../types';

interface TemplateProps {
  resume: Resume;
}

const MinimalTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { contact, summary, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="font-sans text-sm leading-relaxed">
        <div className="grid grid-cols-3 gap-8">
            <aside className="col-span-1 border-r pr-6">
                <h1 className="text-2xl font-light tracking-widest uppercase">{contact.full_name}</h1>
                <div className="mt-6 space-y-4 text-xs">
                    <section>
                        <h3 className="font-semibold uppercase tracking-wider">Contact</h3>
                        <p>{contact.phone}</p>
                        <p>{contact.email}</p>
                    </section>
                    <section>
                        <h3 className="font-semibold uppercase tracking-wider">Links</h3>
                        <a href={contact.linkedin_url} className="block hover:underline truncate">LinkedIn</a>
                        <a href={contact.personal_website} className="block hover:underline truncate">Website</a>
                    </section>
                    {skills && (
                        <section>
                            <h3 className="font-semibold uppercase tracking-wider">Skills</h3>
                            <p>{skills}</p>
                        </section>
                    )}
                </div>
            </aside>

            <main className="col-span-2">
                {summary && (
                  <section className="mb-5">
                      <h2 className="text-sm font-semibold uppercase tracking-wider border-b pb-1 mb-2">Profile</h2>
                      <p className="text-sm">{summary}</p>
                  </section>
                )}
                
                {experience.length > 0 && (
                  <section className="mb-5">
                      <h2 className="text-sm font-semibold uppercase tracking-wider border-b pb-1 mb-2">Experience</h2>
                      {experience.map(exp => (
                      <div key={exp.id} className="mb-3">
                          <div className="flex justify-between items-baseline">
                          <h3 className="font-semibold">{exp.role}</h3>
                          <span className="text-xs">{exp.start_date} - {exp.end_date}</span>
                          </div>
                          <h4 className="italic text-gray-600">{exp.company} | {exp.location}</h4>
                          <p className="mt-1 text-sm">{exp.description}</p>
                      </div>
                      ))}
                  </section>
                )}

                 {projects.length > 0 && (
                  <section className="mb-5">
                      <h2 className="text-sm font-semibold uppercase tracking-wider border-b pb-1 mb-2">Projects</h2>
                      {projects.map(proj => (
                      <div key={proj.id} className="mb-3">
                          <div className="flex justify-between items-baseline">
                          <h3 className="font-semibold">{proj.title}</h3>
                          <span className="text-xs">{proj.start_date} - {proj.end_date}</span>
                          </div>
                          <h4 className="italic text-gray-600">{proj.organization}</h4>
                          <p className="mt-1 text-sm">{proj.description}</p>
                      </div>
                      ))}
                  </section>
                )}
                
                {education.length > 0 && (
                  <section>
                      <h2 className="text-sm font-semibold uppercase tracking-wider border-b pb-1 mb-2">Education</h2>
                      {education.map(edu => (
                      <div key={edu.id} className="mb-2">
                          <div className="flex justify-between items-baseline">
                          <h3 className="font-semibold">{edu.institution}</h3>
                          <span className="text-xs">{edu.graduation_year}</span>
                          </div>
                          <p className="italic text-gray-600">{edu.degree}</p>
                      </div>
                      ))}
                  </section>
                )}
            </main>
        </div>
    </div>
  );
};

export default MinimalTemplate;
