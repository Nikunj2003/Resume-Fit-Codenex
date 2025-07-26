import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { FileText, Sparkles, ArrowRight } from 'lucide-react';

interface ResumeComparisonProps {
  originalResume: string;
  refinedResume: string;
  originalReport: string;
  refinedReport: string;
}

export function ResumeComparison({ 
  originalResume, 
  refinedResume, 
  originalReport, 
  refinedReport 
}: ResumeComparisonProps) {
  
  // Extract scores from reports
  const extractScore = (report: string) => {
    const scoreMatch = report.match(/\*\*OVERALL SCORE:\s*(\d+)\/100\*\*/);
    return scoreMatch ? parseInt(scoreMatch[1]) : 0;
  };

  const originalScore = extractScore(originalReport);
  const refinedScore = extractScore(refinedReport);
  const improvement = refinedScore - originalScore;

  return (
    <div className="space-y-6">
      {/* Score Comparison Header */}
      <Card className="border-0 shadow-soft bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-xl">
            <Sparkles className="w-6 h-6 text-primary" />
            Resume Refinement Results
          </CardTitle>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">{originalScore}/100</div>
              <div className="text-sm text-muted-foreground">Original</div>
            </div>
            <ArrowRight className="w-6 h-6 text-primary" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{refinedScore}/100</div>
              <div className="text-sm text-muted-foreground">Refined</div>
            </div>
            <Badge 
              variant={improvement > 0 ? "default" : "secondary"} 
              className="ml-4 px-3 py-1"
            >
              {improvement > 0 ? '+' : ''}{improvement} points
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Comparison Tabs */}
      <Tabs defaultValue="resume" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resume" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Resume Comparison
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Analysis Comparison
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resume" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  Original Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] w-full rounded-md border p-4 bg-secondary/20">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{originalResume}</ReactMarkdown>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Refined Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] w-full rounded-md border p-4 bg-primary/5">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{refinedResume}</ReactMarkdown>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  Original Analysis ({originalScore}/100)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] w-full rounded-md border p-4 bg-secondary/20">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{originalReport}</ReactMarkdown>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Refined Analysis ({refinedScore}/100)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] w-full rounded-md border p-4 bg-primary/5">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{refinedReport}</ReactMarkdown>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}