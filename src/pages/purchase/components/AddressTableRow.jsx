import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const AddressTableRow = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TableRow>
      <TableCell>
        <Label htmlFor="address">주소</Label>
      </TableCell>
      <TableCell>
        <Input
          id="address"
          type="text"
          placeholder="주소를 입력하세요"
          {...register('address', { required: '주소를 입력하세요' })}
        />
        {errors.address?.message &&
          typeof errors.address.message === 'string' && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
      </TableCell>
    </TableRow>
  );
};
