import { Target, TrendingUp, Award, ArrowRight, Zap, Users, Brain } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export function FeatureShowcase() {
  const features = [
    {
      icon: Target,
      title: "정확한 예측",
      description: "세종대학교 졸업생 10,000+ 데이터 기반 정확한 합격률 예측",
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      bgPattern: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      stats: "98% 정확도",
      highlight: "AI 분석"
    },
    {
      icon: TrendingUp,
      title: "개선 제안",
      description: "AI가 분석한 맞춤형 이력서 개선 방안과 실행 가이드",
      gradient: "from-green-500 via-emerald-600 to-teal-600",
      bgPattern: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      stats: "평균 +23% 향상",
      highlight: "맞춤 솔루션"
    },
    {
      icon: Award,
      title: "세종대 특화",
      description: "세종대학교 재학생/졸업생 맞춤형 분석 및 진로 가이드",
      gradient: "from-purple-500 via-violet-600 to-purple-600",
      bgPattern: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      stats: "553개 우대기업",
      highlight: "세종대 전용"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {features.map((feature, index) => (
        <Card 
          key={index}
          className="group relative overflow-hidden border-0 bg-gradient-to-br shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${feature.gradient.split(' ').map(c => 
              c.replace('from-', '').replace('via-', '').replace('to-', '')
            ).join(', ')})`
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          <CardContent className="relative p-8 text-white">
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-xs font-medium">{feature.highlight}</span>
              </div>
              <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>

            {/* Icon */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold group-hover:text-white/90 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-white/80 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                {feature.description}
              </p>

              {/* Stats */}
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-xs uppercase tracking-wide">성과</span>
                  <span className="font-semibold text-sm">{feature.stats}</span>
                </div>
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </CardContent>

          {/* Animated Border */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </Card>
      ))}
    </div>
  );
}