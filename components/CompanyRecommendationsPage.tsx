import { ChevronLeft, Star, Users, MapPin, Building, TrendingUp, CheckCircle, Brain, Target, Award, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CompanyRecommendationsPageProps {
  onBack: () => void;
  uploadedFileName: string;
  uploadedResumeData?: any;
}

export function CompanyRecommendationsPage({ onBack, uploadedFileName, uploadedResumeData }: CompanyRecommendationsPageProps) {
  // 분석된 이력서 데이터 (실제로는 AI 분석 결과)
  const analysisResults = {
    skills: ['JavaScript', 'React', 'TypeScript', 'Node.js'],
    experience: '3년',
    field: '프론트엔드 개발',
    strengths: ['UI/UX 개발', '성능 최적화', '협업 능력'],
    improvement: ['백엔드 개발', '데이터베이스 관리', '클라우드 서비스']
  };

  const companies = [
    { id: 1, name: '삼성전자', logo: '', matchRate: 40.56, position: '', location: '', employees: '', industry: '', salaryRange: '', benefits: [], requirements: [], description: '', whyRecommended: '' },
    { id: 2, name: 'SK하이닉스', logo: '', matchRate: 26.06, position: '', location: '', employees: '', industry: '', salaryRange: '', benefits: [], requirements: [], description: '', whyRecommended: '' },
    { id: 3, name: 'SK이노베이션', logo: '', matchRate: 23.51, position: '', location: '', employees: '', industry: '', salaryRange: '', benefits: [], requirements: [], description: '', whyRecommended: '' },
    { id: 4, name: 'LG전자', logo: '', matchRate: 4.75, position: '', location: '', employees: '', industry: '', salaryRange: '', benefits: [], requirements: [], description: '', whyRecommended: '' },
    { id: 5, name: '현대자동차', logo: '', matchRate: 2.42, position: '', location: '', employees: '', industry: '', salaryRange: '', benefits: [], requirements: [], description: '', whyRecommended: '' },
    { id: 6, name: '롯데', logo: '', matchRate: 1.59, position: '', location: '', employees: '', industry: '', salaryRange: '', benefits: [], requirements: [], description: '', whyRecommended: '' },
    { id: 7, name: 'KT', logo: '', matchRate: 0.57, position: '', location: '', employees: '', industry: '', salaryRange: '', benefits: [], requirements: [], description: '', whyRecommended: '' },
    { id: 8, name: '포스코', logo: '', matchRate: 0.38, position: '', location: '', employees: '', industry: '', salaryRange: '', benefits: [], requirements: [], description: '', whyRecommended: '' },
    { id: 9, name: 'CJ', logo: '', matchRate: 0.17, position: '', location: '', employees: '', industry: '', salaryRange: '', benefits: [], requirements: [], description: '', whyRecommended: '' },
  ];

  const getMatchRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600 bg-green-100';
    if (rate >= 80) return 'text-blue-600 bg-blue-100';
    if (rate >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-gray-900"
                onClick={onBack}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                홈으로
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">AI 기업 추천</h1>
                <p className="text-sm text-gray-500">분석 파일: {uploadedFileName}</p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
              <CheckCircle className="w-3 h-3 mr-1" />
              분석 완료
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 분석 결과 요약 */}
        <div className="mb-8">
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-900">
                <Brain className="w-6 h-6 mr-2" />
                AI 이력서 분석 결과
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 주요 기술 */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <h4 className="font-medium text-gray-900">주요 기술</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 경력 수준 */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">경력 수준</h4>
                  </div>
                  <div>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      {analysisResults.experience} 경력
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{analysisResults.field}</p>
                  </div>
                </div>

                {/* 강점 */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <h4 className="font-medium text-gray-900">주요 강점</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {analysisResults.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 개선 포인트 */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <h4 className="font-medium text-gray-900">개선 포인트</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {analysisResults.improvement.map((item, index) => (
                      <li key={index} className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-orange-400 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 추천 기업 목록 */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">당신에게 추천하는 기업</h2>
              <p className="text-gray-600 mt-1">AI 분석을 통해 선별된 {companies.length}개의 맞춤 기업</p>
            </div>
            <Badge variant="outline" className="text-purple-600 border-purple-200">
              매칭률 순
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {companies.map((company) => (
              <Card key={company.id} className="border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <ImageWithFallback
                          src={company.logo}
                          alt={`${company.name} 로고`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                        <p className="text-lg text-gray-700 mt-1">{company.position}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{company.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{company.employees}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Building className="w-4 h-4" />
                            <span>{company.industry}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMatchRateColor(company.matchRate)}`}>
                        <Star className="w-4 h-4 mr-1" />
                        매칭률 {company.matchRate}%
                      </div>
                      <Progress value={company.matchRate} className="w-24 mt-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">예상 연봉</h4>
                        <p className="text-lg font-semibold text-green-600">{company.salaryRange}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">주요 혜택</h4>
                        <div className="flex flex-wrap gap-2">
                          {company.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-gray-600">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">요구 사항</h4>
                        <div className="flex flex-wrap gap-2">
                          {company.requirements.map((req, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">업무 설명</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{company.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">추천 이유</h4>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                          <p className="text-purple-800 text-sm leading-relaxed">{company.whyRecommended}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>AI 분석 기반 추천</span>
                    </div>
                    <div className="space-x-3">
                      <Button variant="outline">상세 정보</Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">지원하기</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 추가 안내 */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">추천 정확도를 높이는 방법</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 이력서를 최신 정보로 업데이트하면 더 정확한 추천을 받을 수 있습니다</li>
                  <li>• 관심 분야나 선호하는 기업 문화를 프로필에 추가해보세요</li>
                  <li>• 정기적으로 스킬과 경력 정보를 업데이트하는 것을 권장합니다</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}