import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface Plan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  popular?: boolean;
  children?: React.ReactNode;
}

interface PricingProps {
  plans: Plan[];
  onPlanSelect?: (plan: string) => void;
  onCycleChange?: (cycle: 'Monthly' | 'Yearly') => void;
  width?: 'sm' | 'md' | 'lg' | 'xl';
  outerRadius?: 'normal' | 'rounded' | 'moreRounded';
  padding?: 'small' | 'medium' | 'large';
}

const widthClasses = {
  sm: 'w-full sm:w-[300px]',
  md: 'w-full sm:w-[300px] md:w-[500px]',
  lg: 'w-full sm:w-[300px] md:w-[500px] lg:w-[768px]',
  xl: 'w-full sm:w-[300px] md:w-[500px] lg:w-[768px] xl:w-[1024px]',
};

const paddingClasses = {
  small: 'p-2',
  medium: 'p-3',
  large: 'p-4',
};

export default function Pricing({
  plans,
  width = 'lg',

  padding = 'medium',
}: PricingProps) {
  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const router = useRouter();

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
  };

  return (
    <div className={'flex flex-col gap-4 mx-auto'}>
      <div className={'flex flex-col gap-2'}>
        <h1 className={'text-xl font-semibold'}>Pricing plans</h1>
        <p className={'text-gray-600'}>
          Choose one of our extremely cheap packages
        </p>
      </div>
      <div
        className={cn(
          'bg-white shadow-lg rounded-md',
          widthClasses[width],

          paddingClasses[padding],
        )}
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            className={cn(
              'relative mb-3 cursor-pointer border-2 border-zinc-200 p-4',
              'rounded-md',
              selectedPlan === plan.name ? 'bg-zinc-100' : 'bg-white',
            )}
            onClick={() => handlePlanSelect(plan.name)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            layout
          >
            <AnimatePresence>
              {selectedPlan === plan.name && (
                <motion.div
                  className={cn(
                    'absolute inset-0 border-4 border-zinc-900',
                    'rounded-md',
                  )}
                  layoutId="selectedPlanBorder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="font-bold">{plan.name}</span>
                {plan.popular && (
                  <span className="ml-2 rounded bg-yellow-300 px-2 py-1 text-xs">
                    Popular
                  </span>
                )}
              </div>
              <motion.div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full border-2',
                  selectedPlan === plan.name
                    ? 'border-zinc-900 bg-zinc-900'
                    : 'border-zinc-300',
                )}
                animate={{ scale: selectedPlan === plan.name ? 1 : 0.8 }}
              >
                {selectedPlan === plan.name && (
                  <motion.div
                    className="h-3 w-3 rounded-full bg-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
              </motion.div>
            </div>
            {plan.children}

            <div className="relative z-10 mt-2">{plan.yearlyPrice}</div>
          </motion.div>
        ))}

        <motion.button
          className={cn('w-full bg-black py-3 font-bold text-white rounded-md')}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/checkout')}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
}

export const OfferingWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <ul className={cn('mt-4 flex flex-col gap-3 text-sm', className)}>
    {children}
  </ul>
);

export const Offering: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <li className={cn('flex gap-2 items-center font-medium', className)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={'w-6 h-6 fill-green-600'}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
    <div>{children}</div>
  </li>
);
