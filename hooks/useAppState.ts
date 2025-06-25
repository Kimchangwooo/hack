import { useState } from 'react';

export type ViewType = 
  | 'home' 
  | 'resume-editor' 
  | 'step-by-step-builder' 
  | 'jobs' 
  | 'profile' 
  | 'ai-prediction' 
  | 'company-recommendations' 
  | 'sejong-alumni-employment'
  | 'file-upload-complete'
  | 'ai-analysis-loading';

export function useAppState() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [showNewResumeModal, setShowNewResumeModal] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [stepByStepResumeData, setStepByStepResumeData] = useState(null);
  const [uploadedResumeData, setUploadedResumeData] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const handleResumeClick = (resume: any) => {
    setUploadedResumeData(resume);
    setCurrentView('resume-editor');
  };

  const handleNewResumeClick = () => {
    setShowNewResumeModal(true);
  };

  const handleFileUpload = () => {
    setShowFileUploadModal(true);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setStepByStepResumeData(null);
    setUploadedResumeData(null);
    setUploadedFileName('');
  };

  const handleCloseModal = () => {
    setShowNewResumeModal(false);
  };

  const handleCloseFileUploadModal = () => {
    setShowFileUploadModal(false);
  };

  const handleCreateNew = () => {
    setShowNewResumeModal(false);
    setCurrentView('step-by-step-builder');
  };

  const handleCreateWithAI = () => {
    setShowNewResumeModal(false);
    setShowFileUploadModal(true);
  };

  const handleFileProcessed = (data: any, fileName: string) => {
    setUploadedResumeData(data);
    setUploadedFileName(fileName);
    setShowFileUploadModal(false);
    setCurrentView('file-upload-complete');
  };

  const handleCreateFromExample = () => {
    setShowNewResumeModal(false);
    // 예제 데이터로 이력서 생성
    const exampleData = {
      personal: {
        firstName: '홍',
        lastName: '길동',
        email: 'honggildong@example.com',
        phone: '010-1234-5678',
        address: '서울시 강남구',
        jobTitle: '프론트엔드 개발자'
      },
      employment: [],
      education: [],
      skills: [],
      summary: ''
    };
    setStepByStepResumeData(exampleData);
    setCurrentView('step-by-step-builder');
  };

  const handleStepBuilderComplete = (resumeData: any) => {
    setStepByStepResumeData(resumeData);
    setCurrentView('resume-editor');
  };

  const handleStartAnalysis = () => {
    setCurrentView('ai-analysis-loading');
  };

  const handleAnalysisComplete = () => {
    setCurrentView('company-recommendations');
  };

  // 기존 이력서에 대한 AI 분석 시작
  const handleResumeAnalysis = (resumeId: number) => {
    // 기존 이력서 데이터를 로드하여 분석 준비
    const mockResumeData = {
      id: resumeId,
      personal: {
        firstName: '한',
        lastName: '예슬',
        email: 'yeseul@example.com',
        phone: '010-1234-5678',
        address: '서울시 강남구',
        jobTitle: 'UX/UI 디자이너'
      },
      employment: [
        {
          company: '스타트업 A',
          position: 'UI 디자이너',
          startDate: '2023-01',
          endDate: '2024-12',
          current: false,
          description: 'Mobile App UI 디자인 및 사용자 경험 개선'
        }
      ],
      education: [
        {
          school: '세종대학교',
          degree: '학사',
          field: '디지털콘텐츠학과',
          startDate: '2020-03',
          endDate: '2024-02',
          gpa: '3.8'
        }
      ],
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch'],
      summary: '사용자 중심의 직관적인 디자인을 추구하는 UX/UI 디자이너입니다.'
    };

    // 분석을 위한 파일명 설정
    setUploadedFileName(`한예슬_${resumeId}_이력서.pdf`);
    setUploadedResumeData(mockResumeData);
    
    // AI 분석 로딩 페이지로 이동
    setCurrentView('ai-analysis-loading');
  };

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
  };

  return {
    currentView,
    showNewResumeModal,
    showFileUploadModal,
    stepByStepResumeData,
    uploadedResumeData,
    uploadedFileName,
    handleResumeClick,
    handleNewResumeClick,
    handleFileUpload,
    handleBackToHome,
    handleCloseModal,
    handleCloseFileUploadModal,
    handleCreateNew,
    handleCreateWithAI,
    handleFileProcessed,
    handleCreateFromExample,
    handleStepBuilderComplete,
    handleStartAnalysis,
    handleAnalysisComplete,
    handleResumeAnalysis,
    navigateTo
  };
}