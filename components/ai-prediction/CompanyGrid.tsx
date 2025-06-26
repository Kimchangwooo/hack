import { motion } from "framer-motion";
import { ExternalLink, MapPin, DollarSign, Users, TrendingUp } from "lucide-react";

interface Company {
  id: number;
  name: string;
  position: string;
  successRate: number;
  expectedSalary: string;
  location: string;
  benefits: string[];
  description: string;
  image: string;
  link: string;
  isTopRated?: boolean;
}

const companies: Company[] = [
  {
    id: 1,
    name: "삼성전자",
    position: "프론트엔드 개발자",
    successRate: 49.82,
    expectedSalary: "5,500만원",
    location: "수원, 서울",
    benefits: ["세종대 가산점 +10점", "신입 교육 프로그램", "글로벌 프로젝트"],
    description: "세종대학교 우대기업 1위로 최고의 기회를 제공합니다. 최신 기술 스택과 글로벌 프로젝트 경험을 쌓을 수 있습니다.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
    link: "https://www.samsung.com/sec/careers/",
    isTopRated: true
  },
  {
    id: 2,
    name: "LG전자",
    position: "소프트웨어 개발자",
    successRate: 34.69,
    expectedSalary: "5,200만원",
    location: "서울, 평택",
    benefits: ["세종대 서류 우대", "연구개발 투자", "글로벌 프로젝트"],
    description: "AI/IoT 분야의 선도기업으로서 혁신적인 기술 경험을 제공합니다.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    link: "https://www.lg.com/kr/careers"
  },
  {
    id: 3,
    name: "네이버",
    position: "웹 개발자",
    successRate: 10.06,
    expectedSalary: "5,800만원",
    location: "분당, 춘천",
    benefits: ["자율 출퇴근제", "최신 기술 도입", "개발자 친화적"],
    description: "국내 최고의 IT 기업으로 최신 기술과 글로벌 서비스 개발 경험을 제공합니다.",
    image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=600&h=400&fit=crop",
    link: "https://recruit.navercorp.com/"
  }
];

function openInNewTab(link: string) {
  window.open(link, "_blank", "noopener,noreferrer");
}

export function CompanyGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">당신에게 추천하는 회사</h2>
        <p className="text-gray-600 text-lg">세종대학교 출신에게 최적화된 맞춤 기업 추천</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
              company.isTopRated ? 'ring-4 ring-red-500 ring-opacity-50' : ''
            }`}
          >
            {/* 배경 이미지 */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={company.image}
                alt={company.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
              
              {/* 최고 합격률 배지 */}
              {company.isTopRated && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                  <span>👑</span>
                  <span>TOP</span>
                </div>
              )}
            </div>

            {/* 콘텐츠 */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <div className="space-y-3">
                {/* 회사명 */}
                <h3 className={`text-2xl font-bold ${
                  company.isTopRated ? 'text-red-400' : 'text-white'
                }`}>
                  {company.name}
                  {company.isTopRated && <span className="ml-2">🏆</span>}
                </h3>

                {/* 직무 및 합격률 */}
                <div className="space-y-1">
                  <p className="text-lg font-medium">{company.position}</p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className={`font-bold ${
                      company.isTopRated ? 'text-red-400' : 'text-green-400'
                    }`}>
                      합격률 {company.successRate}%
                    </span>
                  </div>
                </div>

                {/* 상세 정보 */}
                <div className="space-y-2 text-sm opacity-95">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 flex-shrink-0" />
                    <span>예상 연봉: {company.expectedSalary}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>{company.benefits.slice(0, 2).join(", ")}</span>
                  </div>
                </div>

                {/* 설명 */}
                <p className="text-sm opacity-90 line-clamp-2">
                  {company.description}
                </p>

                {/* 채용공고 버튼 */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openInNewTab(company.link)}
                  className={`w-full mt-4 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    company.isTopRated
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30'
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>채용공고 확인하기</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 추가 정보 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12"
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4 text-center">✨ 세종대학교 특별 혜택</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2 text-center">
              <div className="text-2xl">📈</div>
              <p className="font-medium">평균 합격률</p>
              <p className="text-lg font-bold text-blue-600">86.0%</p>
            </div>
            <div className="space-y-2 text-center">
              <div className="text-2xl">💰</div>
              <p className="font-medium">평균 예상 연봉</p>
              <p className="text-lg font-bold text-green-600">5,500만원</p>
            </div>
            <div className="space-y-2 text-center">
              <div className="text-2xl">🎯</div>
              <p className="font-medium">추천 정확도</p>
              <p className="text-lg font-bold text-purple-600">96.8%</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}