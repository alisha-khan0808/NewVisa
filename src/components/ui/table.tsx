'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const tableVariants = {
  wrapper: 'relative w-full overflow-auto',
  table: 'w-full caption-bottom text-sm',
};

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

function Table({ className, ...props }: TableProps) {
  return (
    <div className={cn(tableVariants.wrapper, className?.includes('wrapper') ? '' : '')}>
      <table className={cn(tableVariants.table, className)} {...props} />
    </div>
  );
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead className={cn('[&_tr]:border-b', className)} {...props} />;
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  );
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-b border-gray-200 transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-100',
        className
      )}
      {...props}
    />
  );
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  );
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;

export { Table };
