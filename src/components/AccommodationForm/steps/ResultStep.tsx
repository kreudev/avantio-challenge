import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, CheckCircle2Icon, XCircleIcon, ArrowRightIcon } from 'lucide-react';

interface Props {
    data: {
        isSuccess: boolean;
        error?: string;
    };
    onReset: () => void;
    onBack: () => void;
}

const ResultStep: React.FC<Props> = ({ data: { isSuccess, error }, onReset, onBack }) => {
    return (
        <div className="space-y-6">
            <div className="text-center space-y-4">
                {isSuccess ? (
                    <>
                        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle2Icon className="h-12 w-12 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Submission Successful!</h2>
                        <p className="text-gray-600">Your accommodation has been successfully registered.</p>
                    </>
                ) : (
                    <>
                        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
                            <XCircleIcon className="h-12 w-12 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Submission Failed</h2>
                        <p className="text-red-600">{error || 'An unexpected error occurred.'}</p>
                    </>
                )}
            </div>

            <div className="flex items-center gap-4">
                {!isSuccess && (
                    <Button 
                        variant="outline"
                        size="lg"
                        onClick={onBack}
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Go back
                    </Button>
                )}
                <Button
                    onClick={onReset}
                    size="lg"
                    className="flex-1 text-sm font-medium"
                >
                    {isSuccess ? (
                        <>
                            Register Another
                            <ArrowRightIcon className="w-4 h-4" />
                        </>
                    ) : (
                        'Try Again'
                    )}
                </Button>
            </div>
        </div>
    );
};

export default ResultStep; 