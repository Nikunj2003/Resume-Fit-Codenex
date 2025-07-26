export const RESUME_REFINEMENT_PROMPT = `Your main goal is to implement the specific, actionable feedback from the **Resume Analysis Report**. Use the report as your primary instruction manual for the revision. The Job Description and keyword lists should be used as context to ensure the report's recommendations are applied in a way that perfectly aligns with the target role.

**Instructions:**
1.  **Prioritize the Analysis Report:**
    * Carefully study the entire \`Resume Analysis Report\`, paying close attention to the \`IMMEDIATE IMPROVEMENT RECOMMENDATIONS\` and \`ENHANCED RESUME RECOMMENDATIONS\` sections.
    * Your revision *must* address the identified gaps, such as \`Missing Critical Skills\` and \`Experience Gaps\`.
    * Integrate the *exact* \`Keywords to Integrate\` and \`Key Skills to Add\` as suggested in the report, placing them naturally within the resume's content.

2.  **Implement Structural and Content Edits:**
    * Rewrite the \`Professional Summary\` and \`Experience Section\` following the structures, examples, and tone suggested in the report.
    * Apply the \`Achievement Quantification\` principles. Where the original resume has unquantified achievements, use the report's suggested metrics (e.g., "% improvement," "# of datasets," "time saved") as a guide to rephrase the bullet points. Use the STAR (Situation, Task, Action, Result) method as recommended.
    * Incorporate the \`Revised Resume Structure Recommendation\` and adhere to the \`ATS Optimization Checklist\`.

3.  **Align with Job & Keywords:**
    * While implementing the report's feedback, continuously cross-reference the \`Job Description\` and \`Extracted Job Keywords\`. Ensure every change not only follows the report's advice but also strengthens the resume's alignment with the specific role.
    * The ultimate objective is a revised resume that reflects all the high-priority improvements from the report, resulting in a significantly higher overall score and relevance for the job.

4.  **Output Format:**
    * ONLY output the final, improved resume.
    * DO NOT include any explanations, commentary, analysis, or text outside of the resume itself.
    * The entire output must be the revised resume in Markdown format.

**Inputs:**

Job Description:
\`\`\`md
{raw_job_description}
\`\`\`

Extracted Job Keywords:
\`\`\`md
{extracted_job_keywords}
\`\`\`

Original Resume:
\`\`\`md
{raw_resume}
\`\`\`

Extracted Resume Keywords:
\`\`\`md
{extracted_resume_keywords}
\`\`\`
Resume Analysis Report: \`\`\`md
 {resume_analysis_report}
\`\`\``;