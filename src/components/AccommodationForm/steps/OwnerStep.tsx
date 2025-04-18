import React, { useState } from 'react';
import { OwnerData } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

interface Props {
  data: OwnerData;
  onUpdate: (data: Partial<OwnerData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const OwnerStep: React.FC<Props> = ({ data, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState<Partial<Record<keyof OwnerData, string>>>({});
  const [touched, setTouched] = useState<Record<keyof OwnerData, boolean>>({
    name: false,
    email: false,
    phone: false,
  });

  const validateName = (name: string) => {
    if (!name) return 'Name is required';
    if (name.length < 4 || name.length > 64) return 'Name must be between 4 and 64 characters';
    return '';
  };

  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
    return '';
  };

  const validatePhone = (phone: string) => {
    if (!phone) return '';
    if (!/^\d{1,9}$/.test(phone)) return 'Phone must contain only numbers (max 9 digits)';
    return '';
  };

  const handleBlur = (field: keyof OwnerData, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    let error = '';
    switch (field) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const isValid = () => {
    const nameError = validateName(data.name);
    const emailError = validateEmail(data.email);
    const phoneError = validatePhone(data.phone || '');
    return !nameError && !emailError && !phoneError;
  };

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-bold text-gray-900">Owner</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name *</label>
          <Input
            type="text"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            onBlur={(e) => handleBlur('name', e.target.value)}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            onBlur={(e) => handleBlur('email', e.target.value)}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone (optional)</label>
          <Input
            type="tel"
            value={data.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            onBlur={(e) => handleBlur('phone', e.target.value)}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button 
            variant="outline"
            size="lg"
            onClick={onBack}
        >
            <ArrowLeftIcon className="w-4 h-4" />
            Go back
        </Button>
        <Button
            onClick={onNext}
            disabled={!isValid() || !touched}
            size="lg"
            className="flex-1 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
            Submit
        </Button>
      </div>
    </div>
  );
};

export default OwnerStep; 