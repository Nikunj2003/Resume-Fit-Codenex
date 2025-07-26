export const JOB_KEYWORDS_PROMPT = `You are a JSON-extraction engine. Convert the following raw job posting text into exactly the JSON schema below:
— Do not add any extra fields or prose.
— Use "YYYY-MM-DD" for all dates.
— Ensure any URLs (website, applyLink) conform to URI format.
— Do not change the structure or key names; output only valid JSON matching the schema.
- Do not format the response in Markdown or any other format. Just output raw JSON.

Schema:
\`\`\`json
{
    "jobId": "string",
    "jobTitle": "string",
    "companyProfile": {
        "companyName": "string",
        "industry": "Optional[string]",
        "website": "Optional[string]",
        "description": "Optional[string]",
    },
    "location": {
        "city": "string",
        "state": "string",
        "country": "string",
        "remoteStatus": "string",
    },
    "datePosted": "YYYY-MM-DD",
    "employmentType": "string",
    "jobSummary": "string",
    "keyResponsibilities": [
        "string",
        "...",
    ],
    "qualifications": {
        "required": [
            "string",
            "...",
        ],
        "preferred": [
            "string",
            "...",
        ],
    },
    "compensationAndBenefits": {
        "salaryRange": "string",
        "benefits": [
            "string",
            "...",
        ],
    },
    "applicationInfo": {
        "howToApply": "string",
        "applyLink": "string",
        "contactEmail": "Optional[string]",
    },
    "extractedKeywords": [
        "string",
        "...",
    ],
}
\`\`\`

Job Posting:
{raw_job_description}

Note: Please output only a valid JSON matching the EXACT schema with no surrounding commentary.`;