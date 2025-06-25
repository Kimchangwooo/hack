import { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';

interface ResumeSelectionProps {
  onAnalyzeResume: (resumeName: string) => void;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'complete' | 'error';
  progress: number;
  error?: string;
}

export function ResumeSelection({ onAnalyzeResume }: ResumeSelectionProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 지원되는 파일 형식
  const supportedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ];

  // 파일 유효성 검사
  const validateFile = (file: File): string | null => {
    if (!supportedTypes.includes(file.type)) {
      return 'PDF, DOC, DOCX 파일만 업로드할 수 있습니다.';
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB
      return '파일 크기는 10MB 이하여야 합니다.';
    }
    return null;
  };

  // 파일 업로드 시뮬레이션
  const simulateUpload = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const fileId = Date.now().toString();
      const newFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // 업로드 진행 시뮬레이션
      const interval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => {
          if (f.name === file.name && f.status === 'uploading') {
            const newProgress = Math.min(f.progress + 10, 100);
            return {
              ...f,
              progress: newProgress,
              status: newProgress === 100 ? 'complete' : 'uploading'
            };
          }
          return f;
        }));
      }, 100);

      // 1초 후 완료
      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => prev.map(f => {
          if (f.name === file.name) {
            return { ...f, status: 'complete', progress: 100 };
          }
          return f;
        }));
        resolve();
      }, 1000);
    });
  };

  // 파일 처리
  const handleFiles = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const error = validateFile(file);
      
      if (error) {
        const errorFile: UploadedFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'error',
          progress: 0,
          error
        };
        setUploadedFiles(prev => [...prev, errorFile]);
      } else {
        try {
          await simulateUpload(file);
        } catch (err) {
          setUploadedFiles(prev => prev.map(f => {
            if (f.name === file.name) {
              return { ...f, status: 'error', error: '업로드 중 오류가 발생했습니다.' };
            }
            return f;
          }));
        }
      }
    }
  };

  // 드래그 이벤트 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // 파일 선택 버튼 클릭
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  // 파일 입력 변경
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  // 업로드된 파일 제거
  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileName));
  };

  // 업로드된 파일로 분석 시작
  const analyzeUploadedFile = (fileName: string) => {
    onAnalyzeResume(fileName);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>분석할 이력서 선택</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 기존 이력서 목록 */}
        <div className="space-y-3">
          <h4 className="font-medium">내 이력서</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 cursor-pointer transition-colors"
              onClick={() => onAnalyzeResume('프론트엔드 개발자 v3')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">프론트엔드 개발자 v3</h4>
                  <p className="text-sm text-gray-600">최근 수정: 2025.01.20</p>
                </div>
              </div>
            </div>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 cursor-pointer transition-colors"
              onClick={() => onAnalyzeResume('백엔드 개발자')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">백엔드 개발자</h4>
                  <p className="text-sm text-gray-600">최근 수정: 2025.01.15</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 드래그앤드롭 파일 업로드 */}
        <div>
          <h4 className="font-medium mb-3">새 이력서 업로드</h4>
          
          {/* 드래그앤드롭 영역 */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer
              ${isDragOver 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleFileSelect}
          >
            <div className={`transition-transform duration-200 ${isDragOver ? 'scale-105' : ''}`}>
              <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors ${
                isDragOver ? 'text-blue-500' : 'text-gray-400'
              }`} />
              
              {isDragOver ? (
                <div>
                  <h4 className="font-semibold mb-2 text-blue-600">파일을 여기에 놓으세요</h4>
                  <p className="text-sm text-blue-600">업로드가 시작됩니다</p>
                </div>
              ) : (
                <div>
                  <h4 className="font-semibold mb-2">이력서 파일을 드래그하거나 클릭하여 업로드</h4>
                  <p className="text-sm text-gray-600 mb-4">PDF, DOC, DOCX 파일 지원 (최대 10MB)</p>
                  <Button variant="outline">파일 선택</Button>
                </div>
              )}
            </div>
          </div>

          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            multiple
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>

        {/* 업로드된 파일 목록 */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">업로드된 파일</h4>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={`${file.name}-${index}`} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        file.status === 'complete' ? 'bg-green-100' :
                        file.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {file.status === 'complete' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : file.status === 'error' ? (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        ) : (
                          <FileText className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium truncate">{file.name}</h5>
                        <p className="text-sm text-gray-600">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        
                        {file.status === 'uploading' && (
                          <div className="mt-2">
                            <Progress value={file.progress} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">
                              업로드 중... {file.progress}%
                            </p>
                          </div>
                        )}
                        
                        {file.status === 'error' && file.error && (
                          <Alert variant="destructive" className="mt-2">
                            <AlertCircle className="w-4 h-4" />
                            <AlertDescription className="text-sm">
                              {file.error}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {file.status === 'complete' && (
                        <Button
                          size="sm"
                          onClick={() => analyzeUploadedFile(file.name)}
                          className="whitespace-nowrap"
                        >
                          분석 시작
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.name)}
                        className="p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}