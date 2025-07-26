import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  apiKey: string;
  resumeText: string;
  jobDescription: string;
  analysisReport: string;
  jobKeywords: string;
  resumeKeywords: string;
  refinedResume: string;
  refinedAnalysisReport: string;
}

interface AppContextType {
  state: AppState;
  setApiKey: (key: string) => void;
  setResumeText: (text: string) => void;
  setJobDescription: (text: string) => void;
  setAnalysisReport: (report: string) => void;
  setJobKeywords: (keywords: string) => void;
  setResumeKeywords: (keywords: string) => void;
  setRefinedResume: (resume: string) => void;
  setRefinedAnalysisReport: (report: string) => void;
  resetState: () => void;
}

const initialState: AppState = {
  apiKey: '',
  resumeText: '',
  jobDescription: '',
  analysisReport: '',
  jobKeywords: '',
  resumeKeywords: '',
  refinedResume: '',
  refinedAnalysisReport: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const setApiKey = (key: string) => {
    setState(prev => ({ ...prev, apiKey: key }));
  };

  const setResumeText = (text: string) => {
    setState(prev => ({ ...prev, resumeText: text }));
  };

  const setJobDescription = (text: string) => {
    setState(prev => ({ ...prev, jobDescription: text }));
  };

  const setAnalysisReport = (report: string) => {
    setState(prev => ({ ...prev, analysisReport: report }));
  };

  const setJobKeywords = (keywords: string) => {
    setState(prev => ({ ...prev, jobKeywords: keywords }));
  };

  const setResumeKeywords = (keywords: string) => {
    setState(prev => ({ ...prev, resumeKeywords: keywords }));
  };

  const setRefinedResume = (resume: string) => {
    setState(prev => ({ ...prev, refinedResume: resume }));
  };

  const setRefinedAnalysisReport = (report: string) => {
    setState(prev => ({ ...prev, refinedAnalysisReport: report }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return (
    <AppContext.Provider value={{
      state,
      setApiKey,
      setResumeText,
      setJobDescription,
      setAnalysisReport,
      setJobKeywords,
      setResumeKeywords,
      setRefinedResume,
      setRefinedAnalysisReport,
      resetState,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}