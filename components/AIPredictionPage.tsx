import { useState } from 'react';
import { ArrowLeft, Brain } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AnalysisProgress } from './ai-prediction/AnalysisProgress';
import { DetailedAnalysisPage } from './DetailedAnalysisPage';
import { ResumeSelection } from './ai-prediction/ResumeSelection';
import { FeatureShowcase } from './ai-prediction/FeatureShowcase';

interface AIPredictionPageProps {
  onBack: () => void;
}

export function AIPredictionPage({ onBack }: AIPredictionPageProps) {
  const [analysisStep, setAnalysisStep] = useState<'select' | 'analyzing' | 'complete'>('select');
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleAnalyzeResume = (resumeName: string) => {
    setSelectedResume(resumeName);
    setAnalysisStep('analyzing');
    
    // 분석 진행 시뮬레이션
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAnalysisProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setAnalysisStep('complete');
        }, 500);
      }
    }, 200);
  };

  const resetAnalysis = () => {
    setAnalysisStep('select');
    setSelectedResume(null);
    setAnalysisProgress(0);
  };

  // 분석 진행 단계
  if (analysisStep === 'analyzing') {
    return (
      <AnalysisProgress
        selectedResume={selectedResume!}
        progress={analysisProgress}
        onBack={resetAnalysis}
      />
    );
  }

  // 분석 완료 단계 - DetailedAnalysisPage로 대체
  if (analysisStep === 'complete') {
    return (
      <DetailedAnalysisPage
        onBack={resetAnalysis}
        uploadedFileName={selectedResume!}
        uploadedResumeData={null}
      />
    );
  }

  // 이력서 선택 단계
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold">AI 합격예측</h1>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Beta
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 소개 섹션 */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">AI가 분석하는 합격 가능성</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            최신 AI 기술로 당신의 이력서를 분석하고, 세종대학교 졸업생 데이터를 바탕으로 
            정확한 합격 확률과 개선점을 제공합니다.
          </p>
        </div>

        {/* 이력서 선택 */}
        <div className="mb-12">
          <ResumeSelection onAnalyzeResume={handleAnalyzeResume} />
        </div>

        {/* 기능 소개 */}
        <FeatureShowcase />
      </div>
    </div>
  );
}