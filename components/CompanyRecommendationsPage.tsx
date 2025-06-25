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
    {
      id: 1,
      name: '삼성전자',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      matchRate: 94,
      position: 'Frontend Developer',
      location: '수원, 경기도',
      employees: '267,937명',
      industry: '전자/반도체',
      salaryRange: '₩45,000,000 - ₩65,000,000',
      benefits: ['4대보험', '연금', '상여금', '주식매수선택권'],
      requirements: ['React', 'JavaScript', '3년 이상 경력'],
      description: '글로벌 전자 기업에서 혁신적인 웹 애플리케이션을 개발할 기회입니다.',
      whyRecommended: '귀하의 React 및 JavaScript 전문성이 삼성전자의 디지털 트랜스포메이션 프로젝트와 완벽하게 일치합니다.'
    },
    {
      id: 2,
      name: 'LG전자',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      matchRate: 89,
      position: 'UI/UX 개발자',
      location: '서울, 영등포구',
      employees: '75,000명',
      industry: '전자/가전',
      salaryRange: '₩42,000,000 - ₩58,000,000',
      benefits: ['4대보험', '연금', '상여금', '건강검진'],
      requirements: ['React', 'TypeScript', 'UI/UX 디자인'],
      description: '사용자 중심의 혁신적인 인터페이스를 설계하고 개발하는 역할입니다.',
      whyRecommended: '귀하의 UI/UX 개발 경험과 TypeScript 역량이 LG전자의 스마트 가전 플랫폼 개발에 적합합니다.'
    },
    {
      id: 3,
      name: '네이버',
      logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop&crop=center',
      matchRate: 87,
      position: 'Frontend Engineer',
      location: '경기, 분당구',
      employees: '3,600명',
      industry: 'IT서비스',
      salaryRange: '₩50,000,000 - ₩70,000,000',
      benefits: ['4대보험', '연금', '상여금', '스톡옵션', '자기계발비'],
      requirements: ['JavaScript', 'React', 'Node.js'],
      description: '수억 명이 사용하는 서비스의 프론트엔드를 개발하고 최적화합니다.',
      whyRecommended: '귀하의 성능 최적화 경험과 대규모 서비스 개발 역량이 네이버의 요구사항과 일치합니다.'
    }
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