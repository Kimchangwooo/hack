import { useState } from 'react';
import { ChevronLeft, Globe, Copy, Download, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { PersonalInfoSection } from './resume-sections/PersonalInfoSection';
import { EducationSection } from './resume-sections/EducationSection';
import { SkillsSection } from './resume-sections/SkillsSection';
import { ProjectSection } from './resume-sections/ProjectSection';

type SectionType = 'personal' | 'education' | 'skills' | 'language' | 'projects' | 'links';

interface ResumeEditorProps {
  onBack: () => void;
  initialData?: any;
}

export function ResumeEditor({ onBack, initialData }: ResumeEditorProps) {
  const [activeSection, setActiveSection] = useState<SectionType>('personal');
  
  // 단계별 빌더에서 전달받은 데이터가 있으면 사용
  const [resumeData, setResumeData] = useState(initialData || null);

  const sections = [
    { id: 'personal' as SectionType, name: '간단 소개', isComplete: true },
    { id: 'education' as SectionType, name: '학력', isComplete: false },
    { id: 'skills' as SectionType, name: '수상/자격증/기타', isComplete: false },
    { id: 'language' as SectionType, name: '어학', isComplete: false },
    { id: 'projects' as SectionType, name: '프로젝트', isComplete: false },
    { id: 'links' as SectionType, name: '링크', isComplete: false },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoSection initialData={resumeData?.personal} />;
      case 'education':
        return <EducationSection />;
      case 'skills':
        return <SkillsSection />;
      case 'language':
        return <div className="p-8 text-gray-500">어학 섹션 준비 중...</div>;
      case 'projects':
        return <ProjectSection />;
      case 'links':
        return <div className="p-8 text-gray-500">링크 섹션 준비 중...</div>;
      default:
        return <PersonalInfoSection initialData={resumeData?.personal} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 좌측 - 뒤로가기 */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-gray-900"
                onClick={onBack}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                이력서 페이지로
              </Button>
            </div>

            {/* 중앙 - 제목 */}
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 text-sm">기본 이력서</span>
                <span className="text-gray-900 font-medium">한예슬 1</span>
              </div>
            </div>

            {/* 우측 - 언어선택 및 버튼들 */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-gray-600 cursor-pointer">
                <Globe className="w-4 h-4 mr-1" />
                <span className="text-sm">한국어</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
              <Button variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-1" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-1" />
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600">
                임시 저장
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                저장 완료
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* 좌측 사이드바 */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]">
          <nav className="p-4">
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{section.name}</span>
                      {section.isComplete && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 bg-white">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}