import { useState } from 'react';
import { ChevronLeft, ChevronRight, Target, DollarSign, MapPin, Building2, Crown, Star, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface Company {
  name: string;
  logo: string;
  position: string;
  successRate: number;
  salary: string;
  location: string;
  description: string;
  benefits: string[];
  bgColor: string;
  isTopRate: boolean;
}

interface RecommendedCompaniesCarouselProps {
  companies: Company[];
}

export function RecommendedCompaniesCarousel({ companies }: RecommendedCompaniesCarouselProps) {
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);

  const nextCompany = () => {
    setCurrentCompanyIndex((prev) => (prev + 1) % companies.length);
  };

  const prevCompany = () => {
    setCurrentCompanyIndex((prev) => (prev - 1 + companies.length) % companies.length);
  };

  const goToCompany = (index: number) => {
    setCurrentCompanyIndex(index);
  };

  const currentCompany = companies[currentCompanyIndex];

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center justify-center space-x-2">
          <Target className="w-5 h-5" />
          <span>당신에게 추천하는 회사</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* 메인 캐러셀 카드 */}
          <div className="relative overflow-hidden rounded-xl">
            <div className={`bg-gradient-to-r ${currentCompany.bgColor} p-16 text-white relative min-h-[400px]`}>
              {/* 최고 합격률 강조 요소 */}
              {currentCompany.isTopRate && (
                <div className="absolute top-6 left-6 flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full">
                    <Crown className="w-4 h-4" />
                    <span className="text-sm font-bold">최고 합격률</span>
                  </div>
                  <div className="text-2xl animate-bounce">🏆</div>
                </div>
              )}
              
              <div className="absolute top-6 right-6">
                <div className="text-8xl opacity-20">{currentCompany.logo}</div>
                {currentCompany.isTopRate && (
                  <div className="absolute -top-2 -right-2 text-3xl animate-pulse">⭐</div>
                )}
              </div>
              
              <div className="relative z-10 pt-16">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-4xl font-bold">{currentCompany.name}</h3>
                      {currentCompany.isTopRate && (
                        <div className="flex space-x-1">
                          <Star className="w-6 h-6 text-yellow-300 fill-current" />
                          <Star className="w-6 h-6 text-yellow-300 fill-current" />
                          <Star className="w-6 h-6 text-yellow-300 fill-current" />
                        </div>
                      )}
                    </div>
                    <p className="text-xl opacity-90">{currentCompany.position}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-4xl font-bold">{currentCompany.successRate}%</div>
                      {currentCompany.isTopRate && (
                        <div className="text-2xl">🎯</div>
                      )}
                    </div>
                    <div className="text-lg opacity-90">합격률</div>
                    {currentCompany.isTopRate && (
                      <Badge className="bg-yellow-400 text-yellow-900 mt-2">
                        <Crown className="w-3 h-3 mr-1" />
                        최고
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <DollarSign className="w-6 h-6" />
                    <div>
                      <div className="text-xl font-semibold">{currentCompany.salary}</div>
                      <div className="text-sm opacity-90">예상 연봉</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <MapPin className="w-6 h-6" />
                    <div>
                      <div className="text-xl font-semibold">{currentCompany.location}</div>
                      <div className="text-sm opacity-90">근무지</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Building2 className="w-6 h-6" />
                    <div>
                      <div className="text-xl font-semibold">세종대 우대</div>
                      <div className="text-sm opacity-90">특별 전형</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <p className="text-xl opacity-95">{currentCompany.description}</p>
                    {currentCompany.isTopRate && (
                      <div className="text-xl">🚀</div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {currentCompany.benefits.map((benefit, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-white/20 text-white border-white/30 text-sm py-1 px-3"
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 추가 강조 메시지 */}
                {currentCompany.isTopRate && (
                  <div className="bg-yellow-400/20 border border-yellow-300/30 rounded-lg p-4 mt-6">
                    <div className="flex items-center space-x-2 text-yellow-100">
                      <div className="text-xl">🎉</div>
                      <span className="font-semibold">가장 높은 합격 확률을 가진 추천 기업입니다!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 좌우 화살표 */}
          <Button
            variant="outline"
            size="lg"
            onClick={prevCompany}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-white/50 hover:bg-white hover:scale-110 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={nextCompany}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-white/50 hover:bg-white hover:scale-110 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* 인디케이터 */}
        <div className="flex justify-center space-x-3 mt-8">
          {companies.map((company, index) => (
            <button
              key={index}
              onClick={() => goToCompany(index)}
              className={`relative transition-all duration-300 ${
                index === currentCompanyIndex
                  ? 'w-4 h-4 bg-blue-500 scale-125'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              } rounded-full`}
            >
              {company.isTopRate && index === currentCompanyIndex && (
                <div className="absolute -top-1 -right-1 text-xs">👑</div>
              )}
            </button>
          ))}
        </div>

        {/* 추가 정보 */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">세종대 특별 우대</span>
          </div>
          <p className="text-sm text-blue-800">
            이 회사는 세종대학교와 특별 협약을 맺고 있어 서류 전형에서 가산점을 받을 수 있습니다.
            또한 세종대 출신 선배들이 많이 근무하고 있어 네트워킹에 도움이 됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}