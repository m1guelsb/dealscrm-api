import { Task } from '@prisma/client';

export class TaskEntity implements Partial<Task> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  dueDate: Date;
  isCompleted: boolean;
  dealId: string;

  constructor(partial: Partial<TaskEntity>) {
    Object.assign(this, partial);
  }
}
