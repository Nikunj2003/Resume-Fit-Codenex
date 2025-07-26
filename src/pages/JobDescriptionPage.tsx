import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, ArrowLeft, Briefcase, Upload, Loader2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { FileUpload } from '@/components/FileUpload';
import { extractTextFromFile } from '@/lib/fileParser';
import { analyzeResumeWithGemini } from '@/lib/analyzeResume';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function JobDescriptionPage() {
  const { state, setJobDescription, setAnalysisReport } = useAppContext();
  const [inputText, setInputText] = useState(state.jobDescription);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError('');
    
    try {
      const text = await extractTextFromFile(file);
      setInputText(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      setError('Please enter the job description or upload a file');
      return;
    }

    if (inputText.trim().length < 50) {
      setError('Job description seems too short. Please provide more details.');
      return;
    }

    setJobDescription(inputText.trim());
    setAnalyzing(true);
    setError('');

    try {
      const report = await analyzeResumeWithGemini(
        state.resumeText,
        inputText.trim(),
        state.apiKey
      );
      setAnalysisReport(report);
      navigate('/report');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-2xl mx-auto pt-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/resume')}
            className="mb-4 hover:scale-105 transition-transform"
            disabled={analyzing}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                3
              </div>
              <span className="text-sm text-muted-foreground">of 4</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Job Description
            </h1>
            <p className="text-muted-foreground mt-2">
              Provide the job description to analyze against your resume
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-elegant animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Job Description Input
            </CardTitle>
            <CardDescription>
              Choose how you'd like to provide the job description
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Paste Text
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload File
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="mt-4">
                  <Textarea
                    placeholder="Paste the job description here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[300px] transition-all duration-200 focus:scale-[1.01]"
                  />
                </TabsContent>
                
                <TabsContent value="upload" className="mt-4">
                  <FileUpload
                    onFileUpload={handleFileUpload}
                    loading={loading}
                    accept=".txt,.pdf,.docx"
                    label="Drop job description file here or click to browse"
                    description="Supports PDF, DOCX, and TXT files up to 2MB"
                  />
                  {inputText && (
                    <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Extracted text preview:</p>
                      <div className="max-h-32 overflow-y-auto text-sm">
                        {inputText.substring(0, 200)}...
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              {error && (
                <Alert variant="destructive" className="animate-fade-in">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit" 
                className="w-full group transition-all duration-200 hover:scale-[1.02]"
                disabled={loading || analyzing}
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : loading ? (
                  'Processing...'
                ) : (
                  <>
                    Analyze Resume
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}