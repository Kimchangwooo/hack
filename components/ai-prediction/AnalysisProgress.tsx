import { ArrowLeft, Brain, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface AnalysisProgressProps {
  selectedResume: string;
  progress: number;
  onBack: () => void;
}

export function AnalysisProgress({ selectedResume, progress, onBack }: AnalysisProgressProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold">AI 분석 진행 중</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">'{selectedResume}' 분석 중입니다</h2>
          <p className="text-gray-600 mb-8">AI가 당신의 이력서를 꼼꼼히 분석하고 있습니다.</p>
          
          <div className="max-w-md mx-auto mb-8">
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">{progress}% 완료</p>
          </div>

          <div className="space-y-4 text-left max-w-sm mx-auto">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">개인정보 및 연락처 분석</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">학력 및 전공 분석</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">경력 및 프로젝트 분석</span>
            </div>
            <div className="flex items-center space-x-3">
              {progress >= 70 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>
              )}
              <span className="text-sm">AI 합격률 예측</span>
            </div>
            <div className="flex items-center space-x-3">
              {progress >= 90 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
              )}
              <span className="text-sm">개선 방안 생성</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}