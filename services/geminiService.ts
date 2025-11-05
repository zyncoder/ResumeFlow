import { GoogleGenAI } from "@google/genai";
import type { Resume } from "../types";

// The API key must be obtained exclusively from the environment variable `process.env.API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function formatResumeAsText(resume: Resume): string {
    let resumeText = `Name: ${resume.contact.full_name}\n`;
    resumeText += `Contact: ${resume.contact.email}, ${resume.contact.phone}\n`;
    resumeText += `Links: LinkedIn: ${resume.contact.linkedin_url}, Website: ${resume.contact.personal_website}\n\n`;
    resumeText += `Summary:\n${resume.summary}\n\n`;

    resumeText += "Experience:\n";
    resume.experience.forEach(exp => {
        resumeText += `- ${exp.role} at ${exp.company} (${exp.start_date} - ${exp.end_date})\n`;
        resumeText += `  - ${exp.description}\n`;
    });
    resumeText += "\n";

    resumeText += "Education:\n";
    resume.education.forEach(edu => {
        resumeText += `- ${edu.degree}, ${edu.institution} (${edu.graduation_year})\n`;
    });
    resumeText += "\n";
    
    resumeText += "Projects:\n";
    resume.projects.forEach(proj => {
        resumeText += `- ${proj.title} - ${proj.organization}\n`;
    });
    resumeText += "\n";

    resumeText += "Skills:\n";
    resumeText += resume.skills + '\n';

    return resumeText;
}

export const analyzeResumeWithGemini = async (resume: Resume, jobDescription: string): Promise<string> => {
    const resumeText = formatResumeAsText(resume);

    const prompt = `
        Analyze the following resume against the job description and provide feedback.
        The analysis should focus on how well the resume is tailored to the job, highlighting strengths and weaknesses.
        Provide a percentage match score.
        Suggest specific improvements to the resume summary and experience descriptions to better align with the job requirements, using keywords from the job description.
        Format the output as Markdown.

        ---
        RESUME:
        ---
        ${resumeText}

        ---
        JOB DESCRIPTION:
        ---
        ${jobDescription}
    `;

    try {
        // For complex text tasks, use 'gemini-2.5-pro'
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error analyzing resume with Gemini:", error);
        if (error instanceof Error) {
            return `An error occurred during analysis: ${error.message}`;
        }
        return "An unknown error occurred during analysis.";
    }
};
