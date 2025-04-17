import React, { useState } from 'react';
import { FormData, FormStep } from '@/types/form';
import AccommodationStep from '@/components/AccommodationForm/steps/AccommodationStep'

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

  const handleNext = () => {
    if (currentStep === 'accommodation') {
      setCurrentStep('owner');
    } else if (currentStep === 'owner') {
      setCurrentStep('summary');
    }
  };

  const updateFormData = (step: FormStep, data: Partial<FormData[keyof FormData]>) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...data,
      },
    }));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white border rounded-3xl w-full">
      {currentStep === 'accommodation' && (
        <AccommodationStep
          data={formData.accommodation}
          onUpdate={(data) => updateFormData('accommodation', data)}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default AccommodationForm; 