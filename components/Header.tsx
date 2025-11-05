import React from 'react';
import type { Tab } from '../types';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
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

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
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

export default Header;
