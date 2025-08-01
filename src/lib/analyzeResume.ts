import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import {
  SYSTEM_PROMPT,
  JOB_KEYWORDS_PROMPT,
 RESUME_KEYWORDS_PROMPT,
  RESUME_REFINEMENT_PROMPT
} from '../prompts';

/**
 * Creates a configured Google Generative AI provider instance.
 */
function getGoogleProvider(apiKey: string) {
  return createGoogleGenerativeAI({ apiKey });
}

/**
 * Extracts keywords from the job description.
 */
export async function extractJobKeywords(
  jobDescription: string,
  apiKey: string
): Promise<string> {
  const prompt = JOB_KEYWORDS_PROMPT.replace('{raw_job_description}', jobDescription);
  const google = getGoogleProvider(apiKey);
  const model = google('gemini-2.5-flash');

  try {
    const { text: keywordsText } = await generateText({
      model,
      prompt,
      temperature: 0.1,
      maxTokens: 4096,
    });

    if (!keywordsText) {
      throw new Error('No keywords extracted from job description');
    }
    return keywordsText;
  } catch (error) {
    console.error('Job keywords extraction error:', error);
    throw new Error('Failed to extract job keywords. Please check your API key and try again.');
  }
}

/**
 * Extracts keywords from the candidate's résumé.
 */
export async function extractResumeKeywords(
  resumeText: string,
  apiKey: string
): Promise<string> {
  const prompt = RESUME_KEYWORDS_PROMPT.replace('{raw_resume}', resumeText);
  const google = getGoogleProvider(apiKey);
  const model = google('gemini-2.5-flash');

  try {
    const { text: keywordsText } = await generateText({
      model,
      prompt,
      temperature: 0.1,
      maxTokens: 4096,
    });

    if (!keywordsText) {
      throw new Error('No keywords extracted from resume');
    }
    return keywordsText;
  } catch (error) {
    console.error('Resume keywords extraction error:', error);
    throw new Error('Failed to extract resume keywords. Please check your API key and try again.');
  }
}

/**
 * Analyzes the résumé against the job description and returns a detailed report.
 */
export async function analyzeResumeWithGemini(
  resumeText: string,
  jobDescription: string,
  apiKey: string
): Promise<string> {
  const userPrompt = `My résumé (plain text):
------------------------
${resumeText}

Job Description:
----------------
${jobDescription}

Please analyse using the above framework and return the Résumé Analysis Report.`;

  const google = getGoogleProvider(apiKey);
  const model = google('gemini-2.5-pro');

  try {
    const { text: analysisText } = await generateText({
      model,
      system: SYSTEM_PROMPT,
      prompt: userPrompt,
      temperature: 0.7,
      maxTokens: 8192,
    });

    if (!analysisText) {
      throw new Error('No analysis generated by Gemini API');
    }
    return analysisText;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze résumé. Please check your API key and try again.');
  }
}

/**
 * Refines the candidate's résumé based on the job description, extracted keywords, and analysis report.
 */
export async function refineResume(
  resumeText: string,
  jobDescription: string,
  jobKeywords: string,
  resumeKeywords: string,
  analysisReport: string,
  apiKey: string
): Promise<string> {
  const prompt = RESUME_REFINEMENT_PROMPT
    .replace('{raw_job_description}', jobDescription)
    .replace('{extracted_job_keywords}', jobKeywords)
    .replace('{raw_resume}', resumeText)
    .replace('{extracted_resume_keywords}', resumeKeywords)
    .replace('{resume_analysis_report}', analysisReport);

  const google = getGoogleProvider(apiKey);
  const model = google('gemini-2.5-pro');

  try {
    const { text: refinedResume } = await generateText({
      model,
      prompt,
      temperature: 0.3,
      maxTokens: 8192,
    });

    if (!refinedResume) {
      throw new Error('No refined resume generated');
    }
    return refinedResume;
  } catch (error) {
    console.error('Resume refinement error:', error);
    throw new Error('Failed to refine resume. Please check your API key and try again.');
  }
}
