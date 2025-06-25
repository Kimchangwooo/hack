import { Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { PersonalInfo } from '../../types/resume';
import { CITIES, COUNTRIES } from '../../constants/resume';

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onUpdate: (field: string, value: string) => void;
}

export function PersonalInfoStep({ data, onUpdate }: PersonalInfoStepProps) {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">단계 1/5</span>
          <span>개인 정보 입력</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">개인 정보</h1>
        <p className="text-gray-600">
          이름, 이메일, 전화번호 및 기타 개인 정보를 정확히 입력해주세요.
        </p>
      </div>

      <div className="space-y-6">
        {/* 직책 */}
        <div>
          <Label htmlFor="jobTitle" className="text-gray-900 mb-2 block">
            직책 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="jobTitle"
            placeholder="소프트웨어 엔지니어"
            value={data.jobTitle}
            onChange={(e) => onUpdate('jobTitle', e.target.value)}
            className="bg-gray-50 border-gray-200"
          />
        </div>

        {/* 사진 업로드 */}
        <div>
          <Label className="text-gray-900 mb-2 block">사진</Label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
              사진 업로드
            </Button>
          </div>
        </div>

        {/* 이름 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-gray-900 mb-2 block">
              이름 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              placeholder="홍길동"
              value={data.firstName}
              onChange={(e) => onUpdate('firstName', e.target.value)}
              className="bg-gray-50 border-gray-200"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-gray-900 mb-2 block">성</Label>
            <Input
              id="lastName"
              placeholder="김"
              value={data.lastName}
              onChange={(e) => onUpdate('lastName', e.target.value)}
              className="bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* 연락처 */}
        <div>
          <Label htmlFor="email" className="text-gray-900 mb-2 block">
            이메일 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={data.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            className="bg-gray-50 border-gray-200"
          />
          <p className="text-sm text-red-500 mt-1">
            이 이메일은 개인정보 보호를 위해 다른 지원자에게 표시되지 않습니다.
          </p>
        </div>

        <div>
          <Label htmlFor="phone" className="text-gray-900 mb-2 block">전화번호</Label>
          <Input
            id="phone"
            placeholder="010-1234-5678"
            value={data.phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
            className="bg-gray-50 border-gray-200"
          />
        </div>

        {/* 주소 */}
        <div>
          <Label htmlFor="address" className="text-gray-900 mb-2 block">주소</Label>
          <Input
            id="address"
            placeholder="서울특별시 강남구"
            value={data.address}
            onChange={(e) => onUpdate('address', e.target.value)}
            className="bg-gray-50 border-gray-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" className="text-gray-900 mb-2 block">시/도</Label>
            <select
              value={data.city}
              onChange={(e) => onUpdate('city', e.target.value)}
              className="border-input flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 h-9 appearance-none bg-gray-50 border-gray-200"
            >
              <option value="">서울</option>
              {CITIES.map(city => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="country" className="text-gray-900 mb-2 block">국가</Label>
            <select
              value={data.country}
              onChange={(e) => onUpdate('country', e.target.value)}
              className="border-input flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 h-9 appearance-none bg-gray-50 border-gray-200"
            >
              <option value="">대한민국</option>
              {COUNTRIES.map(country => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="postalCode" className="text-gray-900 mb-2 block">우편번호</Label>
            <Input
              id="postalCode"
              placeholder="06000"
              value={data.postalCode}
              onChange={(e) => onUpdate('postalCode', e.target.value)}
              className="bg-gray-50 border-gray-200"
            />
          </div>
          <div>
            <Label htmlFor="nationality" className="text-gray-900 mb-2 block">국적</Label>
            <Input
              id="nationality"
              placeholder="대한민국"
              value={data.nationality}
              onChange={(e) => onUpdate('nationality', e.target.value)}
              className="bg-gray-50 border-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}