import { ReactNode, useState, useEffect } from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';
import { AppleButton } from './AppleButton';

export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  content?: ReactNode;
  canSkip?: boolean;
}

export interface OnboardingStepperProps {
  steps: OnboardingStep[];
  onComplete: (completedSteps: string[]) => void;
  onSkip?: () => void;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  showSkipButton?: boolean;
  className?: string;
}

export function OnboardingStepper({
  steps,
  onComplete,
  onSkip,
  currentStep: controlledStep,
  onStepChange,
  showSkipButton = true,
  className = ''
}: OnboardingStepperProps) {
  const [internalStep, setInternalStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const isControlled = controlledStep !== undefined;
  const currentStep = isControlled ? controlledStep : internalStep;

  const handleStepChange = (newStep: number) => {
    if (!isControlled) {
      setInternalStep(newStep);
    }
    if (onStepChange) {
      onStepChange(newStep);
    }
  };

  useEffect(() => {
    if (currentStep >= 0 && currentStep < steps.length) {
      setCompletedSteps(prev => {
        const newSet = new Set(prev);
        newSet.add(steps[currentStep].id);
        return newSet;
      });
    }
  }, [currentStep, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      handleStepChange(currentStep + 1);
    } else {
      const completedArray = Array.from(completedSteps);
      onComplete(completedArray);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
    const completedArray = Array.from(completedSteps);
    onComplete(completedArray);
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canShowSkip = showSkipButton && currentStepData?.canSkip !== false;

  return (
    <div 
      className={`w-full max-w-2xl mx-auto ${className}`}
      data-testid="onboarding-stepper"
    >
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center"
              data-testid={`onboarding-step-${index}`}
            >
              <div
                className={`
                  w-3 h-3 ${designTokens.borderRadius.full}
                  ${designTokens.transitions.base}
                  flex items-center justify-center
                  ${
                    index < currentStep
                      ? 'bg-[#ff0086] w-6 h-6'
                      : index === currentStep
                      ? 'bg-[#ff0086] w-4 h-4'
                      : 'bg-gray-300 w-3 h-3'
                  }
                `}
                data-testid={`onboarding-dot-${index}`}
              >
                {index < currentStep && (
                  <IoCheckmarkOutline className="w-3.5 h-3.5 text-white" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 ${index < currentStep ? 'bg-[#ff0086]' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>
        <p className={`text-center ${designTokens.typography.small} text-gray-500`}>
          Bước {currentStep + 1}/{steps.length}
        </p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6">
        <h2 className={`${designTokens.typography.h2} text-gray-900 mb-3`}>
          {currentStepData?.title}
        </h2>
        {currentStepData?.description && (
          <p className={`${designTokens.typography.body} ${designTokens.typography.description} mb-6`}>
            {currentStepData.description}
          </p>
        )}
        {currentStepData?.content && (
          <div className="mt-4">
            {currentStepData.content}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          {canShowSkip && (
            <AppleButton
              variant="secondary"
              size="md"
              onClick={handleSkip}
              data-testid="button-skip"
              className="!bg-transparent !text-gray-600 !px-0 hover:!bg-transparent hover:!text-gray-900"
            >
              Bỏ qua
            </AppleButton>
          )}
        </div>
        <div className="flex gap-3">
          {currentStep > 0 && (
            <AppleButton
              variant="secondary"
              size="md"
              onClick={handleBack}
              data-testid="button-back"
            >
              Quay lại
            </AppleButton>
          )}
          <AppleButton
            variant="primary"
            size="md"
            onClick={handleNext}
            data-testid={isLastStep ? "button-finish" : "button-next"}
          >
            {isLastStep ? "Hoàn thành" : "Tiếp tục"}
          </AppleButton>
        </div>
      </div>
    </div>
  );
}
