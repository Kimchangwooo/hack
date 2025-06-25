import { StepType } from '../../types/resume';
import { STEPS, STEP_ORDER } from '../../constants/resume';

interface ProgressSidebarProps {
  currentStep: StepType;
}

export function ProgressSidebar({ currentStep }: ProgressSidebarProps) {
  const currentIndex = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">진행상황</h3>
      <div className="space-y-3">
        {STEPS.map((step) => {
          const stepIndex = STEP_ORDER.indexOf(step.id as StepType);
          const isCompleted = stepIndex < currentIndex;
          
          return (
            <div
              key={step.id}
              className={`flex items-center text-sm ${
                step.id === currentStep
                  ? 'text-blue-600 font-medium'
                  : isCompleted
                  ? 'text-green-600'
                  : 'text-gray-500'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-3 ${
                  step.id === currentStep
                    ? 'bg-blue-600'
                    : isCompleted
                    ? 'bg-green-600'
                    : 'bg-gray-300'
                }`}
              />
              {step.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}