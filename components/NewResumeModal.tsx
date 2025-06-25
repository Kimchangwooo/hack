import { X, Download, Sparkles, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface NewResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateNew: () => void;
  onCreateWithAI: () => void;
  onCreateFromExample: () => void;
}

export function NewResumeModal({
  isOpen,
  onClose,
  onCreateNew,
  onCreateWithAI,
  onCreateFromExample
}: NewResumeModalProps) {
  const options = [
    {
      icon: <Download className="w-5 h-5" />,
      title: "새 이력서 작성",
      onClick: onCreateNew
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "AI 도움으로 작성",
      badge: "AI",
      onClick: onCreateWithAI
    },
    {
      icon: <Copy className="w-5 h-5" />,
      title: "예시에서 작성",
      onClick: onCreateFromExample
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-8 bg-white rounded-xl border-0 shadow-xl">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-semibold text-gray-900 mb-2">시작하기</DialogTitle>
          <DialogDescription className="text-gray-600">
            어떤 방법으로 이력서를 작성하시겠어요?
          </DialogDescription>
        </DialogHeader>

        {/* 옵션 리스트 */}
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={option.onClick}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="text-gray-600 group-hover:text-gray-900">
                  {option.icon}
                </div>
                <span className="text-gray-900 font-medium">{option.title}</span>
                {option.badge && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {option.badge}
                  </span>
                )}
              </div>
              <div className="text-gray-400 group-hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}