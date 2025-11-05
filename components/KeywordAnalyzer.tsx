import React, { useState } from 'react';
// FIX: The file `services/keywordService.ts` was empty and not exporting anything. Implemented keyword extraction logic and exported the function.
import { extractKeywords } from '../services/keywordService';
import { analyzeResumeWithGemini } from '../services/geminiService';
import type { Resume } from '../types';

interface KeywordAnalyzerProps {
  resume: Resume;
  isOpen: boolean;
  onClose: () => void;
}

const KeywordAnalyzer: React.FC<KeywordAnalyzerProps> = ({ resume, isOpen, onClose }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a job description.');
      return;
    }
    setError('');
    setIsLoading(true);
    setAnalysisResult('');
    try {
      const result = await analyzeResumeWithGemini(resume, jobDescription);
      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to analyze. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getResumeKeywords = () => {
      const resumeText = `${resume.summary} ${resume.experience.map(e => e.description).join(' ')} ${resume.skills}`;
      return extractKeywords(resumeText);
  }

  const jobKeywords = extractKeywords(jobDescription);
  const resumeKeywords = getResumeKeywords();
  const matchedKeywords = jobKeywords.filter(k => resumeKeywords.includes(k));
  const missingKeywords = jobKeywords.filter(k => !resumeKeywords.includes(k));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-primary-bg rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="p-4 border-b border-border-color flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary-text">ATS Analyzer</h2>
          <button onClick={onClose} className="text-primary-text text-2xl">&times;</button>
        </div>
        
        <div className="flex-grow overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {/* Left side: Input & Keyword Analysis */}
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
            <div>
              <label htmlFor="job-description" className="block text-sm font-medium text-secondary-text mb-1">
                Paste Job Description
              </label>
              <textarea
                id="job-description"
                rows={10}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-2 border border-border-color rounded-md bg-secondary-bg text-primary-text focus:ring-2 focus:ring-accent"
                placeholder="Paste the full job description here..."
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold disabled:bg-gray-500"
            >
              {isLoading ? 'Analyzing...' : 'Analyze with Gemini'}
            </button>
            <div className="space-y-3">
                <h3 className="font-semibold text-primary-text">Keyword Match Analysis</h3>
                <p className="text-sm text-secondary-text">Matching {matchedKeywords.length} of {jobKeywords.length} keywords.</p>
                <div>
                    <h4 className="font-semibold text-green-500">Matched Keywords</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {matchedKeywords.map(k => <span key={k} className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">{k}</span>)}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-red-500">Missing Keywords</h4>
                     <div className="flex flex-wrap gap-1 mt-1">
                        {missingKeywords.map(k => <span key={k} className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">{k}</span>)}
                    </div>
                </div>
            </div>
          </div>
          
          {/* Right side: Gemini Analysis */}
          <div className="overflow-y-auto bg-secondary-bg p-4 rounded-md border border-border-color">
            <h3 className="font-semibold text-primary-text mb-2">Gemini AI Analysis</h3>
            {isLoading && <p className="text-secondary-text">Generating analysis...</p>}
            {analysisResult && (
              <pre className="text-sm whitespace-pre-wrap font-sans text-primary-text">
                {analysisResult}
              </pre>
            )}
            {!isLoading && !analysisResult && <p className="text-secondary-text">Analysis will appear here.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordAnalyzer;