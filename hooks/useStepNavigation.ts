import { useState } from 'react';
import { StepType, ResumeData } from '../types/resume';
import { STEP_ORDER, NEXT_STEP_TITLES } from '../constants/resume';

export function useStepNavigation() {
  const [currentStep, setCurrentStep] = useState<StepType>('personal');

  const getCurrentStepNumber = () => {
    return STEP_ORDER.indexOf(currentStep) + 1;
  };

  const getNextStepTitle = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    return NEXT_STEP_TITLES[currentIndex] || '완료';
  };

  const handleNext = (onComplete: (data: ResumeData) => void, resumeData: ResumeData) => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentIndex + 1]);
    } else {
      onComplete(resumeData);
    }
  };

  const handlePrevious = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEP_ORDER[currentIndex - 1]);
    }
  };

  const canProceed = (resumeData: ResumeData) => {
    switch (currentStep) {
      case 'personal':
        return resumeData.personal.firstName && resumeData.personal.email && resumeData.personal.jobTitle;
      case 'employment':
        return resumeData.employment.length > 0 && 
               resumeData.employment.every(exp => exp.company && exp.position);
      case 'education':
        return resumeData.education.length > 0 && 
               resumeData.education.every(edu => edu.school && edu.degree && edu.field && edu.startDate && edu.endDate);
      case 'skills':
        return resumeData.skills.length > 0;
      case 'summary':
        return resumeData.summary.trim().length >= 50; // 최소 50자 이상
      default:
        return true;
    }
  };

  return {
    currentStep,
    setCurrentStep,
    getCurrentStepNumber,
    getNextStepTitle,
    handleNext,
    handlePrevious,
    canProceed
  };
}