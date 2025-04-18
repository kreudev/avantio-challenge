import React, { useState } from 'react';
import { FormData, FormStep } from '@/types/form';
import { TransitionPanel } from '@/components/ui/transition-panel';
import { FORM_STEPS } from '@/config/form-steps';

const AccommodationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('accommodation');
  const [formData, setFormData] = useState<FormData>({
    accommodation: {
      name: '',
      address: '',
      description: '',
      type: 'apartment',
      photos: [],
    },
    owner: {
      name: '',
      email: '',
      phone: '',
    },
  });
  const [submissionState, setSubmissionState] = useState<{
    isSuccess: boolean;
    error?: string;
  } | null>(null);

  const handleNext = () => {
    const currentIndex = FORM_STEPS.findIndex(step => step.key === currentStep);
    if (currentIndex < FORM_STEPS.length - 1) {
      setCurrentStep(FORM_STEPS[currentIndex + 1].key);
    }
  };

  const handleBack = () => {
    const currentIndex = FORM_STEPS.findIndex(step => step.key === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(FORM_STEPS[currentIndex - 1].key);
    }
  };

  const handleSubmit = async () => {
    try {
      const isSuccess = Math.random() > 0.5;
      
      const event = new CustomEvent('formSubmit', {
        detail: {
          success: isSuccess,
          data: formData,
        },
      });
      window.dispatchEvent(event);

      if (isSuccess) {
        setSubmissionState({ isSuccess: true });
      } else {
        throw new Error('Random submission failure');
      }
      
    } catch (error) {
      setSubmissionState({ 
        isSuccess: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      });
    } finally {
      setCurrentStep('result');
    }
  };

  const handleReset = () => {
    setFormData({
      accommodation: {
        name: '',
        address: '',
        description: '',
        type: 'apartment',
        photos: [],
      },
      owner: {
        name: '',
        email: '',
        phone: '',
      },
    });
    setSubmissionState(null);
    setCurrentStep('accommodation');
  };

  const updateFormData = (step: FormStep, data: Partial<FormData[keyof FormData]>) => {
    if (step === 'result') return;
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...data,
      },
    }));
  };

  const currentStepIndex = FORM_STEPS.findIndex(step => step.key === currentStep);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white md:border md:rounded-3xl w-full flex flex-col z-10">
      <TransitionPanel
        activeIndex={currentStepIndex}
        transition={{ duration: 0.1, ease: 'easeInOut' }}
        variants={{
          enter: { opacity: 0, x: 50, filter: 'blur(4px)' },
          center: { opacity: 1, x: 0, filter: 'blur(0px)' },
          exit: { opacity: 0, x: -50, filter: 'blur(4px)' },
        }}
      >
        {FORM_STEPS.map(step => {
          if (currentStep !== step.key) return null;
          
          const stepData = step.key === 'summary' 
            ? formData 
            : step.key === 'result'
              ? submissionState
              : formData[step.key];
          
          return (
            <step.Component
              key={step.key}
              data={stepData as any}
              onUpdate={(data) => updateFormData(step.key, data)}
              onNext={handleNext}
              onBack={handleBack}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />
          );
        })}
      </TransitionPanel>
    </div>
  );
};

export default AccommodationForm; 