import { useRef } from 'react';
import { Header } from '../Header';
import { HeroBanner } from '../HeroBanner';
import { ResumeList } from '../ResumeList';
import { Footer } from '../Footer';
import { NewResumeModal } from '../NewResumeModal';
import { FileUpload } from '../FileUpload';

interface HomePageProps {
  showNewResumeModal: boolean;
  showFileUploadModal: boolean;
  onProfileClick: () => void;
  onJobsClick: () => void;
  onResumeClick: (resumeId: number) => void;
  onNewResumeClick: () => void;
  onFileUpload: () => void;
  onResumeAnalysis: (resumeId: number) => void;
  onCloseModal: () => void;
  onCloseFileUploadModal: () => void;
  onCreateNew: () => void;
  onCreateWithAI: () => void;
  onCreateFromExample: () => void;
  onFileProcessed: (data: any, fileName: string) => void;
}

export function HomePage({
  showNewResumeModal,
  showFileUploadModal,
  onProfileClick,
  onJobsClick,
  onResumeClick,
  onNewResumeClick,
  onFileUpload,
  onResumeAnalysis,
  onCloseModal,
  onCloseFileUploadModal,
  onCreateNew,
  onCreateWithAI,
  onCreateFromExample,
  onFileProcessed
}: HomePageProps) {
  const resumeListRef = useRef<HTMLDivElement>(null);

  const scrollToResumeList = () => {
    resumeListRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onProfileClick={onProfileClick} />
      <main>
        <HeroBanner 
          onJobsClick={onJobsClick}
          onResumeStartClick={scrollToResumeList}
        />
        <div ref={resumeListRef}>
          <ResumeList 
            onResumeClick={onResumeClick}
            onNewResumeClick={onNewResumeClick}
            onFileUpload={onFileUpload}
            onResumeAnalysis={onResumeAnalysis}
          />
        </div>
      </main>
      <Footer />

      <NewResumeModal
        isOpen={showNewResumeModal}
        onClose={onCloseModal}
        onCreateNew={onCreateNew}
        onCreateWithAI={onCreateWithAI}
        onCreateFromExample={onCreateFromExample}
      />

      <FileUpload
        isOpen={showFileUploadModal}
        onClose={onCloseFileUploadModal}
        onFileProcessed={onFileProcessed}
      />
    </div>
  );
}