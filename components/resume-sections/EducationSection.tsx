import { Plus, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function EducationSection() {
  return (
    <div className="p-8">
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">학력</h2>

        {/* 학력 입력 폼 */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
                <span className="font-medium text-gray-900">세종대학교</span>
              </div>
              <Button variant="ghost" size="sm">
                <X className="w-4 h-4 text-gray-400" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">전공 *</label>
                <Input placeholder="컴퓨터공학과" defaultValue="컴퓨터공학과" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">학위 *</label>
                <Select defaultValue="bachelor">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelor">학사</SelectItem>
                    <SelectItem value="master">석사</SelectItem>
                    <SelectItem value="doctor">박사</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">입학 *</label>
                <div className="flex space-x-2">
                  <Select defaultValue="2021">
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                      <SelectItem value="2019">2019</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="03">
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="03">03</SelectItem>
                      <SelectItem value="09">09</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">졸업(예정) *</label>
                <div className="flex space-x-2">
                  <Select defaultValue="2025">
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="02">
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="02">02</SelectItem>
                      <SelectItem value="08">08</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              * 학점, 졸업논문 제목을 함께 작성시 더욱 효과적
            </div>
          </div>
        </div>

        {/* 스킬 섹션 */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">스킬</h3>
          <div className="text-sm text-gray-600 mb-4">
            * 보유한 기술 스택과 숙련도를 골라주세요.
          </div>
          
          <Button variant="outline" className="w-full border-dashed border-gray-300 text-gray-500 hover:text-gray-700">
            <Plus className="w-4 h-4 mr-2" />
            기술 스택 추가
          </Button>
        </div>
      </div>
    </div>
  );
}