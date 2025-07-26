export const RESUME_KEYWORDS_PROMPT = `You are a JSON extraction engine. Convert the following resume text into precisely the JSON schema specified below.
- Do not compose any extra fields or commentary.
- Do not make up values for any fields.
- User "Present" if an end date is ongoing.
- Make sure dates are in YYYY-MM-DD.
- Do not format the response in Markdown or any other format. Just output raw JSON.

Schema:
\`\`\`json
{
    "personalInfo": {
        "name": "string",
        "title": "string",
        "email": "string",
        "phone": "string",
        "location": "string | null",
        "website": "string | null",
        "linkedin": "string | null",
        "github": "string | null",
    },
    "summary": "string | null",
    "experience": [
        {
            "id": 0,
            "title": "string",
            "company": "string",
            "location": "string",
            "years": "string",
            "description": ["string"],
        }
    ],
    "education": [
        {
            "id": 0,
            "institution": "string",
            "degree": "string",
            "years": "string | null",
            "description": "string | null",
        }
    ],
    "skills": ["string"],
}
\`\`\`

Resume:
\`\`\`text
{raw_resume}
\`\`\`

NOTE: Please output only a valid JSON matching the EXACT schema.`;