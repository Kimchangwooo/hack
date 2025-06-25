import { useState } from 'react';
import { Plus, Trash2, MapPin, Calendar, Building } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { WorkExperience } from '../../types/resume';

interface WorkExperienceSectionProps {
  experiences: WorkExperience[];
  onChange: (experiences: WorkExperience[]) => void;
}

export function WorkExperienceSection({ experiences, onChange }: WorkExperienceSectionProps) {
  const addExperience = () => {
    const newExperience: WorkExperience = {
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
    onChange([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addAchievement = (expId: string) => {
    const updatedExperiences = experiences.map(exp => 
      exp.id === expId ? { ...exp, achievements: [...exp.achievements, ''] } : exp
    );
    onChange(updatedExperiences);
  };

  const removeAchievement = (expId: string, achievementIndex: number) => {
    const updatedExperiences = experiences.map(exp => 
      exp.id === expId ? { 
        ...exp, 
        achievements: exp.achievements.filter((_, index) => index !== achievementIndex)
      } : exp
    );
    onChange(updatedExperiences);
  };

  const updateAchievement = (expId: string, achievementIndex: number, value: string) => {
    const updatedExperiences = experiences.map(exp => 
      exp.id === expId ? { 
        ...exp, 
        achievements: exp.achievements.map((achievement, index) => 
          index === achievementIndex ? value : achievement
        )
      } : exp
    );
    onChange(updatedExperiences);
  };

  return (
    <div className="space-y-8">
      {experiences.map((experience, index) => (
        <div key={experience.id} className="bg-gray-50 rounded-lg p-6 relative">
          {/* 삭제 버튼 - 경력이 2개 이상일 때만 표시 */}
          {experiences.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(experience.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}

          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-1">경력 #{index + 1}</h3>
            <p className="text-sm text-gray-500">회사 정보와 담당 업무를 입력해주세요.</p>
          </div>

          <div className="space-y-4">
            {/* 회사명과 직책 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`company-${experience.id}`} className="text-gray-900 mb-2 block">
                  회사명 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`company-${experience.id}`}
                  placeholder="삼성전자"
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  className="bg-white border-gray-200"
                />
              </div>
              <div>
                <Label htmlFor={`position-${experience.id}`} className="text-gray-900 mb-2 block">
                  직책 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`position-${experience.id}`}
                  placeholder="소프트웨어 엔지니어"
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  className="bg-white border-gray-200"
                />
              </div>
            </div>

            {/* 근무지 */}
            <div>
              <Label htmlFor={`location-${experience.id}`} className="text-gray-900 mb-2 block">
                근무지
              </Label>
              <Input
                id={`location-${experience.id}`}
                placeholder="서울, 대한민국"
                value={experience.location}
                onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                className="bg-white border-gray-200"
              />
            </div>

            {/* 근무기간 */}
            <div className="space-y-3">
              <Label className="text-gray-900 block">근무기간</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`startDate-${experience.id}`} className="text-sm text-gray-600 mb-1 block">
                    시작일
                  </Label>
                  <Input
                    id={`startDate-${experience.id}`}
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    className="bg-white border-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor={`endDate-${experience.id}`} className="text-sm text-gray-600 mb-1 block">
                    종료일
                  </Label>
                  <Input
                    id={`endDate-${experience.id}`}
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    className="bg-white border-gray-200"
                    disabled={experience.isCurrentJob}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`current-${experience.id}`}
                  checked={experience.isCurrentJob}
                  onChange={(e) => {
                    updateExperience(experience.id, 'isCurrentJob', e.target.checked);
                    if (e.target.checked) {
                      updateExperience(experience.id, 'endDate', '');
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <Label htmlFor={`current-${experience.id}`} className="text-sm text-gray-600">
                  현재 재직 중
                </Label>
              </div>
            </div>

            {/* 업무 설명 */}
            <div>
              <Label htmlFor={`description-${experience.id}`} className="text-gray-900 mb-2 block">
                업무 설명
              </Label>
              <Textarea
                id={`description-${experience.id}`}
                placeholder="담당했던 주요 업무와 책임에 대해 설명해주세요."
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                className="bg-white border-gray-200 min-h-[100px]"
              />
            </div>

            {/* 주요 성과 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-gray-900">주요 성과 및 업적</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addAchievement(experience.id)}
                  className="text-blue-600 border-blue-600"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  성과 추가
                </Button>
              </div>
              <div className="space-y-2">
                {experience.achievements.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 flex-shrink-0">•</span>
                    <Input
                      placeholder="구체적인 성과나 업적을 입력하세요"
                      value={achievement}
                      onChange={(e) => updateAchievement(experience.id, achievementIndex, e.target.value)}
                      className="flex-1 bg-white border-gray-200"
                    />
                    {experience.achievements.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(experience.id, achievementIndex)}
                        className="text-gray-400 hover:text-red-600 flex-shrink-0 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 팁: 수치와 구체적인 결과를 포함하면 더 인상적입니다. (예: "매출 20% 증가", "프로젝트 일정 단축")
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* 경력 추가 버튼 */}
      <div className="text-center">
        <Button 
          variant="outline" 
          onClick={addExperience}
          className="border-dashed border-2 border-gray-300 hover:border-blue-300 text-gray-600 hover:text-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          경력 추가
        </Button>
      </div>
    </div>
  );
}