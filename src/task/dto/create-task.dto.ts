import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskEntity } from '../entities/task.entity';

export class CreateTaskDto implements Partial<TaskEntity> {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
