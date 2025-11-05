import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Header from './components/Header';
import { DEFAULT_RESUME } from './constants';
import type { Resume, Tab } from './types';

const LOCAL_STORAGE_KEY = 'resume-builder-data';

function App() {
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

export default App;