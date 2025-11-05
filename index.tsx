import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

declare const marked: any;
declare const htmlToDocx: any;
declare const saveAs: any;

// --- TYPE DEFINITIONS ---
interface Contact {
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

interface Experience {
  id: string;
  role: string;
  company: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
}

interface Project {
  id: string;
  title: string;
  organization: string;
  start_date: string;
  end_date: string;
  project_url: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduation_year: string;
  minor: string;
  gpa: string;
  additional_info: string;
}

interface Certification {
  id: string;
  certificate_name: string;
  issuing_organization: string;
  issue_year: string;
  relevance: string;
}


interface Resume {
  contact: Contact;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  skills: string;
  summary: string;
}

type Tab = 'contact' | 'experience' | 'project' | 'education' | 'certifications' | 'skills' | 'summary' | 'preview';


// --- CONSTANTS ---
const DEFAULT_RESUME: Resume = {
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


// --- COMPONENTS ---

const ModernTemplate: React.FC<{ resume: Resume; }> = ({ resume }) => {
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
      
      {summary && <Section title="Summary">
        <div
          className="[&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1"
          dangerouslySetInnerHTML={{ __html: marked.parse(summary) }}
        />
      </Section>}

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
          <div
            className="whitespace-pre-wrap [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1"
            dangerouslySetInnerHTML={{ __html: marked.parse(skills) }}
          />
        </Section>
      )}
    </div>
  );
};

const TabButton: React.FC<{label: string; isActive: boolean; onClick: () => void;}> = ({ label, isActive, onClick }) => {
    const baseClasses = "px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-200 uppercase";
    const activeClasses = "bg-accent text-white";
    const inactiveClasses = "hover:bg-secondary-bg text-secondary-text";

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            {label}
        </button>
    )
}

const Header: React.FC<{ activeTab: Tab; setActiveTab: (tab: Tab) => void;}> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'contact', label: 'Contact' },
    { id: 'experience', label: 'Experience' },
    { id: 'project', label: 'Project' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'skills', label: 'Skills' },
    { id: 'summary', label: 'Summary' },
    { id: 'preview', label: 'Preview' },
  ];

  return (
    <header className="bg-primary-bg p-4 border-b border-border-color">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <nav className="flex items-center space-x-1 flex-wrap justify-center">
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </nav>
      </div>
    </header>
  );
};


const EditorSection = <T extends { id: string; [key: string]: any }>({ title, items, setItems, newItem, children }: {
  title: string;
  items: T[];
  setItems: (items: T[]) => void;
  newItem: Omit<T, 'id'>;
  children: (item: T, handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, index: number) => React.ReactNode;
}) => {
  const handleAddItem = () => {
    const newId = `${title.toLowerCase()}-${Date.now()}`;
    setItems([...items, { ...newItem, id: newId } as T]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setItems(updatedItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={item.id} className="mb-8 p-6 border border-border-color rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-primary-text">{title} {index + 1}</h3>
            {items.length > 0 && (
              <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 text-sm hover:underline">
                Remove
              </button>
            )}
          </div>
          {children(item, (e) => handleChange(e, index), index)}
        </div>
      ))}
      <div className="flex justify-end mt-6">
        <button onClick={handleAddItem} className="px-6 py-3 bg-accent text-white rounded-md hover:opacity-90 font-semibold">
          Add to {title}
        </button>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder = '' }: { label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string}) => (
    <div>
        <label className="text-xs text-secondary-text font-bold uppercase tracking-wider mb-2 block">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-3 border border-border-color rounded-md bg-secondary-bg text-primary-text focus:ring-2 focus:ring-accent"
        />
    </div>
);

const TextAreaField = ({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void}) => (
    <div>
        <label className="text-xs text-secondary-text font-bold uppercase tracking-wider mb-2 block">{label}</label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={5}
            className="w-full p-3 border border-border-color rounded-md bg-secondary-bg text-primary-text focus:ring-2 focus:ring-accent"
            placeholder="Describe your responsibilities and achievements."
        />
    </div>
);

const Editor: React.FC<{ activeTab: string; resume: Resume; setResume: React.Dispatch<React.SetStateAction<Resume>>; }> = ({ activeTab, resume, setResume }) => {
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setResume(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };
  
  const handleSimpleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = e.target;
      setResume(prev => ({ ...prev, [name]: value }));
  }

  const renderField = (label: string, name: keyof Resume['contact']) => (
    <div>
        <label className="text-xs text-secondary-text font-bold uppercase tracking-wider">
            {label}
        </label>
        <input
            type="text"
            name={name}
            value={resume.contact[name] as string}
            onChange={handleContactChange}
            className="w-full mt-2 p-3 border border-border-color rounded-md bg-secondary-bg text-primary-text focus:ring-2 focus:ring-accent"
        />
    </div>
  );

   const renderToggle = (label: string, name: keyof Resume['contact']) => (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={!!resume.contact[name]}
        onChange={handleContactChange}
        className="h-4 w-4 rounded border-border-color bg-secondary-bg text-accent focus:ring-accent"
      />
      <label htmlFor={name} className="text-sm text-primary-text">
        {label}
      </label>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
        <div className="bg-secondary-bg p-8 rounded-lg border border-border-color">
            {activeTab === 'contact' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderField("Full Name", "full_name")}
                    {renderField("Email Address", "email")}
                    {renderField("Phone Number", "phone")}
                    {renderField("LinkedIn URL", "linkedin_url")}
                    {renderField("Personal Website", "personal_website")}
                    {renderField("Country", "country")}
                    {renderField("State", "state")}
                    <div className="md:col-span-2 grid grid-cols-2 gap-4 pt-4">
                        {renderToggle("Show Country on Resume", "country_show_on_resume")}
                        {renderToggle("Show State on Resume", "state_show_on_resume")}
                    </div>
                </div>
            )}
            
            {activeTab === 'experience' && (
                <EditorSection<Experience>
                    title="Experience"
                    items={resume.experience}
                    setItems={(items) => setResume(prev => ({ ...prev, experience: items }))}
                    newItem={{ role: '', company: '', start_date: '', end_date: '', location: '', description: '' }}
                    children={(item, handleChange) => (
                        <div className="space-y-4">
                            <InputField label="Role" name="role" value={item.role} onChange={handleChange} />
                            <InputField label="Company" name="company" value={item.company} onChange={handleChange} />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Start Date" name="start_date" value={item.start_date} onChange={handleChange} placeholder="e.g. Oct 2022" />
                                <InputField label="End Date" name="end_date" value={item.end_date} onChange={handleChange} placeholder="e.g. Present" />
                            </div>
                            <InputField label="Location" name="location" value={item.location} onChange={handleChange} placeholder="e.g. New York, NY"/>
                            <TextAreaField label="Description" name="description" value={item.description} onChange={handleChange} />
                        </div>
                    )}
                />
            )}

             {activeTab === 'project' && (
                <EditorSection<Project>
                    title="Project"
                    items={resume.projects}
                    setItems={(items) => setResume(prev => ({...prev, projects: items}))}
                    newItem={{title: '', organization: '', start_date: '', end_date: '', project_url: '', description: ''}}
                    children={(item, handleChange) => (
                        <div className="space-y-4">
                             <InputField label="Title" name="title" value={item.title} onChange={handleChange} />
                             <InputField label="Organization" name="organization" value={item.organization} onChange={handleChange} />
                            <div className="grid grid-cols-2 gap-4">
                                 <InputField label="Start Date" name="start_date" value={item.start_date} onChange={handleChange} placeholder="e.g. Oct 2022" />
                                 <InputField label="End Date" name="end_date" value={item.end_date} onChange={handleChange} placeholder="e.g. Present" />
                            </div>
                             <InputField label="Project URL" name="project_url" value={item.project_url} onChange={handleChange} />
                             <TextAreaField label="Description" name="description" value={item.description} onChange={handleChange} />
                        </div>
                    )}
                />
            )}

            {activeTab === 'education' && (
                <EditorSection<Education>
                    title="Education"
                    items={resume.education}
                    setItems={(items) => setResume(prev => ({...prev, education: items}))}
                    newItem={{degree: '', institution: '', location: '', graduation_year: '', minor: '', gpa: '', additional_info: ''}}
                    children={(item, handleChange) => (
                        <div className="space-y-4">
                            <InputField label="Degree" name="degree" value={item.degree} onChange={handleChange}/>
                            <InputField label="Institution" name="institution" value={item.institution} onChange={handleChange}/>
                            <InputField label="Location" name="location" value={item.location} onChange={handleChange}/>
                            <InputField label="Graduation Year" name="graduation_year" value={item.graduation_year} onChange={handleChange}/>
                            <InputField label="Minor" name="minor" value={item.minor} onChange={handleChange}/>
                            <InputField label="GPA" name="gpa" value={item.gpa} onChange={handleChange}/>
                            <TextAreaField label="Additional Info" name="additional_info" value={item.additional_info} onChange={handleChange}/>
                        </div>
                    )}
                />
            )}

            {activeTab === 'certifications' && (
                 <EditorSection<Certification>
                    title="Certifications"
                    items={resume.certifications}
                    setItems={(items) => setResume(prev => ({...prev, certifications: items}))}
                    newItem={{certificate_name: '', issuing_organization: '', issue_year: '', relevance: ''}}
                    children={(item, handleChange) => (
                        <div className="space-y-4">
                            <InputField label="Certificate Name" name="certificate_name" value={item.certificate_name} onChange={handleChange}/>
                            <InputField label="Issuing Organization" name="issuing_organization" value={item.issuing_organization} onChange={handleChange}/>
                            <InputField label="Issue Year" name="issue_year" value={item.issue_year} onChange={handleChange}/>
                            <TextAreaField label="Relevance" name="relevance" value={item.relevance} onChange={handleChange}/>
                        </div>
                    )}
                />
            )}

            {activeTab === 'skills' && (
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-secondary-text font-bold uppercase tracking-wider">
                           Skills
                        </label>
                        <textarea
                            name="skills"
                            value={resume.skills}
                            onChange={handleSimpleChange}
                            rows={6}
                            className="w-full mt-2 p-3 border border-border-color rounded-md bg-secondary-bg text-primary-text focus:ring-2 focus:ring-accent"
                            placeholder="e.g. React, JavaScript, Project Management"
                        />
                    </div>
                </div>
            )}

            {activeTab === 'summary' && (
                <div className="space-y-4">
                    <div>
                         <label className="text-xs text-secondary-text font-bold uppercase tracking-wider">
                           Professional Summary
                        </label>
                        <textarea
                            name="summary"
                            value={resume.summary}
                            onChange={handleSimpleChange}
                            rows={8}
                            className="w-full mt-2 p-3 border border-border-color rounded-md bg-secondary-bg text-primary-text focus:ring-2 focus:ring-accent"
                        />
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};


const Preview: React.FC<{ resume: Resume; }> = ({ resume }) => {
  const [fontFamily, setFontFamily] = useState('font-sans');
  const [fontSize, setFontSize] = useState('text-sm');
  const [pageCount, setPageCount] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculatePages = () => {
      if (contentRef.current) {
        // 11 inches total height - 1.5 inches for top/bottom padding = 9.5 inches content area.
        // 9.5 inches * 96 pixels/inch = 912 pixels per page.
        const pageHeightInPixels = 912;
        const contentHeight = contentRef.current.scrollHeight;
        const calculatedPages = Math.ceil(contentHeight / pageHeightInPixels);
        setPageCount(calculatedPages > 0 ? calculatedPages : 1);
      }
    };

    calculatePages();

    const resizeObserver = new ResizeObserver(calculatePages);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, [resume, fontFamily, fontSize]);

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportDOCX = async () => {
    const printableElement = document.getElementById('printable-resume');
    if (printableElement) {
      try {
        const content = `
          <html>
            <head>
              <meta charset="UTF-8" />
              <style>
                body { font-family: ${fontFamily === 'font-sans' ? 'Calibri, sans-serif' : fontFamily === 'font-serif' ? 'Georgia, serif' : 'Courier New, monospace'}; font-size: 11pt; }
                h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
                ul { margin: 0; padding-left: 20px; }
                p { margin: 0; }
                a { color: #0000EE; text-decoration: underline; }
              </style>
            </head>
            <body>
              ${printableElement.innerHTML}
            </body>
          </html>
        `;
        const fileBuffer = await htmlToDocx.asBlob(content);
        saveAs(fileBuffer, `${resume.contact.full_name}_Resume.docx`);
      } catch (error) {
        console.error("Error exporting to DOCX:", error);
      }
    }
  };
  
  const fontOptions = [
    { value: 'font-sans', label: 'Sans-Serif' },
    { value: 'font-serif', label: 'Serif' },
    { value: 'font-mono', label: 'Monospace' },
  ];
  
  const sizeOptions = [
      { value: 'text-xs', label: 'Small' },
      { value: 'text-sm', label: 'Medium' },
      { value: 'text-base', label: 'Large' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-secondary-bg p-4 rounded-lg flex flex-wrap justify-center items-center gap-x-6 gap-y-4 border border-border-color">
          <div className="flex items-center gap-2">
            <label htmlFor="font-family" className="text-sm font-medium text-secondary-text">Font:</label>
            <select
                id="font-family"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="bg-primary-bg border border-border-color text-primary-text text-sm rounded-md focus:ring-accent focus:border-accent p-2"
            >
                {fontOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-secondary-text">Size:</label>
              <div className="flex items-center rounded-md border border-border-color">
                  {sizeOptions.map((opt, index) => (
                      <button 
                          key={opt.value}
                          onClick={() => setFontSize(opt.value)}
                          className={`px-3 py-1.5 text-xs font-semibold transition-colors duration-200 
                              ${fontSize === opt.value ? 'bg-accent text-white' : 'bg-secondary-bg text-secondary-text hover:bg-primary-bg'}
                              ${index === 0 ? 'rounded-l-md' : ''}
                              ${index === sizeOptions.length - 1 ? 'rounded-r-md' : ''}
                          `}
                      >
                          {opt.label}
                      </button>
                  ))}
              </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-secondary-text">
            <span>Pages:</span>
            <span className="font-semibold text-primary-text">{pageCount}</span>
          </div>

          <div className="relative group">
            <button className="px-4 py-2 bg-accent text-white rounded-md hover:opacity-90 font-semibold flex items-center gap-2">
                <span>Download</span>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-secondary-bg border border-border-color rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
                <a href="#" onClick={(e) => { e.preventDefault(); handleExportPDF(); }} className="block px-4 py-2 text-sm text-primary-text hover:bg-primary-bg rounded-t-md">Export as PDF</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleExportDOCX(); }} className="block px-4 py-2 text-sm text-primary-text hover:bg-primary-bg rounded-b-md">Export as DOCX</a>
            </div>
          </div>
      </div>
        
      <div className="bg-gray-400 p-4 sm:p-8 rounded-lg shadow-inner overflow-x-auto">
        <div 
            id="printable-resume" 
            className={`bg-white text-black shadow-lg mx-auto ${fontFamily} ${fontSize}`}
            style={{ width: '8.5in', minHeight: '11in', padding: '0.75in' }}
        >
          <div ref={contentRef}>
            <ModernTemplate resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
};


const App = () => {
  const LOCAL_STORAGE_KEY = 'resume-builder-data';
  
  const [resume, setResume] = useState<Resume>(() => {
    try {
      const savedResume = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedResume) {
        return JSON.parse(savedResume);
      }
    } catch (error) {
      console.error("Failed to parse resume from localStorage", error);
    }
    return DEFAULT_RESUME;
  });

  const [activeTab, setActiveTab] = useState<Tab>('contact');

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resume));
    } catch (error) {
        console.error("Failed to save resume to localStorage", error);
    }
  }, [resume]);


  return (
    <div className="bg-primary-bg text-primary-text min-h-screen flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow p-4 md:p-8 overflow-y-auto">
        {activeTab === 'preview' ? (
          <Preview
            resume={resume}
          />
        ) : (
          <Editor
            activeTab={activeTab}
            resume={resume}
            setResume={setResume}
          />
        )}
      </main>
    </div>
  );
}

// --- RENDER LOGIC ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
