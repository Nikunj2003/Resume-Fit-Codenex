# Resume Fit by Nikunj

<div align="center"> 
 
 <img src="public/logo.png" alt="Resume Fit by Nikunj Logo" width="400"/>
 
 An AI-powered resume analysis and optimization tool to help job seekers match their resumes to specific job descriptions. 
 
 [![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/) 
 [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)](https://www.typescriptlang.org/) 
 [![Vite](https://img.shields.io/badge/Vite-5.4.1-purple)](https://vitejs.dev/) 
 [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-blue)](https://tailwindcss.com/) 
 [![Google Generative AI](https://img.shields.io/badge/Google%20Generative%20AI-1.2.22-green)](https://ai.google.dev/) 
 [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/) 
 
 **[🔗 Live Demo: Resume Fit CodeNex](https://resumefit.codenex.dev/)** 
 
 </div>

## 🚀 Features

- **AI-Powered Analysis**: Advanced algorithms analyze your resume against job requirements with precision
- **ATS Optimization**: Ensure your resume passes Applicant Tracking Systems with tailored recommendations
- **Performance Scoring**: Get detailed scoring across 4 key areas with actionable improvement suggestions
- **Instant Refinement**: AI-powered resume refinement with before/after comparisons
- **Comprehensive Reports**: Detailed analysis reports with specific recommendations for improvement
- **Keyword Extraction**: Identifies important keywords from both resumes and job descriptions
- **Resume Comparison**: Side-by-side comparison of original and refined resumes

## 📊 Analysis Framework

Resume Fit CodeNex evaluates resumes on four key pillars (total 100 points):

1. **Core Skills Alignment (40 pts)**: Compares required vs. present skills
2. **Relevant Experience Match (30 pts)**: Gauges similarity of industry, responsibilities, and impact metrics
3. **Tools & Methodologies (20 pts)**: Credits explicit references to software, frameworks, and tools
4. **Education & Credentials (10 pts)**: Judges alignment of degrees, certifications, and continuous learning

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript 5, Vite 5, Tailwind CSS 3
- **UI Components**: Radix UI, Lucide React icons, Sonner for toasts
- **Routing**: React Router 6
- **State Management**: React Context API, TanStack React Query
- **AI Integration**: Google Generative AI (Gemini) via AI SDK
- **Form Handling**: React Hook Form, Zod validation
- **File Parsing**: PDF-parse, Mammoth (for DOCX)
- **Charts & Visualization**: Recharts
- **Deployment**: Vercel with GitHub Actions

## 🔧 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Google Generative AI API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Nikunj2003/Resume-Fit-Codenex.git
   cd Resume-Fit-Codenex
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
```

## 📝 Usage

1. **Enter API Key**: Start by entering your Google Generative AI API key
2. **Upload Resume**: Upload your resume in PDF or DOCX format
3. **Enter Job Description**: Paste the job description you're targeting
4. **View Analysis**: Get a detailed analysis report of how your resume matches the job description
5. **Refine Resume**: Use the AI-powered refinement tool to optimize your resume
6. **Compare Results**: View a side-by-side comparison of your original and refined resumes

## 🎬 Demo

<div align="center">
  <a href="https://www.youtube.com/watch?v=demo-video-id" target="_blank">
    <img src="https://img.youtube.com/vi/demo-video-id/0.jpg" alt="Resume Fit Demo Video" width="600"/>
  </a>
  <p>Click the image above to watch the demo video</p>
</div>

> **Note:** Replace `demo-video-id` in both the link and image URL with your actual YouTube video ID once you've created and uploaded your demo video.

## 🚀 Deployment

Resume Fit CodeNex is deployed on [Vercel](https://vercel.com/), a cloud platform for static sites and Serverless Functions. The application is automatically deployed from the main branch using GitHub Actions workflow with Vercel CLI, ensuring that the latest changes are always available on the live site.

The deployment process includes:

- Automatic builds triggered by commits to the main branch
- Vercel CLI integration for production deployments
- Environment variable management through Vercel secrets
- Optimized build and deployment pipeline

The GitHub Actions workflow handles the entire deployment process, from pulling environment information to building and deploying the project artifacts.

You can access the deployed application at [https://resume-fit-codenex.vercel.app/](https://resume-fit-codenex.vercel.app/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Nikunj Khitha

## 🙏 Acknowledgements

- [Google Generative AI](https://ai.google.dev/) for providing the AI capabilities
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Vite](https://vitejs.dev/) for the fast development experience
- [Vercel](https://vercel.com/) for hosting and deployment infrastructure