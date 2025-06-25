import { useEffect } from 'react';
import { WorkExperienceSection } from '../resume-sections/WorkExperienceSection';
import { WorkExperience } from '../../types/resume';

interface EmploymentStepProps {
  experiences: WorkExperience[];
  onChange: (experiences: WorkExperience[]) => void;
}

export function EmploymentStep({ experiences, onChange }: EmploymentStepProps) {
  // 첫 번째 경력 자동 추가
  useEffect(() => {
    if (experiences.length === 0) {
      const firstExperience: WorkExperience = {
        id: `exp_${Date.now()}`,
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrentJob: false,
        description: '',
        achievements: ['']
      };
      onChange([firstExperience]);
    }
  }, [experiences.length, onChange]);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">단계 2/5</span>
          <span>경력 사항 입력</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">경력 사항</h1>
        <p className="text-gray-600">
          회사 정보와 담당 업무를 입력해주세요.
        </p>
      </div>

      <WorkExperienceSection 
        experiences={experiences}
        onChange={onChange}
      />
    </div>
  );
}