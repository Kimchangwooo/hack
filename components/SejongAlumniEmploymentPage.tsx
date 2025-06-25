import { useState } from 'react';
import { ChevronLeft, Search, TrendingUp, Users, MapPin, CircleDollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { SEJONG_ALUMNI_DATA } from '../types/sejong';

interface SejongAlumniEmploymentPageProps {
  onBack: () => void;
}

export function SejongAlumniEmploymentPage({ onBack }: SejongAlumniEmploymentPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'employment' | 'salary' | 'name'>('employment');

  // 검색 필터링
  const filteredData = SEJONG_ALUMNI_DATA.filter(company =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 정렬
  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'employment':
        return b.graduateEmployment - a.graduateEmployment;
      case 'salary':
        return (b.startingSalary || 0) - (a.startingSalary || 0);
      case 'name':
        return a.companyName.localeCompare(b.companyName);
      default:
        return 0;
    }
  });

  // 통계 계산
  const totalCompanies = SEJONG_ALUMNI_DATA.length;
  const totalEmployed = SEJONG_ALUMNI_DATA.reduce((sum, company) => sum + company.graduateEmployment, 0);
  const averageSalary = Math.round(
    SEJONG_ALUMNI_DATA.filter(company => company.startingSalary)
      .reduce((sum, company) => sum + (company.startingSalary || 0), 0) /
    SEJONG_ALUMNI_DATA.filter(company => company.startingSalary).length
  );
  const top10Companies = SEJONG_ALUMNI_DATA.slice(0, 10);

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'S': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'A': return 'bg-green-100 text-green-800 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
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
                뒤로
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">세종대 동문 취업 현황</h1>
                <p className="text-sm text-gray-500">세종대학교 졸업생들의 기업별 취업 현황을 확인하세요</p>
              </div>
            </div>
            <div className="bg-purple text-white px-3 py-1 rounded-full text-sm">
              📊 실시간 업데이트
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">전체 취업자</p>
                  <p className="text-2xl font-bold">{totalEmployed}명</p>
                </div>
                <Users className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">진출 기업</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCompanies}개</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">평균 초봉</p>
                  <p className="text-2xl font-bold text-gray-900">₩{averageSalary}만원</p>
                </div>
                <div className="w-8 h-8 flex items-center justify-center text-purple text-xl font-bold">
                  ₩
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">주요 지역</p>
                  <p className="text-2xl font-bold text-gray-900">서울/경기</p>
                </div>
                <MapPin className="w-8 h-8 text-purple" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top 10 기업 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-purple">🏆 취업자 수 Top 10 기업</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {top10Companies.map((company, index) => (
                <div 
                  key={company.companyName}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-purple">#{index + 1}</span>
                    <Badge className={getRankColor(company.ojakgyoRank)}>
                      {company.ojakgyoRank}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {company.companyName}
                  </h3>
                  <p className="text-purple text-xl font-bold">
                    {company.graduateEmployment}명
                  </p>
                  <p className="text-gray-600 text-xs">
                    {company.location}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 검색 및 정렬 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="기업명 또는 지역으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-purple-200 focus:border-purple-500"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'employment' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('employment')}
                  className={sortBy === 'employment' ? 'bg-purple hover:bg-purple-dark' : 'border-purple-200 text-purple hover:bg-purple-50'}
                >
                  취업자 순
                </Button>
                <Button
                  variant={sortBy === 'salary' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('salary')}
                  className={sortBy === 'salary' ? 'bg-purple hover:bg-purple-dark' : 'border-purple-200 text-purple hover:bg-purple-50'}
                >
                  초봉 순
                </Button>
                <Button
                  variant={sortBy === 'name' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('name')}
                  className={sortBy === 'name' ? 'bg-purple hover:bg-purple-dark' : 'border-purple-200 text-purple hover:bg-purple-50'}
                >
                  가나다 순
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 데이터 테이블 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple">전체 기업 취업 현황</CardTitle>
            <p className="text-sm text-gray-600">
              총 {sortedData.length}개 기업 • {SEJONG_ALUMNI_DATA.reduce((sum, company) => sum + company.graduateEmployment, 0)}명 취업
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-purple-50">
                    <TableHead className="text-purple font-semibold">기업명</TableHead>
                    <TableHead className="text-purple font-semibold">기업규모</TableHead>
                    <TableHead className="text-purple font-semibold">연차</TableHead>
                    <TableHead className="text-purple font-semibold">지역</TableHead>
                    <TableHead className="text-purple font-semibold">초봉(만원)</TableHead>
                    <TableHead className="text-purple font-semibold">랭킹</TableHead>
                    <TableHead className="text-purple font-semibold">취업자 수</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.map((company, index) => (
                    <TableRow 
                      key={company.companyName}
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <TableCell className="font-medium text-gray-900">
                        {company.companyName}
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {company.companySize}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {company.yearsEstablished ? `${company.yearsEstablished}년` : '-'}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {company.location}
                      </TableCell>
                      <TableCell className="text-gray-900 font-medium">
                        {company.startingSalary ? `₩${company.startingSalary.toLocaleString()}` : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getRankColor(company.ojakgyoRank)}>
                          {company.ojakgyoRank}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="bg-purple-100 text-purple px-2 py-1 rounded-full text-sm font-medium">
                          {company.graduateEmployment}명
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 푸터 정보 */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>💡 데이터는 세종대학교 취업통계를 기반으로 합니다.</p>
          <p>마지막 업데이트: 2024년 12월</p>
        </div>
      </div>
    </div>
  );
}