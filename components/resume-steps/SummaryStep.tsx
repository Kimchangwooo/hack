import { useState, useEffect, useCallback } from 'react';
import { FileText, Lightbulb, Target, Users, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface SummaryStepProps {
  summary: string;
  onChange: (summary: string) => void;
}

export function SummaryStep({ summary, onChange }: SummaryStepProps) {
  const [currentSummary, setCurrentSummary] = useState(summary);
  const [wordCount, setWordCount] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  // 자기소개서 템플릿
  const summaryTemplates = [
    {
      id: 'professional',
      title: '전문적 소개',
      icon: Target,
      description: '경력과 전문성을 강조',
      template: '저는 [경력년수]년의 경험을 가진 [전문분야] 전문가입니다. [주요 기술/역량]에 특화되어 있으며, [주요 성과]를 달성한 경험이 있습니다. [지원 동기/목표]를 통해 귀사에 기여하고 싶습니다.'
    },
    {
      id: 'growth',
      title: '성장 지향적',
      icon: Lightbulb,
      description: '학습 의지와 성장 가능성 어필',
      template: '지속적인 학습과 성장을 추구하는 [전공/분야] 전문가입니다. [관련 프로젝트/경험]을 통해 [습득한 역량]을 키워왔으며, 새로운 도전을 통해 더 큰 가치를 창출하고 싶습니다.'
    },
    {
      id: 'collaborative',
      title: '협업 중심',
      icon: Users,
      description: '팀워크와 소통 능력 강조',
      template: '효과적인 소통과 협업을 통해 팀의 목표 달성에 기여해온 [직무/분야] 전문가입니다. [팀 프로젝트 경험]을 바탕으로 다양한 구성원들과 함께 [성과]를 이뤄낸 경험이 있습니다.'
    }
  ];

  // 작성 가이드라인
  const guidelines = [
    '간결하고 명확하게 작성 (200-400자 권장)',
    '구체적인 경험과 성과 포함',
    '지원하는 직무와 연관성 강조',
    '긍정적이고 자신감 있는 톤 유지',
    '회사와 직무에 대한 관심 표현'
  ];

  useEffect(() => {
    const words = currentSummary.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    onChange(currentSummary);
  }, [currentSummary, onChange]);

  const handleTemplateSelect = useCallback((template: string) => {
    setSelectedTemplate(template);
    setCurrentSummary(template);
  }, []);

  const getWordCountColor = () => {
    if (wordCount < 50) return 'text-red-600';
    if (wordCount < 100) return 'text-yellow-600';
    if (wordCount > 300) return 'text-orange-600';
    return 'text-green-600';
  };

  const getCompletionStatus = () => {
    if (wordCount < 50) return { status: 'incomplete', message: '너무 짧습니다' };
    if (wordCount > 300) return { status: 'warning', message: '너무 길 수 있습니다' };
    return { status: 'complete', message: '적절한 길이입니다' };
  };

  const completionStatus = getCompletionStatus();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
          <FileText className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">자기소개 및 요약</h2>
        <p className="text-gray-600">자신을 간단히 소개하고 주요 역량을 어필해주세요.</p>
      </div>

      {/* 템플릿 선택 */}
      <Card className="border-2 border-purple-100">
        <CardHeader>
          <CardTitle className="text-purple-600 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            템플릿으로 시작하기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {summaryTemplates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.template ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                }`}
                onClick={() => handleTemplateSelect(template.template)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <template.icon className="w-4 h-4 text-purple-600" />
                    <h4 className="font-medium text-sm">{template.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500">{template.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-600 line-clamp-3">
                    {template.template.substring(0, 100)}...
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 자기소개서 작성 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="summary" className="text-lg font-medium">
            자기소개서 *
          </Label>
          <div className="flex items-center space-x-2">
            <Badge 
              variant="outline" 
              className={`${getWordCountColor()} border-current`}
            >
              {wordCount}자
            </Badge>
            <Badge 
              variant="outline"
              className={`${
                completionStatus.status === 'complete' ? 'text-green-600 border-green-200' :
                completionStatus.status === 'warning' ? 'text-orange-600 border-orange-200' :
                'text-red-600 border-red-200'
              }`}
            >
              {completionStatus.message}
            </Badge>
          </div>
        </div>
        
        <Textarea
          id="summary"
          placeholder="자신의 전문성, 경험, 목표 등을 구체적으로 작성해주세요. 지원하는 직무와 연관된 내용을 포함하면 더욱 효과적입니다."
          value={currentSummary}
          onChange={(e) => setCurrentSummary(e.target.value)}
          rows={8}
          className="resize-none"
        />
        
        <div className="text-sm text-gray-500">
          권장 길이: 200-400자 | 현재: {wordCount}자
        </div>
      </div>

      {/* 작성 가이드 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            작성 가이드
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {guidelines.map((guideline, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-blue-800">
                <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                <span>{guideline}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 미리보기 */}
      {currentSummary && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-700">미리보기</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {currentSummary}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 팁 섹션 */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-900 mb-2">💡 작성 팁</h4>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• 첫 문장에서 자신의 정체성을 명확히 제시하세요</li>
          <li>• 구체적인 수치나 성과를 포함하면 더욱 인상적입니다</li>
          <li>• 지원 회사의 가치나 비전과 연결점을 찾아 언급해보세요</li>
          <li>• 미래에 대한 포부나 목표를 간단히 언급하세요</li>
        </ul>
      </div>
    </div>
  );
}