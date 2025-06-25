import { useState, useCallback } from 'react';
import { Upload, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface FileUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onFileProcessed: (data: any, fileName: string) => void;
}

export function FileUpload({ isOpen, onClose, onFileProcessed }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError('');
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  }, []);

  const validateAndSetFile = (file: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      setError('PDF, DOC, DOCX 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > maxSize) {
      setError('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    setFile(file);
  };

  const simulateUpload = async () => {
    setUploading(true);
    setUploadProgress(0);

    // 업로드 진행률 시뮬레이션
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // 2초 후 완료
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearInterval(progressInterval);
    setUploadProgress(100);

    // 파일 처리 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 500));

    // 가상의 이력서 데이터 생성
    const mockResumeData = {
      personal: {
        firstName: '김',
        lastName: '민수',
        email: 'kimminsu@example.com',
        phone: '010-9876-5432',
        address: '서울시 서초구',
        jobTitle: '소프트웨어 엔지니어'
      },
      employment: [
        {
          id: '1',
          company: '네이버',
          position: '프론트엔드 개발자',
          startDate: '2022-01',
          endDate: '2024-12',
          isCurrentJob: true,
          location: '서울',
          description: 'React와 TypeScript를 활용한 웹 애플리케이션 개발',
          achievements: ['사용자 경험 개선으로 전환율 20% 향상', '컴포넌트 라이브러리 구축']
        }
      ],
      education: [
        {
          id: '1',
          school: '세종대학교',
          degree: '학사',
          field: '컴퓨터공학과',
          startDate: '2018-03',
          endDate: '2022-02',
          gpa: '3.8/4.5',
          description: '컴퓨터 과학 기초 및 소프트웨어 공학 전공'
        }
      ],
      skills: [
        { id: '1', name: 'JavaScript', category: 'programming', level: 5 },
        { id: '2', name: 'React', category: 'frontend', level: 4 },
        { id: '3', name: 'TypeScript', category: 'programming', level: 4 },
        { id: '4', name: 'Node.js', category: 'backend', level: 3 }
      ],
      summary: '3년 경력의 프론트엔드 개발자로서 React와 TypeScript를 활용한 대규모 웹 애플리케이션 개발 경험이 있습니다. 사용자 중심의 UI/UX 개발과 성능 최적화에 관심이 많습니다.'
    };

    setUploading(false);
    onFileProcessed(mockResumeData, file?.name || 'resume.pdf');
    handleClose();
  };

  const handleClose = () => {
    setFile(null);
    setUploading(false);
    setUploadProgress(0);
    setError('');
    setDragActive(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={uploading}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">이력서 업로드</h2>
          <p className="text-gray-600 text-sm">PDF, DOC, DOCX 파일을 업로드해주세요</p>
        </div>

        {!file && !uploading && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">파일을 여기로 드래그하거나</p>
            <label className="cursor-pointer">
              <span className="text-blue-600 hover:underline">파일 선택</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInput}
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">최대 10MB</p>
          </div>
        )}

        {file && !uploading && (
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {uploading && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{file?.name}</p>
                <p className="text-sm text-gray-500">업로드 중...</p>
              </div>
            </div>
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-center text-gray-600">
              {uploadProgress < 100 ? `${Math.round(uploadProgress)}% 완료` : '처리 중...'}
            </p>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={uploading}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            onClick={simulateUpload}
            disabled={!file || uploading}
            className="flex-1"
          >
            {uploading ? '업로드 중...' : '업로드'}
          </Button>
        </div>
      </div>
    </div>
  );
}