import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AnalysisReportProps {
  content: string;
  isLoading?: boolean;
  onStartOver: () => void;
}

export function AnalysisReport({ content, isLoading, onStartOver }: AnalysisReportProps) {
  const downloadReport = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-analysis-report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const extractScore = (content: string): { score: number; level: string } => {
    const scoreMatch = content.match(/OVERALL SCORE:\s*(\d+)\/100/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
    
    let level = 'Low';
    if (score >= 75) level = 'High';
    else if (score >= 50) level = 'Medium';
    
    return { score, level };
  };

  const { score, level } = extractScore(content);

  return (
    <div className="space-y-6">
      {/* Score Overview Card */}
      {!isLoading && content && (
        <Card className="border-none shadow-strong bg-gradient-to-br from-primary/10 via-primary-glow/5 to-accent/20 backdrop-blur-lg">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center">
                  <span className="text-success-foreground text-sm">✓</span>
                </div>
                Analysis Complete
              </CardTitle>
              <Badge 
                variant={level === 'High' ? 'default' : level === 'Medium' ? 'secondary' : 'outline'}
                className={`
                  px-3 py-1 text-sm font-semibold
                  ${level === 'High' ? 'bg-success text-success-foreground' : ''}
                  ${level === 'Medium' ? 'bg-warning text-warning-foreground' : ''}
                  ${level === 'Low' ? 'bg-destructive text-destructive-foreground' : ''}
                `}
              >
                {score}/100 • {level} Match
              </Badge>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Report Content */}
      <Card className="shadow-strong border-none bg-card/95 backdrop-blur-lg">
        <CardContent className="p-0">
          <ScrollArea className="h-[700px] w-full">
            <div className="p-6">
              {isLoading ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 text-primary">
                    <div className="animate-spin">
                      <RefreshCw className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-semibold">
                      Analyzing your résumé with AI...
                    </span>
                  </div>
                  
                  {/* Loading skeleton */}
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                        <div className="h-3 bg-muted/60 rounded animate-pulse w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-lg font-medium text-foreground mt-6 mb-2">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-foreground mb-3 leading-relaxed">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-1 mb-4 text-foreground">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-1 mb-4 text-foreground">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="ml-2">{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-primary">{children}</strong>
                      ),
                      code: ({ children }) => (
                        <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
                          {children}
                        </code>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                          {children}
                        </blockquote>
                      )
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {!isLoading && content && (
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={downloadReport}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-strong transform hover:scale-105 transition-all duration-300 px-8"
          >
            <Download className="h-5 w-5 mr-3" />
            Download Report
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onStartOver}
            className="hover:bg-accent hover:shadow-medium transition-all duration-300 px-8 border-border/50"
          >
            <RefreshCw className="h-5 w-5 mr-3" />
            Start Over
          </Button>
        </div>
      )}
    </div>
  );
}