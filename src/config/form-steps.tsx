import { FormStep, FormData, AccommodationData, OwnerData } from '@/types/form';
import AccommodationStep from '@/components/AccommodationForm/steps/AccommodationStep';
import OwnerStep from '@/components/AccommodationForm/steps/OwnerStep';
import SummaryStep from '@/components/AccommodationForm/steps/SummaryStep';
import ResultStep from '@/components/AccommodationForm/steps/ResultStep';

export type StepDataType<T extends FormStep> = T extends 'accommodation' 
  ? AccommodationData 
  : T extends 'owner' 
    ? OwnerData 
    : T extends 'summary'
      ? FormData
      : T extends 'result'
        ? { isSuccess: boolean; error?: string }
        : never;

interface BaseStepProps<T extends FormStep> {
    data: StepDataType<T>;
    onUpdate: (data: Partial<StepDataType<T>>) => void;
    onNext: () => void;
    onBack: () => void;
    onSubmit?: () => void;
    onReset?: () => void;
}

export interface StepConfig<T extends FormStep = FormStep> {
    key: T;
    Component: React.ComponentType<BaseStepProps<T>>;
    title: string;
}

export const FORM_STEPS = [
    {
        key: 'accommodation' as const,
        Component: AccommodationStep as React.ComponentType<BaseStepProps<'accommodation'>>,
        title: 'Accommodation Details',
    },
    {
        key: 'owner' as const,
        Component: OwnerStep as React.ComponentType<BaseStepProps<'owner'>>,
        title: 'Owner Details',
    },
    {
        key: 'summary' as const,
        Component: SummaryStep as React.ComponentType<BaseStepProps<'summary'>>,
        title: 'Summary',
    },
    {
        key: 'result' as const,
        Component: ResultStep as React.ComponentType<BaseStepProps<'result'>>,
        title: 'Result',
    },
] satisfies StepConfig[]; 