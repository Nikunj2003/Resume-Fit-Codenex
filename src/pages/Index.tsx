import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, FileText, Target, Zap, Users, TrendingUp } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your resume against job requirements with precision"
    },
    {
      icon: Target,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems with tailored recommendations"
    },
    {
      icon: TrendingUp,
      title: "Performance Scoring",
      description: "Get detailed scoring across 4 key areas with actionable improvement suggestions"
    },
    {
      icon: Zap,
      title: "Instant Refinement",
      description: "AI-powered resume refinement with before/after comparisons"
    }
  ];

  const stats = [
    { number: "95%", label: "ATS Pass Rate" },
    { number: "3.2x", label: "More Interviews" },
    { number: "50K+", label: "Resumes Analyzed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-primary-light">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              ✨ AI-Powered Resume Analysis
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent-foreground bg-clip-text text-transparent mb-6">
              ResumeFit
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your resume with AI-powered analysis. Get detailed feedback, ATS optimization, 
              and instant refinements to land your dream job.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/api-key')}
              className="group px-8 py-6 text-lg hover:scale-105 transition-all duration-200 shadow-strong"
            >
              Start Analysis
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg hover:scale-105 transition-all duration-200"
            >
              <FileText className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            How ResumeFit Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Add API Key", desc: "Enter your Gemini API key for AI analysis" },
              { step: "2", title: "Upload Resume", desc: "Upload your resume or paste text directly" },
              { step: "3", title: "Job Description", desc: "Add the target job description" },
              { step: "4", title: "Get Analysis", desc: "Receive detailed analysis and refinements" }
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 shadow-soft animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-strong bg-gradient-to-r from-primary/10 to-accent/20 animate-fade-in">
          <CardContent className="text-center py-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Resume?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of professionals who've enhanced their resumes and landed their dream jobs with ResumeFit.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/api-key')}
              className="group px-8 py-6 text-lg hover:scale-105 transition-all duration-200"
            >
              <Users className="w-5 h-5 mr-2" />
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}