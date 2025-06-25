import { useState, useCallback } from 'react';
import { ResumeData, WorkExperience, Education, Skill } from '../types/resume';

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      jobTitle: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      dateOfBirth: '',
      placeOfBirth: '',
      nationality: ''
    },
    employment: [],
    education: [],
    skills: [],
    summary: ''
  });

  const updatePersonalData = useCallback((field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  }, []);

  const updateEmploymentData = useCallback((experiences: WorkExperience[]) => {
    setResumeData(prev => ({
      ...prev,
      employment: experiences
    }));
  }, []);

  const updateEducationData = useCallback((education: Education[]) => {
    setResumeData(prev => ({
      ...prev,
      education
    }));
  }, []);

  const updateSkillsData = useCallback((skills: Skill[]) => {
    setResumeData(prev => ({
      ...prev,
      skills
    }));
  }, []);

  const updateSummary = useCallback((summary: string) => {
    setResumeData(prev => ({
      ...prev,
      summary
    }));
  }, []);

  return {
    resumeData,
    updatePersonalData,
    updateEmploymentData,
    updateEducationData,
    updateSkillsData,
    updateSummary
  };
}