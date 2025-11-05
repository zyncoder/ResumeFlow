import React, { forwardRef } from 'react';
import html2pdf from 'html2pdf.js';
import type { Resume } from '../types';
import ModernTemplate from './templates/ModernTemplate';

interface PreviewProps {
  resume: Resume;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const { resume } = props;

  const handleExportPDF = () => {
    if (ref && 'current' in ref && ref.current) {
        const element = ref.current;
        const opt = {
          margin: 0,
          filename: 'resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    }
  };

  return (
    <div className="space-y-6">
        <div className="bg-secondary-bg p-4 rounded-lg flex flex-wrap justify-center items-center gap-4 border border-border-color">
          <button onClick={handleExportPDF} className="px-4 py-2 bg-accent text-white rounded-md hover:opacity-90 font-semibold">Export PDF</button>
        </div>
        <div className="bg-gray-400 p-4 sm:p-8 rounded-lg shadow-inner">
            <div ref={ref} className="bg-white text-black shadow-lg mx-auto" style={{ width: '8.5in', minHeight: '11in', padding: '0.75in' }}>
                <ModernTemplate resume={resume} />
            </div>
        </div>
    </div>
  );
});

Preview.displayName = 'Preview';
export default Preview;
