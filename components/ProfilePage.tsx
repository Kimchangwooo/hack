import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Camera, Edit3, Settings, FileText, Briefcase, Award, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ProfilePageProps {
  onBack: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold">프로필</h1>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              설정
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 프로필 헤더 */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="프로필" />
                  <AvatarFallback className="bg-green-500 text-white text-2xl">김</AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold">김세종</h2>
                  <Badge variant="secondary">세종대학교</Badge>
                </div>
                <p className="text-gray-600 mb-4">프론트엔드 개발자 · 컴퓨터공학과</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>kim.sejong@example.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>010-1234-5678</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>서울특별시 광진구</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>가입일: 2024.01.15</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline">
                <Edit3 className="w-4 h-4 mr-2" />
                프로필 수정
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 탭 메뉴 */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="resumes">이력서</TabsTrigger>
            <TabsTrigger value="applications">지원현황</TabsTrigger>
            <TabsTrigger value="account">계정</TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 활동 통계 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>활동 통계</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>작성한 이력서</span>
                    <span className="font-semibold">3개</span>
                  </div>
                  <div className="flex justify-between">
                    <span>지원한 회사</span>
                    <span className="font-semibold">12개</span>
                  </div>
                  <div className="flex justify-between">
                    <span>면접 진행</span>
                    <span className="font-semibold">5개</span>
                  </div>
                  <div className="flex justify-between">
                    <span>최종 합격</span>
                    <span className="font-semibold text-green-600">2개</span>
                  </div>
                </CardContent>
              </Card>

              {/* 최근 활동 */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>최근 활동</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">삼성전자 프론트엔드 개발자 지원</p>
                      <p className="text-sm text-gray-600">2시간 전</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">이력서 '프론트엔드 개발자 v3' 업데이트</p>
                      <p className="text-sm text-gray-600">1일 전</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">네이버 면접 일정 확정</p>
                      <p className="text-sm text-gray-600">3일 전</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">카카오 최종 합격</p>
                      <p className="text-sm text-gray-600">1주 전</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 보유 스킬 */}
            <Card>
              <CardHeader>
                <CardTitle>보유 스킬</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">Git</Badge>
                  <Badge variant="secondary">AWS</Badge>
                  <Badge variant="secondary">Docker</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 이력서 탭 */}
          <TabsContent value="resumes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">프론트엔드 개발자 v3</h3>
                    <Badge variant="default">메인</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">최근 수정: 2025.01.20</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">수정</Button>
                    <Button size="sm" variant="outline">복사</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">백엔드 개발자</h3>
                    <Badge variant="secondary">보조</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">최근 수정: 2025.01.15</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">수정</Button>
                    <Button size="sm" variant="outline">복사</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">풀스택 개발자</h3>
                    <Badge variant="secondary">보조</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">최근 수정: 2025.01.10</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">수정</Button>
                    <Button size="sm" variant="outline">복사</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 지원현황 탭 */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>지원 현황</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">삼성전자</h4>
                        <p className="text-sm text-gray-600">프론트엔드 개발자</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">서류 검토 중</Badge>
                      <p className="text-sm text-gray-600 mt-1">지원일: 2025.01.20</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">네이버</h4>
                        <p className="text-sm text-gray-600">프론트엔드 개발자</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-purple-100 text-purple-800">면접 예정</Badge>
                      <p className="text-sm text-gray-600 mt-1">면접일: 2025.01.25</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">카카오</h4>
                        <p className="text-sm text-gray-600">프론트엔드 개발자</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">최종 합격</Badge>
                      <p className="text-sm text-gray-600 mt-1">합격일: 2025.01.15</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 계정 탭 */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>계정 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">이메일 주소</h4>
                  <div className="flex items-center justify-between">
                    <span>kim.sejong@example.com</span>
                    <Button variant="outline" size="sm">변경</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">비밀번호</h4>
                  <div className="flex items-center justify-between">
                    <span>••••••••</span>
                    <Button variant="outline" size="sm">변경</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">알림 설정</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>이메일 알림</span>
                      <Button variant="outline" size="sm">설정</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>채용 소식 알림</span>
                      <Button variant="outline" size="sm">설정</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="pt-4">
                  <Button variant="destructive" className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    로그아웃
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}