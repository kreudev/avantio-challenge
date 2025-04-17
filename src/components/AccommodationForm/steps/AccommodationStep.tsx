import React, { useState, ChangeEvent } from 'react';
import { AccommodationData, ValidationErrors, AccommodationType } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface AccommodationStepProps {
  data: AccommodationData;
  onUpdate: (data: Partial<AccommodationData>) => void;
  onNext: () => void;
}

const AccommodationStep: React.FC<AccommodationStepProps> = ({
  data,
  onUpdate,
  onNext,
}) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<keyof AccommodationData, boolean>>({
    name: false,
    address: false,
    description: false,
    type: false,
    photos: false,
  });

  const validateField = (field: keyof AccommodationData, value: string): string => {
    switch (field) {
      case 'name':
        if (!value) return 'Name is required';
        if (value.length < 4 || value.length > 128) return 'Name must be between 4 and 128 characters';
        if (/\d/.test(value)) return 'Name cannot contain numbers';
        break;
      case 'address':
        if (!value) return 'Address is required';
        if (value.length < 4 || value.length > 128) return 'Address must be between 4 and 128 characters';
        break;
      case 'description':
        if (value && (value.length < 128 || value.length > 2048)) {
          return 'Description must be between 128 and 2048 characters';
        }
        break;
      case 'type':
        if (!value) return 'Type is required';
        break;
    }
    return '';
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleBlur = (field: keyof AccommodationData) => {
    setTouched((prev: Record<keyof AccommodationData, boolean>) => ({ ...prev, [field]: true }));
    const value = data[field]?.toString() || '';
    const error = validateField(field, value);
    setErrors((prev: ValidationErrors) => ({ ...prev, [field]: error }));
  };

  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const totalPhotos = data.photos.length + files.length;
    if (totalPhotos > 2) {
      setErrors((prev: ValidationErrors) => ({ ...prev, photos: 'Maximum 2 photos allowed' }));
      return;
    }

    const newPhotos: string[] = [];
    let allValid = true;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const img = new Image();
      const imageUrl = URL.createObjectURL(file);
      
      await new Promise<void>((resolve) => {
        img.onload = () => {
          URL.revokeObjectURL(imageUrl);
          if (img.width !== 500 || img.height !== 500) {
            allValid = false;
            setErrors((prev: ValidationErrors) => ({ 
              ...prev, 
              photos: 'All images must be exactly 500x500 pixels' 
            }));
          }
          resolve();
        };
        img.src = imageUrl;
      });
    }

    if (allValid) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        await new Promise<void>((resolve) => {
          reader.onloadend = () => {
            newPhotos.push(reader.result as string);
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }

      onUpdate({ photos: [...data.photos, ...newPhotos] });
      setErrors((prev: ValidationErrors) => ({ ...prev, photos: '' }));
    }
  };

  const removePhoto = (index: number) => {
    onUpdate({
      photos: data.photos.filter((_, i) => i !== index)
    });
  };

  const isValid = () => {
    const requiredFields: (keyof AccommodationData)[] = ['name', 'address', 'type'];
    const hasErrors = Object.values(errors).some(error => error !== '');
    const hasRequiredFields = requiredFields.every(field => data[field]);
    return !hasErrors && hasRequiredFields;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Accommodation Details</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleInputChange}
            onBlur={() => handleBlur('name')}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address *
          </label>
          <Input
            type="text"
            id="address"
            name="address"
            value={data.address}
            onChange={handleInputChange}
            onBlur={() => handleBlur('address')}
            aria-invalid={!!errors.address}
          />
          {errors.address && <p className="mt-1 text-sm text-destructive">{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleInputChange}
            onBlur={() => handleBlur('description')}
            rows={4}
            aria-invalid={!!errors.description}
          />
          {errors.description && <p className="mt-1 text-sm text-destructive">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type *
          </label>
          <Select
            value={data.type}
            onValueChange={(value) => {
              onUpdate({ type: value as AccommodationType });
              handleBlur('type');
            }}
          >
            <SelectTrigger id="type" className="w-full" aria-invalid={!!errors.type}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="house">House</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="mt-1 text-sm text-destructive">{errors.type}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Photos</label>
          <div className="mt-2 flex gap-4">
            {data.photos.map((photo, index) => (
              <div key={index} className="relative w-32 h-32 group">
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removePhoto(index)}
                    >
                        <span>×</span>
                    </Button>
                </div>
              </div>
            ))}
            {data.photos.length < 2 && (
              <label className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  multiple
                  className="hidden"
                />
                <span className="text-sm text-gray-600">Add Photos</span>
              </label>
            )}
          </div>
          {errors.photos && <p className="mt-1 text-sm text-destructive">{errors.photos}</p>}
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!isValid() || !touched}
        size="lg"
        className="w-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 "
      >
        Next
      </Button>
    </div>
  );
};

export default AccommodationStep; 