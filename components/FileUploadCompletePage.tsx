import { CheckCircle, FileText, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface FileUploadCompletePageProps {
  fileName: string;
  onStartAnalysis: () => void;
  onBackToHome: () => void;
}

export function FileUploadCompletePage({ 
  fileName, 
  onStartAnalysis, 
  onBackToHome 
}: FileUploadCompletePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-2 border-green-200 shadow-xl bg-white">
          <CardContent className="p-12 text-center space-y-8">
            {/* 성공 아이콘 */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            {/* 메인 메시지 */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">
                이력서 업로드가 완료되었습니다!
              </h1>
              <p className="text-lg text-gray-600">
                업로드된 이력서를 바탕으로 맞춤형 기업을 추천해드립니다. AI 분석을 통해 더 정확한 합격률을 확인해보세요.
              </p>
            </div>

            {/* 업로드된 파일 정보 */}
            <Card className="bg-gray-50 border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">파일명</p>
                    <p className="text-sm text-gray-600">{fileName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 분석 혜택 설명 */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-6 h-6 text-purple-600 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">AI 분석으로 얻을 수 있는 혜택</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 당신의 경력과 스킬에 맞는 맞춤형 기업 추천</li>
                    <li>• 각 기업별 합격 가능성 예측 분석</li>
                    <li>• 이력서 개선 포인트 및 전략 제안</li>
                    <li>• 실시간 채용 정보 및 경쟁률 데이터</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={onBackToHome}
                className="px-8 py-3 text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                홈으로 돌아가기
              </Button>
              <Button
                onClick={onStartAnalysis}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                AI 분석 시작하기
              </Button>
            </div>

            {/* 추가 정보 */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                업로드된 이력서는 개인정보 보호 규정 및 개인정보 보호법을 준수하며,
                <br />
                GDPR 표준에 따라 안전하게 처리됩니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}