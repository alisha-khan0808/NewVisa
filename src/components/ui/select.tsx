'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string }[];
  className?: string;
  disabled?: boolean;
}

function Select({ value, onValueChange, placeholder, options, className, disabled }: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        disabled={disabled}
        className={cn(
          'flex h-10 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-50',
          className
        )}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
    </div>
  );
}

export { Select };
