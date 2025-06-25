import { Check, Edit } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface PersonalInfoSectionProps {
  initialData?: any;
}

export function PersonalInfoSection({ initialData }: PersonalInfoSectionProps) {
  return (
    <div className="p-8">
      <div className="max-w-2xl">
        {/* 이름 섹션 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {initialData ? `${initialData.firstName} ${initialData.lastName}` : '한예호'}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">
                📞 {initialData?.phone || '+82 10 1234 5567'}
              </span>
              <span className="text-gray-600 text-sm">
                ✉️ {initialData?.email || 'yeslove123@gmail.com'}
              </span>
            </div>
            {initialData?.address && (
              <div className="text-gray-600 text-sm">
                📍 {initialData.address}
              </div>
            )}
          </div>
        </div>

        {/* 간단 소개 섹션 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">간단 소개</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-blue-600 text-sm">
                <Check className="w-4 h-4 mr-1" />
                작성
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                양식 불러오기
              </Button>
            </div>
          </div>
          
          <Textarea
            placeholder="안녕하세요. 신입 프론트엔드 개발자입니다."
            className="min-h-20 resize-none border-gray-200"
            defaultValue="안녕하세요. 신입 프론트엔드 개발자입니다."
          />
        </div>

        {/* 경력 섹션 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">경력</h3>
            <span className="text-gray-400 text-sm">선택</span>
          </div>
          
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
            <div className="space-y-2">
              <p className="text-gray-500 text-sm">지금까지의 경력을 입력하세요.</p>
              <p className="text-gray-400 text-xs">YYYY.MM.DD ~ YYYY.MM.DD 회사명 부서/직책</p>
              <p className="text-gray-400 text-xs">신입이라면 '아직' 경력이 없는 상태로 작성하면 된다.</p>
              <p className="text-gray-400 text-xs">이력은 역순으로 들어간다면 된다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}