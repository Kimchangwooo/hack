import { AppRouter } from './components/AppRouter';
import { useAppState } from './hooks/useAppState';
import { getAllUsers } from './utils/api';

function TestApiButton() {
  const handleClick = async () => {
    const result = await getAllUsers();
    alert(JSON.stringify(result, null, 2));
  };
  return <button onClick={handleClick} style={{margin: 16, padding: 8, background: '#007bff', color: 'white', border: 'none', borderRadius: 4}}>API 통신 테스트</button>;
}

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
    <>
      <TestApiButton />
      <AppRouter
        currentView={appState.currentView}
        showNewResumeModal={appState.showNewResumeModal}
        showFileUploadModal={appState.showFileUploadModal}
        stepByStepResumeData={appState.stepByStepResumeData}
        uploadedResumeData={appState.uploadedResumeData}
        uploadedFileName={appState.uploadedFileName}
        handlers={handlers}
      />
    </>
  );
}