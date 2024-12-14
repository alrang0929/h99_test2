import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TableCell, TableRow } from '@/components/ui/table';
import { PHONE_PATTERN } from '@/constants';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const PhoneTableRow = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TableRow>
      <TableCell>
        <Label htmlFor="phone">전화번호</Label>
      </TableCell>
      <TableCell>
        <Input
          id="phone"
          type="text"
          placeholder="전화번호를 입력하세요"
          {...register('phone', {
            required: '전화번호를 입력하세요',
            pattern: {
              value: PHONE_PATTERN,
              message: '유효한 전화번호를 입력하세요.',
            },
          })}
        />
        {errors.phone?.message && typeof errors.phone.message === 'string' && (
          <p className="text-sm text-red-500 mt-[10px]">
            {errors.phone.message}
          </p>
        )}
      </TableCell>
    </TableRow>
  );
};
