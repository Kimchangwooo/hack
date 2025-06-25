import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Code, Star, StarHalf, Languages, Wrench, Palette } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Skill } from '../../types/resume';

interface SkillsStepProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export function SkillsStep({ skills, onChange }: SkillsStepProps) {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [initialized, setInitialized] = useState(false);

  // 스킬 카테고리 정의
  const skillCategories = [
    { id: 'programming', name: '프로그래밍 언어', icon: Code, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'frontend', name: '프론트엔드', icon: Palette, color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'backend', name: '백엔드', icon: Wrench, color: 'bg-green-100 text-green-800 border-green-200' },
    { id: 'database', name: '데이터베이스', icon: Wrench, color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { id: 'tools', name: '도구/프레임워크', icon: Wrench, color: 'bg-gray-100 text-gray-800 border-gray-200' },
    { id: 'language', name: '언어', icon: Languages, color: 'bg-rose-100 text-rose-800 border-rose-200' },
    { id: 'soft', name: '소프트 스킬', icon: Star, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
  ];

  // 인기 기술 스택 제안
  const popularSkills = {
    programming: ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Swift'],
    frontend: ['React', 'Vue.js', 'Angular', 'HTML/CSS', 'Tailwind CSS', 'SCSS', 'Bootstrap', 'Next.js', 'Nuxt.js'],
    backend: ['Node.js', 'Express', 'Django', 'Spring Boot', 'Laravel', 'Flask', 'FastAPI', 'NestJS'],
    database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'Firebase', 'Supabase'],
    tools: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Jenkins', 'Linux', 'Figma', 'Photoshop'],
    language: ['영어', '중국어', '일본어', '독일어', '프랑스어', '스페인어'],
    soft: ['팀워크', '리더십', '커뮤니케이션', '문제해결', '프로젝트 관리', '시간 관리', '창의적 사고']
  };

  // 자동으로 첫 번째 스킬 추가 (한 번만 실행)
  useEffect(() => {
    if (!initialized && skills.length === 0) {
      const defaultSkills: Skill[] = [
        { id: '1', name: 'JavaScript', category: 'programming', level: 4 },
        { id: '2', name: 'React', category: 'frontend', level: 4 },
        { id: '3', name: '영어', category: 'language', level: 3 }
      ];
      onChange(defaultSkills);
      setInitialized(true);
    }
  }, [skills.length, onChange, initialized]);

  const addSkill = useCallback(() => {
    if (newSkillName.trim() && newSkillCategory) {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: newSkillName.trim(),
        category: newSkillCategory,
        level: 3
      };
      
      onChange([...skills, newSkill]);
      setNewSkillName('');
      setNewSkillCategory('');
    }
  }, [newSkillName, newSkillCategory, skills, onChange]);

  const removeSkill = useCallback((id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  }, [skills, onChange]);

  const updateSkillLevel = useCallback((id: string, level: number) => {
    onChange(skills.map(skill => 
      skill.id === id ? { ...skill, level } : skill
    ));
  }, [skills, onChange]);

  const addPopularSkill = useCallback((skillName: string, category: string) => {
    if (!skills.some(skill => skill.name === skillName)) {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: skillName,
        category,
        level: 3
      };
      onChange([...skills, newSkill]);
    }
  }, [skills, onChange]);

  // 카테고리별 스킬 필터링
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  // 숙련도 레벨 표시 함수
  const renderSkillLevel = (level: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= level) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const getCategoryInfo = (categoryId: string) => {
    return skillCategories.find(cat => cat.id === categoryId) || skillCategories[0];
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
          <Code className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">기술 및 스킬</h2>
        <p className="text-gray-600">보유하고 있는 기술과 스킬을 입력하고 숙련도를 평가해주세요.</p>
      </div>

      {/* 스킬 추가 섹션 */}
      <Card className="border-2 border-green-100">
        <CardHeader>
          <CardTitle className="text-green-600 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            새 스킬 추가
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>스킬명</Label>
              <Input
                placeholder="예: JavaScript"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
            </div>
            <div className="space-y-2">
              <Label>카테고리</Label>
              <select
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
                className="border-input flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 h-9 appearance-none"
              >
                <option value="">카테고리 선택</option>
                {skillCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={addSkill}
                disabled={!newSkillName.trim() || !newSkillCategory}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                추가
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 인기 스킬 제안 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-700">💡 인기 기술 스택</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillCategories.map((category) => (
              <div key={category.id}>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularSkills[category.id as keyof typeof popularSkills]?.slice(0, 6).map((skill) => (
                    <Button
                      key={skill}
                      variant="outline"
                      size="sm"
                      onClick={() => addPopularSkill(skill, category.id)}
                      disabled={skills.some(s => s.name === skill)}
                      className="text-xs"
                    >
                      + {skill}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 스킬 필터링 */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          전체 ({skills.length})
        </Button>
        {skillCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name} ({skills.filter(s => s.category === category.id).length})
          </Button>
        ))}
      </div>

      {/* 스킬 목록 */}
      <div className="space-y-4">
        {filteredSkills.map((skill) => {
          const categoryInfo = getCategoryInfo(skill.category);
          return (
            <Card key={skill.id} className="border-2 border-gray-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className={categoryInfo.color}>
                      {categoryInfo.name}
                    </Badge>
                    <div>
                      <h3 className="font-medium text-gray-900">{skill.name}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderSkillLevel(skill.level)}
                        <span className="text-sm text-gray-500 ml-2">({skill.level}/5)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => updateSkillLevel(skill.id, level)}
                          className={`p-1 rounded ${
                            skill.level === level ? 'bg-yellow-100' : 'hover:bg-gray-100'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${
                            skill.level >= level ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`} />
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>아직 추가된 스킬이 없습니다.</p>
          <p className="text-sm">위의 인기 기술 스택을 클릭하거나 새 스킬을 추가해보세요.</p>
        </div>
      )}
    </div>
  );
}