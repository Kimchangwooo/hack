import { HomePage } from './pages/HomePage';
import { ResumeEditor } from './ResumeEditor';
import { StepByStepResumeBuilder } from './StepByStepResumeBuilder';
import { FileUploadCompletePage } from './FileUploadCompletePage';
import { AIAnalysisLoadingPage } from './AIAnalysisLoadingPage';
import { JobsPage } from './JobsPage';
import { ProfilePage } from './ProfilePage';
import { AIPredictionPage } from './AIPredictionPage';
import { DetailedAnalysisPage } from './DetailedAnalysisPage';
import { SejongAlumniEmploymentPage } from './SejongAlumniEmploymentPage';
import { ViewType } from '../hooks/useAppState';

interface AppRouterProps {
  currentView: ViewType;
  showNewResumeModal: boolean;
  showFileUploadModal: boolean;
  stepByStepResumeData: any;
  uploadedResumeData: any;
  uploadedFileName: string;
  handlers: {
    handleResumeClick: (resumeId: number) => void;
    handleNewResumeClick: () => void;
    handleFileUpload: () => void;
    handleBackToHome: () => void;
    handleCloseModal: () => void;
    handleCloseFileUploadModal: () => void;
    handleCreateNew: () => void;
    handleCreateWithAI: () => void;
    handleFileProcessed: (data: any, fileName: string) => void;
    handleCreateFromExample: () => void;
    handleStepBuilderComplete: (resumeData: any) => void;
    handleStartAnalysis: () => void;
    handleAnalysisComplete: () => void;
    handleResumeAnalysis: (resumeId: number) => void;
    navigateTo: (view: ViewType) => void;
  };
}

export function AppRouter({
  currentView,
  showNewResumeModal,
  showFileUploadModal,
  stepByStepResumeData,
  uploadedResumeData,
  uploadedFileName,
  handlers
}: AppRouterProps) {
  const {
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
  } = handlers;

  switch (currentView) {
    case 'ai-analysis-loading':
      return (
        <AIAnalysisLoadingPage
          fileName={uploadedFileName}
          onAnalysisComplete={handleAnalysisComplete}
        />
      );

    case 'file-upload-complete':
      return (
        <FileUploadCompletePage
          fileName={uploadedFileName}
          onStartAnalysis={handleStartAnalysis}
          onBackToHome={handleBackToHome}
        />
      );

    case 'company-recommendations':
      return (
        <DetailedAnalysisPage
          onBack={handleBackToHome}
          uploadedFileName={uploadedFileName}
          uploadedResumeData={uploadedResumeData}
        />
      );

    case 'ai-prediction':
      return <AIPredictionPage onBack={handleBackToHome} />;

    case 'profile':
      return <ProfilePage onBack={handleBackToHome} />;

    case 'sejong-alumni-employment':
      return <SejongAlumniEmploymentPage onBack={handleBackToHome} />;

    case 'jobs':
      return (
        <JobsPage 
          onBack={handleBackToHome} 
          onSejongAlumniClick={() => navigateTo('sejong-alumni-employment')} 
        />
      );

    case 'step-by-step-builder':
      return (
        <StepByStepResumeBuilder
          onBack={handleBackToHome}
          onComplete={handleStepBuilderComplete}
        />
      );

    case 'resume-editor':
      return (
        <ResumeEditor 
          onBack={handleBackToHome}
          initialData={stepByStepResumeData || uploadedResumeData}
        />
      );

    case 'home':
    default:
      return (
        <HomePage
          showNewResumeModal={showNewResumeModal}
          showFileUploadModal={showFileUploadModal}
          onProfileClick={() => navigateTo('profile')}
          onJobsClick={() => navigateTo('jobs')}
          onResumeClick={handleResumeClick}
          onNewResumeClick={handleNewResumeClick}
          onFileUpload={handleFileUpload}
          onResumeAnalysis={handleResumeAnalysis}
          onCloseModal={handleCloseModal}
          onCloseFileUploadModal={handleCloseFileUploadModal}
          onCreateNew={handleCreateNew}
          onCreateWithAI={handleCreateWithAI}
          onCreateFromExample={handleCreateFromExample}
          onFileProcessed={handleFileProcessed}
        />
      );
  }
}