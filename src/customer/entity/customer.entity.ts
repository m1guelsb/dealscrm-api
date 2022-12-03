import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  phone: string;
  userId: string;

  constructor(partial: Partial<CustomerEntity>) {
    Object.assign(this, partial);
  }
}
