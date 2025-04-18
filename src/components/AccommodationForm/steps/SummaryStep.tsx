import React from 'react';
import { FormData } from '@/types/form';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

interface Props {
  data: FormData;
  onSubmit: () => void;
  onBack: () => void;
}

const SummaryStep: React.FC<Props> = ({ data, onSubmit, onBack }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Summary</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Accommodation</h3>
          <div className="space-y-2">
            <div>
              <div className="text-sm font-medium text-gray-500">Name</div>
              <div className="mt-1 text-sm text-gray-900">{data.accommodation.name}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Address</div>
              <div className="mt-1 text-sm text-gray-900">{data.accommodation.address}</div>
            </div>
            {data.accommodation.description && (
              <div>
                <div className="text-sm font-medium text-gray-500">Description</div>
                <div className="mt-1 text-sm text-gray-900 break-words whitespace-pre-wrap max-h-32 overflow-y-auto">
                  {data.accommodation.description}
                </div>
              </div>
            )}
            <div>
              <div className="text-sm font-medium text-gray-500">Type</div>
              <div className="mt-1 text-sm text-gray-900 capitalize">{data.accommodation.type}</div>
            </div>
            {data.accommodation.photos.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-500">Photos</div>
                <div className="mt-2 flex gap-4">
                  {data.accommodation.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Owner</h3>
          <dl className="space-y-2">
            <div>
              <div className="text-sm font-medium text-gray-500">Name</div>
              <div className="mt-1 text-sm text-gray-900">{data.owner.name}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Email</div>
              <div className="mt-1 text-sm text-gray-900">{data.owner.email}</div>
            </div>
            {data.owner.phone && (
              <div>
                <div className="text-sm font-medium text-gray-500">Phone</div>
                <div className="mt-1 text-sm text-gray-900">{data.owner.phone}</div>
              </div>
            )}
          </dl>
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
            onClick={onSubmit}
            size="lg"
            className="flex-1 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
            Submit
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep; 