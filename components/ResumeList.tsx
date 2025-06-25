import { Calendar, MoreHorizontal, Upload, Brain, Edit } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface ResumeListProps {
  onResumeClick: (resumeId: number) => void;
  onNewResumeClick: () => void;
  onFileUpload: () => void;
  onResumeAnalysis?: (resumeId: number) => void;
}

export function ResumeList({ onResumeClick, onNewResumeClick, onFileUpload, onResumeAnalysis }: ResumeListProps) {
  const resumes = [
    {
      id: 1,
      title: "한예슬 1",
      subtitle: "디자이너 출신 데이터를 알려주세요.",
      status: "기본 이력서",
      date: "작성 중 25.06.25",
      hasData: true
    },
    {
      id: 2,
      title: "한예슬 2", 
      subtitle: "",
      status: "",
      date: "작성 중 25.06.25",
      hasData: true
    }
  ];

  const handleAnalysisClick = (e: React.MouseEvent, resumeId: number) => {
    e.stopPropagation();
    onResumeAnalysis?.(resumeId);
  };

  const handleEditClick = (e: React.MouseEvent, resumeId: number) => {
    e.stopPropagation();
    onResumeClick(resumeId);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">내 이력서 리스트</h2>
          <p className="text-gray-600 mt-2">저장된 이력서를 편집하거나 AI 분석을 받아보세요</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 새 이력서 작성 카드 */}
          <Card 
            className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer"
            onClick={onNewResumeClick}
          >
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-blue-600">+</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">새 이력서 작성</h3>
              <p className="text-sm text-gray-500">처음부터 새로 작성하기</p>
            </CardContent>
          </Card>

          {/* 파일 업로드 카드 */}
          <Card 
            className="border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors cursor-pointer"
            onClick={onFileUpload}
          >
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">파일 업로드</h3>
              <p className="text-sm text-gray-500">PDF, DOCX 파일 업로드</p>
            </CardContent>
          </Card>

          {/* 이력서 카드들 */}
          {resumes.map((resume) => (
            <Card 
              key={resume.id} 
              className="bg-white hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900">{resume.title}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
                
                {resume.subtitle && (
                  <p className="text-gray-600 text-sm mb-4">{resume.subtitle}</p>
                )}
                
                {resume.status && (
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {resume.status}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{resume.date}</span>
                </div>

                {/* 액션 버튼들 */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-9"
                    onClick={(e) => handleEditClick(e, resume.id)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    편집
                  </Button>
                  
                  {resume.hasData && (
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 h-9 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={(e) => handleAnalysisClick(e, resume.id)}
                    >
                      <Brain className="w-4 h-4 mr-1" />
                      AI 분석
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 안내 메시지 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Brain className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">AI 이력서 분석이란?</h4>
              <p className="text-sm text-blue-800">
                실제 세종대 졸업생 데이터를 바탕으로 이력서를 분석하고, 개인별 맞춤 취업 전략과 기업 추천을 제공합니다. 
                합격 확률까지 정확하게 알려드려요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}