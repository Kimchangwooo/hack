import { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, Users, Award, Calendar, Zap, Star, MapPin, Building, TrendingUp, Brain, Target, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DetailedAnalysisPageProps {
  onBack: () => void;
  uploadedFileName: string;
  uploadedResumeData?: any;
}

export function DetailedAnalysisPage({ onBack, uploadedFileName, uploadedResumeData }: DetailedAnalysisPageProps) {
  const [activeTab, setActiveTab] = useState('analysis');

  // 분석 결과 데이터
  const analysisData = {
    overallScore: 78,
    sectionScores: {
      personalInfo: 95,
      education: 88,
      skills: 82,
      projects: 75,
      experience: 65
    },
    strengths: [
      {
        title: '최신 기술 스택',
        description: 'React, TypeScript 등 트렌드 기술 보유',
        icon: CheckCircle
      },
      {
        title: '세종대학교 출신',
        description: '세종대 우대기업 지원 시 가산점',
        icon: CheckCircle
      },
      {
        title: '체계적인 이력서',
        description: '정보가 명확하고 구조화되어 있음',
        icon: CheckCircle
      }
    ],
    improvements: [
      {
        title: '프로젝트 설명 보강',
        description: '프로젝트별 구체적인 성과와 기여도를 수치로 표현하여 임팩트를 강화하세요.',
        priority: 'high',
        impact: '높음'
      },
      {
        title: '경력 세부사항 추가',
        description: '인턴 경험이나 부트캠프 경험을 더 상세히 기술하여 경험의 깊이를 보여주세요.',
        priority: 'medium',
        impact: '중간'
      }
    ]
  };

  // 회사 추천 데이터
  const companies = [
    {
      id: 1,
      name: '삼성전자',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      successRate: 49.82,
      position: 'Backend Developer',
      location: '수원, 경기도',
      employees: '267,937명',
      industry: '전자/반도체',
      salaryRange: '₩45,000,000 - ₩65,000,000',
      benefits: ['4대보험', '연금', '상여금', '주식매수선택권'],
      requirements: ['Java', 'Spring Boot', '3년 이상 경력'],
      description: '글로벌 전자 기업에서 혁신적인 백엔드 시스템을 개발할 기회입니다.',
      whyRecommended: '귀하의 Java 및 Spring Boot 전문성이 삼성전자의 대규모 시스템 개발 프로젝트와 완벽하게 일치합니다.'
    },
    {
      id: 2,
      name: 'SK하이닉스',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      successRate: 34.69,
      position: 'UI/UX 개발자',
      location: '서울, 영등포구',
      employees: '75,000명',
      industry: '전자/가전',
      salaryRange: '₩42,000,000 - ₩58,000,000',
      benefits: ['4대보험', '연금', '상여금', '건강검진'],
      requirements: ['React', 'TypeScript', 'UI/UX 디자인'],
      description: '사용자 중심의 혁신적인 인터페이스를 설계하고 개발하는 역할입니다.',
      whyRecommended: '귀하의 UI/UX 개발 경험과 TypeScript 역량이 SK하이닉스의 스마트 가전 플랫폼 개발에 적합합니다.'
    },
    {
      id: 3,
      name: 'SK이노베이션',
      logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop&crop=center',
      successRate: 10.06,
      position: 'Frontend Engineer',
      location: '경기, 분당구',
      employees: '3,600명',
      industry: 'IT서비스',
      salaryRange: '₩50,000,000 - ₩70,000,000',
      benefits: ['4대보험', '연금', '상여금', '스톡옵션', '자기계발비'],
      requirements: ['JavaScript', 'React', 'Node.js'],
      description: '수억 명이 사용하는 서비스의 프론트엔드를 개발하고 최적화합니다.',
      whyRecommended: '귀하의 성능 최적화 경험과 대규모 서비스 개발 역량이 SK이노베이션의 요구사항과 일치합니다.'
    }
  ];

  // 가장 높은 합격률 찾기
  const highestSuccessRate = Math.max(...companies.map(company => company.successRate));

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600 bg-green-100';
    if (rate >= 80) return 'text-blue-600 bg-blue-100';
    if (rate >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'border-orange-500 text-orange-800';
    if (priority === 'medium') return 'border-yellow-500 text-yellow-800';
    return 'border-blue-500 text-blue-800';
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
                <ArrowLeft className="w-4 h-4 mr-1" />
                홈으로
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">AI 이력서 분석 결과</h1>
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
        {/* 전체 합격률 */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{analysisData.overallScore}%</span>
                </div>
                <div className="text-left">
                  <h2 className="text-3xl font-bold text-green-600">합격 가능성 높음</h2>
                  <p className="text-gray-600">상위 22% 수준의 우수한 이력서입니다</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <div className="text-sm text-gray-600">세종대 우대기업</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">78%</div>
                  <div className="text-sm text-gray-600">대기업 합격률</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">85%</div>
                  <div className="text-sm text-gray-600">IT 스타트업</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="analysis">상세 분석</TabsTrigger>
            <TabsTrigger value="improvements">개선 제안</TabsTrigger>
            <TabsTrigger value="comparison">등급 비교</TabsTrigger>
            <TabsTrigger value="sejong">세종대 특화</TabsTrigger>
            <TabsTrigger value="companies">기업 추천</TabsTrigger>
          </TabsList>

          {/* 상세 분석 */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>섹션별 점수</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>개인정보</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={analysisData.sectionScores.personalInfo} className="w-20 h-2" />
                        <span className="text-sm font-medium">{analysisData.sectionScores.personalInfo}/100</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>학력</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={analysisData.sectionScores.education} className="w-20 h-2" />
                        <span className="text-sm font-medium">{analysisData.sectionScores.education}/100</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>기술 스택</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={analysisData.sectionScores.skills} className="w-20 h-2" />
                        <span className="text-sm font-medium">{analysisData.sectionScores.skills}/100</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>프로젝트</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={analysisData.sectionScores.projects} className="w-20 h-2" />
                        <span className="text-sm font-medium">{analysisData.sectionScores.projects}/100</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>경력</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={analysisData.sectionScores.experience} className="w-20 h-2" />
                        <span className="text-sm font-medium">{analysisData.sectionScores.experience}/100</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>강점 분석</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisData.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">{strength.title}</h4>
                          <p className="text-sm text-gray-600">{strength.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 개선 제안 */}
          <TabsContent value="improvements" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <span>우선 개선사항</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisData.improvements.map((improvement, index) => (
                    <div key={index} className={`border-l-4 pl-4 ${getPriorityColor(improvement.priority)}`}>
                      <h4 className="font-medium">{improvement.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{improvement.description}</p>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">영향도: {improvement.impact}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-blue-500" />
                    <span>추가 제안사항</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">자격증 추가</h4>
                        <p className="text-sm text-gray-600">정보처리기사, SQLD 등 관련 자격증 취득</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">포트폴리오 링크</h4>
                        <p className="text-sm text-gray-600">GitHub, 개인 블로그 링크 추가</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">어학 능력</h4>
                        <p className="text-sm text-gray-600">토익, 오픽 등 어학 점수 추가</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 등급 비교 */}
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>세종대 동기 비교</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">상위 22%</div>
                    <div className="text-sm text-gray-600 mt-1">전체 순위</div>
                    <div className="mt-4 text-xs text-gray-500">컴퓨터공학과 2024년 졸업생 기준</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">상위 18%</div>
                    <div className="text-sm text-gray-600 mt-1">기술 스택</div>
                    <div className="mt-4 text-xs text-gray-500">동일 전공 졸업생 대비</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">상위 35%</div>
                    <div className="text-sm text-gray-600 mt-1">경력</div>
                    <div className="mt-4 text-xs text-gray-500">신입 개발자 기준</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h4 className="font-medium mb-4">동기들이 많이 가진 스킬</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Java</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-32 h-2" />
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Python</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={72} className="w-32 h-2" />
                        <span className="text-sm text-gray-600">72%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Spring Boot</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={68} className="w-32 h-2" />
                        <span className="text-sm text-gray-600">68%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 세종대 특화 */}
          <TabsContent value="sejong" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>세종대학교 특화 분석</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">세종대 우대기업 (92% 합격률)</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">삼성전자</span>
                        <Badge className="bg-green-100 text-green-800">추천</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">SK하이닉스</span>
                        <Badge className="bg-green-100 text-green-800">추천</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">SK이노베이션</span>
                        <Badge className="bg-blue-100 text-blue-800">가능</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">세종대 출신 선배 조언</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          "삼성전자 입사 시 세종대 선배 네트워크를 적극 활용하세요."
                        </p>
                        <div className="text-xs text-gray-500">- 삼성전자 개발자 김○○ (17학번)</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          "백엔드 프로젝트 경험을 구체적으로 어피하면 좋은 평가를 받을 수 있어요."
                        </p>
                        <div className="text-xs text-gray-500">- 카카오 개발자 이○○ (16학번)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h4 className="font-medium mb-4">추천 액션 플랜</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <h5 className="font-medium">이번 주</h5>
                        <p className="text-sm text-gray-600">프로젝트 설명 보강 및 GitHub 정리</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Calendar className="w-5 h-5 text-green-500" />
                      <div>
                        <h5 className="font-medium">이번 달</h5>
                        <p className="text-sm text-gray-600">정보처리기사 자격증 취득 준비</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-500" />
                      <div>
                        <h5 className="font-medium">3개월 내</h5>
                        <p className="text-sm text-gray-600">세종대 우대기업 지원 및 선배 네트워킹</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 기업 추천 */}
          <TabsContent value="companies" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">당신에게 추천하는 기업</h2>
                <p className="text-gray-600 mt-1">AI 분석을 통해 선별된 {companies.length}개의 맞춤 기업</p>
              </div>
              <Badge variant="outline" className="text-purple-600 border-purple-200">
                합격률 순
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
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                            {company.successRate === highestSuccessRate && (
                              <span className="text-lg" title="TOP 추천">🏆</span>
                            )}
                          </div>
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
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSuccessRateColor(company.successRate)}`}>
                          <Star className="w-4 h-4 mr-1" />
                          합격률 {company.successRate}%
                        </div>
                        <Progress value={company.successRate} className="w-24 mt-2" />
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
          </TabsContent>
        </Tabs>

        {/* 추가 안내 */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">AI 분석의 정확도를 높이는 방법</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 이력서를 최신 정보로 업데이트하면 더 정확한 분석을 받을 수 있습니다</li>
                  <li>• 프로젝트 설명을 구체적으로 작성하여 더 나은 매칭을 받아보세요</li>
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