import { useEffect } from 'react';
import { ChevronLeft, Download } from 'lucide-react';
import { Button } from './ui/button';
import { useResumeData } from '../hooks/useResumeData';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { PersonalInfoStep } from './resume-steps/PersonalInfoStep';
import { EmploymentStep } from './resume-steps/EmploymentStep';
import { EducationStep } from './resume-steps/EducationStep';
import { SkillsStep } from './resume-steps/SkillsStep';
import { SummaryStep } from './resume-steps/SummaryStep';
import { ProgressSidebar } from './resume-steps/ProgressSidebar';
import { ResumePreview } from './resume-steps/ResumePreview';
import { generateResumePDF } from '../utils/pdfGenerator';

interface StepByStepResumeBuilderProps {
  onBack: () => void;
  onComplete: (resumeData: any) => void;
}

export function StepByStepResumeBuilder({ onBack, onComplete }: StepByStepResumeBuilderProps) {
  const {
    resumeData,
    updatePersonalData,
    updateEmploymentData,
    updateEducationData,
    updateSkillsData,
    updateSummary
  } = useResumeData();

  const {
    currentStep,
    getCurrentStepNumber,
    getNextStepTitle,
    handleNext,
    handlePrevious,
    canProceed
  } = useStepNavigation();

  const handleComplete = () => {
    try {
      generateResumePDF(resumeData);
      onComplete(resumeData);
    } catch (error) {
      console.error('PDF 생성 중 오류 발생:', error);
      // 에러가 발생해도 완료 처리는 진행
      onComplete(resumeData);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalInfoStep 
            data={resumeData.personal}
            onUpdate={updatePersonalData}
          />
        );
      case 'employment':
        return (
          <EmploymentStep
            experiences={resumeData.employment}
            onChange={updateEmploymentData}
          />
        );
      case 'education':
        return (
          <EducationStep
            education={resumeData.education}
            onChange={updateEducationData}
          />
        );
      case 'skills':
        return (
          <SkillsStep
            skills={resumeData.skills}
            onChange={updateSkillsData}
          />
        );
      case 'summary':
        return (
          <SummaryStep
            summary={resumeData.summary}
            onChange={updateSummary}
          />
        );
      default:
        return (
          <PersonalInfoStep 
            data={resumeData.personal}
            onUpdate={updatePersonalData}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-gray-900"
                onClick={onBack}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                뒤로
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{getCurrentStepNumber()} / 5</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(getCurrentStepNumber() / 5) * 100}%` }}
                ></div>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                저장
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 왼쪽 진행상황 */}
          <div className="lg:col-span-3">
            <ProgressSidebar currentStep={currentStep} />
          </div>

          {/* 가운데 폼 */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              {renderCurrentStep()}
              
              {/* 네비게이션 버튼 */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                <div>
                  {currentStep !== 'personal' && (
                    <Button 
                      variant="outline"
                      onClick={handlePrevious}
                      className="text-gray-600"
                    >
                      이전
                    </Button>
                  )}
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-4">
                    이력서는 개인정보 보호 규정 및 개인정보 보호법을 준수하며,
                    <br />
                    GDPR 표준에 따라 처리됩니다.
                  </p>
                  <Button 
                    onClick={currentStep === 'summary' ? handleComplete : () => handleNext(onComplete, resumeData)}
                    disabled={!canProceed(resumeData)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 disabled:bg-gray-300"
                  >
                    {currentStep === 'summary' ? (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        PDF 다운로드 & 완료
                      </>
                    ) : (
                      `다음: ${getNextStepTitle()}`
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 미리보기 */}
          <div className="lg:col-span-3">
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}