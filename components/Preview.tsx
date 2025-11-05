import React, { useState, useRef, useEffect } from 'react';
import type { Resume } from '../types';
import ModernTemplate from './templates/ModernTemplate';

declare const htmlToDocx: any;
declare const saveAs: any;

interface PreviewProps {
  resume: Resume;
}

const Preview: React.FC<PreviewProps> = ({ resume }) => {
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

export default Preview;