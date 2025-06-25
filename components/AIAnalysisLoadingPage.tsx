import { useEffect, useState } from 'react';
import { Brain, FileText, Users, Target, CheckCircle, Sparkles } from 'lucide-react';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';

interface AIAnalysisLoadingPageProps {
  fileName: string;
  onAnalysisComplete: () => void;
}

export function AIAnalysisLoadingPage({ fileName, onAnalysisComplete }: AIAnalysisLoadingPageProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    {
      icon: FileText,
      title: '이력서 파싱 중',
      description: '업로드된 이력서의 내용을 분석하고 있습니다',
      duration: 1500
    },
    {
      icon: Brain,
      title: 'AI 스킬 매칭',
      description: '보유 기술과 경력을 기반으로 매칭 분석 중',
      duration: 2000
    },
    {
      icon: Users,
      title: '기업 데이터 분석',
      description: '수천 개 기업의 채용 조건을 비교 분석 중',
      duration: 1800
    },
    {
      icon: Target,
      title: '맞춤 추천 생성',
      description: '당신에게 최적화된 기업 리스트를 생성 중',
      duration: 1200
    }
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let stepTimeout: NodeJS.Timeout;
    let totalDuration = 0;

    const runAnalysis = () => {
      // 진행률 업데이트
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 3;
        });
      }, 100);

      // 단계별 업데이트
      analysisSteps.forEach((step, index) => {
        stepTimeout = setTimeout(() => {
          setCurrentStep(index);
        }, totalDuration);
        totalDuration += step.duration;
      });

      // 완료 후 페이지 이동
      setTimeout(() => {
        setProgress(100);
        setCurrentStep(analysisSteps.length);
        setTimeout(() => {
          onAnalysisComplete();
        }, 800);
      }, totalDuration);
    };

    runAnalysis();

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [onAnalysisComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-2 border-purple-200 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center space-y-8">
            {/* 메인 로딩 아이콘 */}
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center relative">
                <Brain className="w-12 h-12 text-purple-600 animate-pulse" />
                <div className="absolute inset-0 border-4 border-purple-300 rounded-full animate-spin border-t-transparent"></div>
              </div>
            </div>

            {/* 메인 타이틀 */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI가 분석 중입니다
              </h1>
              <p className="text-lg text-gray-600">
                당신의 이력서를 바탕으로 최적의 기업을 찾고 있습니다
              </p>
            </div>

            {/* 파일 정보 */}
            <Card className="bg-gray-50 border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">분석 중인 파일</p>
                    <p className="text-sm text-gray-600">{fileName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 진행률 바 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">분석 진행률</span>
                <span className="text-purple-600 font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3 bg-gray-200">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </Progress>
            </div>

            {/* 현재 단계 표시 */}
            <div className="space-y-6">
              {analysisSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div 
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 scale-105' 
                        : isCompleted
                        ? 'bg-green-50 border-2 border-green-200'
                        : 'bg-gray-50 border border-gray-200 opacity-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-gradient-to-br from-purple-100 to-blue-100'
                        : isCompleted
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <StepIcon className={`w-6 h-6 ${
                          isActive ? 'text-purple-600 animate-pulse' : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className={`font-medium ${
                        isActive ? 'text-purple-900' : isCompleted ? 'text-green-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${
                        isActive ? 'text-purple-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    {isActive && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 완료 상태 */}
            {currentStep >= analysisSteps.length && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-200 animate-pulse">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">분석 완료!</h3>
                    <p className="text-sm text-green-600">맞춤 기업 추천 결과를 확인하세요</p>
                  </div>
                </div>
              </div>
            )}

            {/* 추가 정보 */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                AI 분석 과정에서 개인정보는 안전하게 보호되며,
                <br />
                분석 완료 후 즉시 삭제됩니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}