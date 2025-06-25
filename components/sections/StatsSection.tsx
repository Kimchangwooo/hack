import { TrendingUp, Users, Award, Clock, Building, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: "50,000+",
    label: "성공한 사용자",
    description: "우리 플랫폼으로 취업에 성공한 사용자 수",
    color: "text-blue-600 bg-blue-100"
  },
  {
    icon: TrendingUp,
    number: "95%",
    label: "합격률 향상",
    description: "Career AI 사용 후 면접 합격률 증가",
    color: "text-green-600 bg-green-100"
  },
  {
    icon: Clock,
    number: "2분",
    label: "평균 작성 시간",
    description: "AI 도움으로 완성하는 평균 이력서 작성 시간",
    color: "text-purple-600 bg-purple-100"
  },
  {
    icon: Building,
    number: "1,200+",
    label: "파트너 기업",
    description: "우리와 함께하는 채용 파트너 기업 수",
    color: "text-orange-600 bg-orange-100"
  },
  {
    icon: Award,
    number: "4.9/5",
    label: "사용자 만족도",
    description: "실제 사용자들이 남긴 평균 평점",
    color: "text-yellow-600 bg-yellow-100"
  },
  {
    icon: Globe,
    number: "24/7",
    label: "AI 지원",
    description: "언제든지 이용 가능한 AI 이력서 분석",
    color: "text-indigo-600 bg-indigo-100"
  }
];

export function StatsSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg width="40" height="40" viewBox="0 0 40 40" className="w-full h-full">
          <defs>
            <pattern id="stats-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="20" fill="none" stroke="white" strokeOpacity="0.02" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stats-circles)" />
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            성과 및 통계
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            숫자로 증명하는 성공
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Career AI가 만들어낸 실제 성과와 사용자들의 성공 스토리를 확인해보세요
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              {/* Background Card */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:bg-white/10 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative p-8 text-center">
                <div className={`w-16 h-16 mx-auto rounded-2xl ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                
                <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                
                <h3 className="text-xl font-bold mb-3">
                  {stat.label}
                </h3>
                
                <p className="text-blue-200 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">실시간 업데이트</span>
            </div>
            <span className="hidden sm:block text-white/60">|</span>
            <span className="text-blue-100">
              매일 새로운 성공 사례가 추가되고 있습니다
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}