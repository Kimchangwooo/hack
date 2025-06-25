import { AppRouter } from './components/AppRouter';
import { useAppState } from './hooks/useAppState';

export default function App() {
  const appState = useAppState();

  const handlers = {
    handleResumeClick: appState.handleResumeClick,
    handleNewResumeClick: appState.handleNewResumeClick,
    handleFileUpload: appState.handleFileUpload,
    handleBackToHome: appState.handleBackToHome,
    handleCloseModal: appState.handleCloseModal,
    handleCloseFileUploadModal: appState.handleCloseFileUploadModal,
    handleCreateNew: appState.handleCreateNew,
    handleCreateWithAI: appState.handleCreateWithAI,
    handleFileProcessed: appState.handleFileProcessed,
    handleCreateFromExample: appState.handleCreateFromExample,
    handleStepBuilderComplete: appState.handleStepBuilderComplete,
    handleStartAnalysis: appState.handleStartAnalysis,
    handleAnalysisComplete: appState.handleAnalysisComplete,
    handleResumeAnalysis: appState.handleResumeAnalysis,
    navigateTo: appState.navigateTo
  };

  return (
    <AppRouter
      currentView={appState.currentView}
      showNewResumeModal={appState.showNewResumeModal}
      showFileUploadModal={appState.showFileUploadModal}
      stepByStepResumeData={appState.stepByStepResumeData}
      uploadedResumeData={appState.uploadedResumeData}
      uploadedFileName={appState.uploadedFileName}
      handlers={handlers}
    />
  );
}