import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, ArrowRight } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function ApiKeyPage() {
  const { state, setApiKey } = useAppContext();
  const [inputKey, setInputKey] = useState(state.apiKey);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputKey.trim()) {
      setError('Please enter your Gemini API key');
      return;
    }

    if (!inputKey.startsWith('AIza')) {
      setError('Please enter a valid Gemini API key (starts with "AIza")');
      return;
    }

    setApiKey(inputKey.trim());
    navigate('/resume');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md animate-fade-in">
        <Card className="border-0 shadow-elegant">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Key className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Welcome to ResumeFit
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Enter your Gemini API key to get started with AI-powered resume analysis
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Gemini API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="AIzaSy..."
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>
              
              {error && (
                <Alert variant="destructive" className="animate-fade-in">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit" 
                className="w-full group transition-all duration-200 hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="text-center">
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Get your free Gemini API key
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}