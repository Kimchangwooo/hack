import { ArrowLeft, CheckCircle, AlertCircle, Users, Award, Calendar, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';

interface AnalysisResultsProps {
  onBack: () => void;
  onNewAnalysis: () => void;
}

export function AnalysisResults({ onBack, onNewAnalysis }: AnalysisResultsProps) {
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
              <h1 className="text-xl font-semibold">AI 합격예측 결과</h1>
            </div>
            <Button onClick={onNewAnalysis}>새 분석</Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 전체 합격률 */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">78%</span>
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

        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">상세 분석</TabsTrigger>
            <TabsTrigger value="improvements">개선 제안</TabsTrigger>
            <TabsTrigger value="comparison">동기 비교</TabsTrigger>
            <TabsTrigger value="sejong">세종대 특화</TabsTrigger>
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
                        <Progress value={95} className="w-20 h-2" />
                        <span className="text-sm font-medium">95/100</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>학력</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={88} className="w-20 h-2" />
                        <span className="text-sm font-medium">88/100</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>기술 스택</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={82} className="w-20 h-2" />
                        <span className="text-sm font-medium">82/100</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>프로젝트</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={75} className="w-20 h-2" />
                        <span className="text-sm font-medium">75/100</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>경력</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={65} className="w-20 h-2" />
                        <span className="text-sm font-medium">65/100</span>
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
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">최신 기술 스택</h4>
                        <p className="text-sm text-gray-600">React, TypeScript 등 트렌드 기술 보유</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">세종대학교 출신</h4>
                        <p className="text-sm text-gray-600">세종대 우대기업 지원 시 가산점</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">체계적인 이력서</h4>
                        <p className="text-sm text-gray-600">정보가 명확하고 구조화되어 있음</p>
                      </div>
                    </div>
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
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-medium text-orange-800">프로젝트 설명 보강</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      프로젝트별 구체적인 성과와 기여도를 수치로 표현하여 
                      임팩트를 강화하세요.
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">영향도: 높음</Badge>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-medium text-yellow-800">경력 세부사항 추가</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      인턴 경험이나 부트캠프 경험을 더 상세히 기술하여 
                      경험의 깊이를 보여주세요.
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">영향도: 중간</Badge>
                    </div>
                  </div>
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

          {/* 동기 비교 */}
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
                    <div className="mt-4 text-xs text-gray-500">
                      컴퓨터공학과 2024년 졸업생 기준
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">상위 18%</div>
                    <div className="text-sm text-gray-600 mt-1">기술 스택</div>
                    <div className="mt-4 text-xs text-gray-500">
                      동일 전공 졸업생 대비
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">상위 35%</div>
                    <div className="text-sm text-gray-600 mt-1">경력</div>
                    <div className="mt-4 text-xs text-gray-500">
                      신입 개발자 기준
                    </div>
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
                      <span className="text-sm">React</span>
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
                        <span className="font-medium">LG전자</span>
                        <Badge className="bg-green-100 text-green-800">추천</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">네이버</span>
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
                          "교내 프로젝트 경험을 구체적으로 어피하면 좋은 평가를 받을 수 있어요."
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
        </Tabs>
      </div>
    </div>
  );
}