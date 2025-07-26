import { useState, useRef } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FileUploadProps {
  onFileUpload: (file: File) => Promise<void>;
  loading: boolean;
  accept: string;
  label: string;
  description: string;
  error?: string;
}

export function FileUpload({
  onFileUpload,
  accept,
  label,
  description,
  loading,
  error
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (file && isValidFile(file)) {
      setSelectedFile(file);
      await onFileUpload(file);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      setSelectedFile(file);
      await onFileUpload(file);
    }
  };

  const isValidFile = (file: File): boolean => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = accept.split(',').map(type => type.trim());
    
    if (file.size > maxSize) {
      return false;
    }

    const fileType = file.type;
    const fileExtension = '.' + file.name.split('.').pop();
    
    return allowedTypes.some(type => 
      type === fileType || type === fileExtension
    );
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Card 
        className={`
          relative overflow-hidden transition-all duration-500 ease-spring cursor-pointer group
          border-2 border-dashed backdrop-blur-sm
          ${isDragOver 
            ? 'border-primary bg-primary/10 shadow-strong scale-[1.02]' 
            : selectedFile 
              ? 'border-success bg-success/10 shadow-medium' 
              : 'border-border/60 hover:border-primary/70 hover:bg-accent/50 hover:shadow-medium'
          }
          ${selectedFile ? 'shadow-soft' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !selectedFile && !loading && fileInputRef.current?.click()}
      >
        <CardContent className="p-8 relative">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
          />
          
          {selectedFile ? (
            <div className="flex items-center justify-between animate-fade-in">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-success/10 to-success/20 border border-success/20">
                  <FileText className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg">{selectedFile.name}</p>
                  <p className="text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="text-muted-foreground hover:text-destructive rounded-xl h-10 w-10 transition-all duration-300 hover:bg-destructive/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className={`
                mx-auto w-16 h-16 rounded-2xl flex items-center justify-center
                transition-all duration-500 group-hover:scale-110
                ${isDragOver 
                  ? 'bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-medium animate-pulse' 
                  : 'bg-gradient-to-br from-primary/10 to-primary-glow/10 text-primary group-hover:from-primary/20 group-hover:to-primary-glow/20'
                }
              `}>
                <Upload className={`transition-all duration-300 ${isDragOver ? 'h-7 w-7' : 'h-6 w-6'}`} />
              </div>
              
              <div>
                <h3 className="font-bold text-xl text-foreground mb-2">{label}</h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">{description}</p>
                <p className="text-sm text-muted-foreground font-medium">
                  {loading ? 'Processing...' : 'Drag & drop or click to browse • Max 2MB'}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}