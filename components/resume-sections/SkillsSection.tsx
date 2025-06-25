import { Plus, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

export function SkillsSection() {
  return (
    <div className="p-8">
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">수상/자격증/기타</h2>

        <div className="space-y-8">
          {/* 수상/자격증/기타 섹션 */}
          <div>
            <div className="grid grid-cols-2 gap-8">
              {/* 수상/자격증/기타 */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">수상/자격증/기타</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-600">정보처리기사</span>
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="YYYY.MM.DD" />
                    <Textarea placeholder="취득 내용 등을 상세히 작성하세요" className="min-h-20 resize-none" />
                  </div>
                </div>
              </div>

              {/* 어학 */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">어학</h3>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <div>영어</div>
                    <div className="text-xs text-gray-500 mt-1">* 어학시험 응시</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input placeholder="기초" className="flex-1" />
                      <Input placeholder="중급/고급" className="flex-1" />
                    </div>
                    <Input placeholder="YYYY.MM.DD" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 링크 섹션 */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">링크</h3>
            <div className="text-sm text-gray-600 mb-4">
              * 블로그나 참고 내용이 될 만한 링크를 첨부하세요.
            </div>
            
            <div className="space-y-3">
              <Input placeholder="블로그" />
              <Input placeholder="https://" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}