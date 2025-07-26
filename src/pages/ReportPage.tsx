import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, RotateCcw, Download, Sparkles, Zap, RefreshCw, FileText, BarChart3 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { AnalysisReport } from '@/components/AnalysisReport';
import { ResumeComparison } from '@/components/ResumeComparison';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  extractJobKeywords, 
  extractResumeKeywords, 
  refineResume, 
  analyzeResumeWithGemini 
} from '@/lib/analyzeResume';

export default function ReportPage() {
  const { 
    state, 
    resetState, 
    setJobKeywords, 
    setResumeKeywords, 
    setRefinedResume, 
    setRefinedAnalysisReport 
  } = useAppContext();
  const navigate = useNavigate();
  
  const [isRefining, setIsRefining] = useState(false);
  const [refinementStep, setRefinementStep] = useState(1);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('original');

  const handleStartOver = () => {
    resetState();
    navigate('/');
  };

  const handleDownload = (content?: string, filename?: string) => {
    const downloadContent = content || state.analysisReport;
    const downloadFilename = filename || 'resume-analysis-report.md';
    
    const blob = new Blob([downloadContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRefineResume = async () => {
    if (!state.apiKey || !state.resumeText || !state.jobDescription || !state.analysisReport) {
      setError('Missing required data for refinement');
      return;
    }

    setIsRefining(true);
    setError('');

    try {
      // Step 1: Extract job keywords
      setRefinementStep(1);
      const jobKeywords = await extractJobKeywords(state.jobDescription, state.apiKey);
      setJobKeywords(jobKeywords);

      // Step 2: Extract resume keywords
      setRefinementStep(2);
      const resumeKeywords = await extractResumeKeywords(state.resumeText, state.apiKey);
      setResumeKeywords(resumeKeywords);

      // Step 3: Refine resume
      setRefinementStep(3);
      const refinedResume = await refineResume(
        state.resumeText,
        state.jobDescription,
        jobKeywords,
        resumeKeywords,
        state.analysisReport,
        state.apiKey
      );
      setRefinedResume(refinedResume);

      // Step 4: Analyze refined resume
      setRefinementStep(4);
      const refinedAnalysis = await analyzeResumeWithGemini(
        refinedResume,
        state.jobDescription,
        state.apiKey
      );
      setRefinedAnalysisReport(refinedAnalysis);

      setActiveTab('comparison');
      setRefinementStep(5); // Complete
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refine resume');
    } finally {
      setIsRefining(false);
    }
  };

  const handleRefineAgain = async () => {
    if (!state.refinedResume) return;
    
    setIsRefining(true);
    setError('');

    try {
      // Use refined resume as base for further refinement
      setRefinementStep(3);
      const newRefinedResume = await refineResume(
        state.refinedResume, // Use current refined resume
        state.jobDescription,
        state.jobKeywords,
        state.resumeKeywords,
        state.refinedAnalysisReport || state.analysisReport,
        state.apiKey
      );
      setRefinedResume(newRefinedResume);

      // Step 4: Analyze newly refined resume
      setRefinementStep(4);
      const newRefinedAnalysis = await analyzeResumeWithGemini(
        newRefinedResume,
        state.jobDescription,
        state.apiKey
      );
      setRefinedAnalysisReport(newRefinedAnalysis);

      setRefinementStep(5); // Complete
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refine resume again');
    } finally {
      setIsRefining(false);
    }
  };

  const getRefinementStepText = () => {
    switch (refinementStep) {
      case 1: return 'Extracting job keywords...';
      case 2: return 'Extracting resume keywords...';
      case 3: return 'Refining resume content...';
      case 4: return 'Analyzing refined resume...';
      case 5: return 'Refinement complete!';
      default: return 'Processing...';
    }
  };

  if (!state.analysisReport) {
    navigate('/api-key');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-4xl mx-auto pt-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/job-description')}
            className="mb-4 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                4
              </div>
              <span className="text-sm text-muted-foreground">of 4</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Analysis Report
            </h1>
            <p className="text-muted-foreground mt-2">
              Your personalized resume analysis and recommendations
            </p>
          </div>
        </div>

        {/* Actions Header */}
        <Card className="border-0 shadow-soft animate-fade-in mb-6 bg-gradient-to-r from-background to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Resume Analysis Complete
              </span>
              <div className="flex gap-2">
                {state.refinedResume && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownload(state.refinedResume, 'refined-resume.md')}
                    className="hover:scale-105 transition-transform"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Refined
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => handleDownload()}
                  className="hover:scale-105 transition-transform"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleStartOver}
                  className="hover:scale-105 transition-transform"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Refinement Section */}
        <Card className="border-0 shadow-soft animate-fade-in mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Resume Refinement
              </span>
              <div className="flex gap-2">
                {!state.refinedResume ? (
                  <Button 
                    onClick={handleRefineResume}
                    disabled={isRefining}
                    className="hover:scale-105 transition-transform"
                  >
                    {isRefining ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        {getRefinementStepText()}
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Refine Resume
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleRefineAgain}
                    disabled={isRefining}
                    variant="outline"
                    className="hover:scale-105 transition-transform"
                  >
                    {isRefining ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        {getRefinementStepText()}
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refine Again
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardTitle>
            {!state.refinedResume && (
              <div className="text-sm text-muted-foreground">
                AI will extract keywords from your resume and job description, then create an optimized version with improved ATS compatibility and relevance.
              </div>
            )}
            
            {isRefining && (
              <div className="flex items-center gap-3 mt-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        step < refinementStep ? 'bg-primary' : 
                        step === refinementStep ? 'bg-primary animate-pulse' : 
                        'bg-secondary'
                      }`}
                    />
                  ))}
                </div>
                <Badge variant="secondary" className="animate-pulse">
                  Step {refinementStep}/4: {getRefinementStepText()}
                </Badge>
              </div>
            )}
          </CardHeader>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-6 animate-fade-in">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Analysis Content */}
        <Card className="border-0 shadow-soft animate-fade-in">
          <CardContent className="p-0">
            {state.refinedResume ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="original" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Original
                    </TabsTrigger>
                    <TabsTrigger value="comparison" className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Comparison
                    </TabsTrigger>
                    <TabsTrigger value="refined" className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Refined
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="original" className="mt-6 px-6 pb-6">
                  <AnalysisReport content={state.analysisReport} onStartOver={handleStartOver} />
                </TabsContent>
                
                <TabsContent value="comparison" className="mt-6 px-6 pb-6">
                  <ResumeComparison 
                    originalResume={state.resumeText}
                    refinedResume={state.refinedResume}
                    originalReport={state.analysisReport}
                    refinedReport={state.refinedAnalysisReport || state.analysisReport}
                  />
                </TabsContent>
                
                <TabsContent value="refined" className="mt-6 px-6 pb-6">
                  <AnalysisReport 
                    content={state.refinedAnalysisReport || state.analysisReport} 
                    onStartOver={handleStartOver} 
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="p-6">
                <AnalysisReport content={state.analysisReport} onStartOver={handleStartOver} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}