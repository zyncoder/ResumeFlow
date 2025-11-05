import React from 'react';
import type { Resume, Experience, Education, Certification, Project } from '../types';
import EditorSection from './EditorSection';

interface EditorProps {
  activeTab: string;
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

const Editor: React.FC<EditorProps> = ({ activeTab, resume, setResume }) => {

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
                // FIX: Explicitly pass render prop as `children` attribute to resolve TypeScript error.
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
                // FIX: Explicitly pass render prop as `children` attribute to resolve TypeScript error.
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
                // FIX: Explicitly pass render prop as `children` attribute to resolve TypeScript error.
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
                // FIX: Explicitly pass render prop as `children` attribute to resolve TypeScript error.
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


export default Editor;