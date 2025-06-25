import { Search, MapPin, Clock, Building, ArrowLeft, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useState } from 'react';

interface JobsPageProps {
  onBack: () => void;
  onSejongAlumniClick?: () => void;
}

export function JobsPage({ onBack, onSejongAlumniClick }: JobsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const generalJobs = [
    {
      id: 1,
      title: "프론트엔드 개발자",
      company: "테크스타트업",
      location: "서울 강남구",
      type: "정규직",
      salary: "4,000만원 - 6,000만원",
      tags: ["React", "TypeScript", "Next.js"],
      deadline: "D-7",
      category: "개발"
    },
    {
      id: 2,
      title: "백엔드 개발자",
      company: "핀테크 컴퍼니",
      location: "서울 서초구", 
      type: "정규직",
      salary: "5,000만원 - 7,000만원",
      tags: ["Node.js", "Python", "AWS"],
      deadline: "D-14",
      category: "개발"
    },
    {
      id: 3,
      title: "UI/UX 디자이너",
      company: "디자인 에이전시",
      location: "서울 홍대",
      type: "정규직",
      salary: "3,500만원 - 5,000만원",
      tags: ["Figma", "Sketch", "Prototyping"],
      deadline: "D-21",
      category: "디자인"
    },
    {
      id: 4,
      title: "데이터 사이언티스트",
      company: "AI 스타트업",
      location: "서울 판교",
      type: "정규직",
      salary: "6,000만원 - 8,000만원",
      tags: ["Python", "Machine Learning", "TensorFlow"],
      deadline: "D-10",
      category: "개발"
    },
    {
      id: 5,
      title: "DevOps 엔지니어",
      company: "클라우드 서비스",
      location: "서울 중구",
      type: "정규직",
      salary: "5,500만원 - 7,500만원",
      tags: ["Kubernetes", "Docker", "Jenkins"],
      deadline: "D-5",
      category: "개발"
    },
    {
      id: 6,
      title: "모바일 개발자",
      company: "모바일 앱 회사",
      location: "서울 성수동",
      type: "정규직",
      salary: "4,500만원 - 6,500만원",
      tags: ["React Native", "Flutter", "iOS"],
      deadline: "D-12",
      category: "개발"
    }
  ];

  // 553개의 세종대 맞춤 채용 데이터 생성
  const generateSejongJobs = () => {
    const companies = [
      "한국아즈빌(주)", "바이오스토브몰코리아", "(주)남일", "브랜드인텔리전스", "아티나이아이", 
      "(주)한안", "주식회사체이비", "본이아이엠", "제일약품(주)", "(주)현대엠뱅카이", 
      "삼성전자", "LG전자", "SK하이닉스", "현대자동차", "기아", "포스코", "한화시스템",
      "네이버", "카카오", "라인", "쿠팡", "배달의민족", "토스", "당근마켓", "야놀자",
      "NHN", "엔씨소프트", "넥슨", "컴투스", "스마일게이트", "펄어비스", "크래프톤",
      "신한은행", "KB국민은행", "하나은행", "우리은행", "IBK기업은행", "농협은행",
      "현대건설", "대우건설", "GS건설", "삼성물산", "포스코건설", "대림산업",
      "롯데", "신세계", "현대백화점", "이마트", "CJ제일제당", "오리온", "농심",
      "KT", "LG유플러스", "SK텔레콤", "KT&G", "한국전력공사", "한국가스공사",
      "아모레퍼시픽", "LG생활건강", "유한양행", "종근당", "대웅제약", "한미약품"
    ];

    const jobTitles = [
      "신입 개발자", "주니어 개발자", "마케팅 기획자", "영업 사원", "인사 담당자",
      "재무 담당자", "경영지원", "생산관리", "품질관리", "연구원", "기술영업",
      "고객지원", "디자이너", "기획자", "분석가", "컨설턴트", "매니저", "엔지니어",
      "운영자", "관리자", "전문가", "상담원", "코디네이터", "스페셜리스트", "어시스턴트"
    ];

    const locations = [
      "서울 강남구", "서울 서초구", "서울 중구", "서울 종로구", "서울 영등포구",
      "경기 성남시", "경기 수원시", "경기 안양시", "경기 고양시", "경기 용인시",
      "부산 해운대구", "대구 중구", "광주 서구", "대전 유성구", "울산 남구",
      "인천 연수구", "세종시", "경기 판교", "서울 가산디지털", "서울 마포구"
    ];

    const benefits = ["서류 면제", "서류 가점", "면접 가점", "최종면접 직행"];
    const salaryRanges = [
      "3,000만원 - 4,000만원", "3,500만원 - 4,500만원", "4,000만원 - 5,000만원",
      "4,500만원 - 5,500만원", "5,000만원 - 6,000만원", "5,500만원 - 6,500만원"
    ];

    const techStacks = [
      ["Java", "Spring", "MySQL"], ["Python", "Django", "PostgreSQL"], ["JavaScript", "React", "Node.js"],
      ["C#", ".NET", "SQL Server"], ["PHP", "Laravel", "MySQL"], ["Swift", "iOS", "Xcode"],
      ["Kotlin", "Android", "Firebase"], ["Vue.js", "Nuxt.js", "MongoDB"], ["Angular", "TypeScript", "AWS"],
      ["React Native", "Flutter", "Mobile"], ["데이터분석", "Excel", "SQL"], ["디지털마케팅", "SNS", "광고"],
      ["영업", "고객관리", "CRM"], ["기획", "전략", "분석"], ["인사", "채용", "교육"], ["재무", "회계", "세무"]
    ];

    const jobs = [];
    for (let i = 101; i <= 653; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)];
      const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const benefit = benefits[Math.floor(Math.random() * benefits.length)];
      const salary = salaryRanges[Math.floor(Math.random() * salaryRanges.length)];
      const tags = techStacks[Math.floor(Math.random() * techStacks.length)];
      const deadline = `D-${Math.floor(Math.random() * 30) + 1}`;

      jobs.push({
        id: i,
        title,
        company,
        location,
        type: "정규직",
        salary,
        tags,
        deadline,
        category: "세종대 맞춤 채용",
        specialBenefit: benefit,
        isSejongSpecial: true
      });
    }
    return jobs;
  };

  const sejongJobs = generateSejongJobs();

  const categories = [
    "전체", "세종대 맞춤 채용", "개발", "디자인", "마케팅", "영업", "기획", "인사", "재무", "운영"
  ];

  // 선택된 카테고리에 따라 채용공고 필터링
  const getFilteredJobs = () => {
    if (selectedCategory === '전체') {
      return [...generalJobs, ...sejongJobs];
    } else if (selectedCategory === '세종대 맞춤 채용') {
      return sejongJobs;
    } else {
      return generalJobs.filter(job => job.category === selectedCategory);
    }
  };

  const filteredJobs = getFilteredJobs();
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / itemsPerPage);
  
  // 현재 페이지에 표시할 채용공고
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>홈으로</span>
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">채용</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 검색 및 필터 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="직무, 회사명을 검색해보세요"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>전체 지역</option>
                <option>서울</option>
                <option>경기</option>
                <option>부산</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>전체 경력</option>
                <option>신입</option>
                <option>1-3년</option>
                <option>3-5년</option>
                <option>5년 이상</option>
              </select>
              <Button className="px-6 py-3">검색</Button>
            </div>
          </div>
        </div>

        {/* 카테고리 */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => {
              // "세종대 맞춤 채용" 다음에 "세종대 동문 취업" 버튼 추가
              if (category === "세종대 맞춤 채용") {
                return (
                  <div key={index} className="flex gap-2">
                    <Button
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryChange(category)}
                      className="bg-purple-600 hover:bg-purple-700 border-purple-600 text-white"
                    >
                      <GraduationCap className="w-4 h-4 mr-1" />
                      {category}
                    </Button>
                    {/* 세종대 동문 취업 버튼 */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onSejongAlumniClick}
                      className="border-purple-400 text-purple-600 hover:bg-purple-50 hover:border-purple-500"
                    >
                      <GraduationCap className="w-4 h-4 mr-1" />
                      세종대 동문 취업
                    </Button>
                  </div>
                );
              }
              
              return (
                <Button
                  key={index}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                  className={selectedCategory === category ? "" : "text-gray-600 hover:text-gray-900"}
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>

        {/* 세종대 맞춤 채용 안내 문구 */}
        {selectedCategory === '세종대 맞춤 채용' && (
          <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-800 leading-relaxed">
              여러분의 취업을 응원합니다. 세종대학교 재학생&졸업생만을 위해 마련된 특별 채용 정보로, 세종대학교 대학일자리플러스센터와 기업 인사팀이 협의해 서류패스/서류가점/면접가점 등의 우대를 받는 특별 전형입니다.
            </p>
          </div>
        )}

        {/* 채용공고 개수 표시 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            채용목록 {totalJobs.toLocaleString()}건
          </h2>
          <div className="text-sm text-gray-500">
            {currentPage} / {totalPages} 페이지
          </div>
        </div>

        {/* 채용공고 리스트 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {currentJobs.map((job) => (
            <Card key={job.id} className={`hover:shadow-md transition-shadow cursor-pointer ${
              job.isSejongSpecial ? 'border-purple-200 bg-gradient-to-br from-white to-purple-50' : ''
            }`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      {job.isSejongSpecial && (
                        <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                          <GraduationCap className="w-3 h-3 mr-1" />
                          세종대 특별전형
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Building className="w-4 h-4 mr-1" />
                      <span className="text-sm">{job.company}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{job.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      parseInt(job.deadline.replace('D-', '')) <= 7
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {job.deadline}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">연봉</p>
                  <p className="text-blue-600 font-semibold">{job.salary}</p>
                </div>

                {job.specialBenefit && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-purple-700 mb-1">특별 혜택</p>
                    <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                      {job.specialBenefit}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    북마크
                  </Button>
                  <Button 
                    size="sm"
                    className={job.isSejongSpecial ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    지원하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </Button>

            {/* 페이지 번호들 */}
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNumber)}
                    className="w-10"
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              다음
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}