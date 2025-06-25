import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, GraduationCap, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Education } from '../../types/resume';

interface EducationStepProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationStep({ education, onChange }: EducationStepProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [initialized, setInitialized] = useState(false);

  // 자동으로 첫 번째 학력 항목 추가 (한 번만 실행)
  useEffect(() => {
    if (!initialized && education.length === 0) {
      const newEducation: Education = {
        id: Date.now().toString(),
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: ''
      };
      
      onChange([newEducation]);
      setExpandedItems(new Set([newEducation.id]));
      setInitialized(true);
    }
  }, [education.length, onChange, initialized]);

  const addEducation = useCallback(() => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    };
    
    const updatedEducation = [...education, newEducation];
    onChange(updatedEducation);
    setExpandedItems(prev => new Set([...prev, newEducation.id]));
  }, [education, onChange]);

  const updateEducation = useCallback((id: string, field: keyof Education, value: string) => {
    const updatedEducation = education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange(updatedEducation);
  }, [education, onChange]);

  const removeEducation = useCallback((id: string) => {
    const updatedEducation = education.filter(edu => edu.id !== id);
    onChange(updatedEducation);
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, [education, onChange]);

  const toggleExpanded = useCallback((id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const degreeOptions = [
    '고등학교 졸업',
    '전문학사',
    '학사',
    '석사',
    '박사',
    '기타'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i + 5);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
          <GraduationCap className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">학력 사항</h2>
        <p className="text-gray-600">교육 배경을 입력해주세요. 최신 학력부터 작성해주세요.</p>
      </div>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <Card key={edu.id} className="border-2 border-blue-100">
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpanded(edu.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    학력 {index + 1}
                  </Badge>
                  <CardTitle className="text-lg">
                    {edu.school || '학교명을 입력해주세요'}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  {edu.degree && (
                    <span className="text-sm text-gray-500">{edu.degree}</span>
                  )}
                  {education.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeEducation(edu.id);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedItems.has(edu.id) && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`school-${edu.id}`}>학교명 *</Label>
                    <Input
                      id={`school-${edu.id}`}
                      placeholder="예: 세종대학교"
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`}>학위 *</Label>
                    <select
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="border-input flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 h-9 appearance-none"
                    >
                      <option value="">학위 선택</option>
                      {degreeOptions.map((degree) => (
                        <option key={degree} value={degree}>
                          {degree}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`field-${edu.id}`}>전공 *</Label>
                    <Input
                      id={`field-${edu.id}`}
                      placeholder="예: 컴퓨터공학과"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`gpa-${edu.id}`}>학점 (선택)</Label>
                    <Input
                      id={`gpa-${edu.id}`}
                      placeholder="예: 3.8/4.5"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${edu.id}`}>입학년도 *</Label>
                    <select
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      className="border-input flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 h-9 appearance-none"
                    >
                      <option value="">입학년도 선택</option>
                      {years.map((year) => (
                        <option key={year} value={year.toString()}>
                          {year}년
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${edu.id}`}>졸업년도 *</Label>
                    <select
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      className="border-input flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 h-9 appearance-none"
                    >
                      <option value="">졸업년도 선택</option>
                      <option value="present">재학중</option>
                      {years.map((year) => (
                        <option key={year} value={year.toString()}>
                          {year}년
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${edu.id}`}>학업 내용 (선택)</Label>
                  <Textarea
                    id={`description-${edu.id}`}
                    placeholder="주요 수강 과목, 연구 분야, 학업 성과 등을 입력해주세요."
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                {/* 요약 정보 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">입력된 정보</h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p><strong>학교:</strong> {edu.school || '미입력'}</p>
                    <p><strong>학위:</strong> {edu.degree || '미선택'}</p>
                    <p><strong>전공:</strong> {edu.field || '미입력'}</p>
                    <p><strong>기간:</strong> {edu.startDate || '미선택'} - {edu.endDate === 'present' ? '재학중' : edu.endDate || '미선택'}</p>
                    {edu.gpa && <p><strong>학점:</strong> {edu.gpa}</p>}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={addEducation}
          variant="outline"
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          학력 추가
        </Button>
      </div>

      {/* 팁 섹션 */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-900 mb-2">💡 작성 팁</h4>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• 최신 학력부터 순서대로 작성해주세요</li>
          <li>• 관련 프로젝트나 수상경력이 있다면 상세 설명에 포함해주세요</li>
          <li>• 졸업예정인 경우 "재학중"을 선택해주세요</li>
          <li>• 학점은 4.5만점 기준으로 작성해주세요</li>
        </ul>
      </div>
    </div>
  );
}