import { Deal } from '@prisma/client';

export class DealEntity implements Partial<Deal> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  price: number;
  customerId: string;

  constructor(partial: Partial<DealEntity>) {
    Object.assign(this, partial);
  }
}
