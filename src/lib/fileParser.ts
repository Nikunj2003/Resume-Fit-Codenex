// Simple client-side text extraction utilities
// Note: For production, server-side parsing with pdf-parse/mammoth would be more robust

export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  try {
    if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      return await extractTextFromTxt(file);
    } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      // For demo purposes, we'll ask user to copy-paste PDF content
      // In production, use server-side pdf-parse
      throw new Error('PDF parsing requires server-side processing. Please copy and paste the content into the job description field for now.');
    } else if (fileName.endsWith('.docx') || fileType.includes('document')) {
      // For demo purposes, we'll ask user to copy-paste DOCX content
      // In production, use server-side mammoth.js
      throw new Error('DOCX parsing requires server-side processing. Please copy and paste the content into the job description field for now.');
    } else {
      throw new Error('Unsupported file type. Please use .txt, .pdf, or .docx files.');
    }
  } catch (error) {
    console.error('File parsing error:', error);
    throw error;
  }
}

async function extractTextFromTxt(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export function validateFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 2 * 1024 * 1024; // 2MB
  const allowedTypes = [
    'text/plain',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  const allowedExtensions = ['.txt', '.pdf', '.docx'];

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must be less than 2MB'
    };
  }

  const fileName = file.name.toLowerCase();
  const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
  const hasValidType = allowedTypes.includes(file.type);

  if (!hasValidExtension && !hasValidType) {
    return {
      isValid: false,
      error: 'Please upload a .txt, .pdf, or .docx file'
    };
  }

  return { isValid: true };
}