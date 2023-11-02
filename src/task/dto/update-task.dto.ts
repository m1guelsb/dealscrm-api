import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto implements Partial<CreateTaskDto> {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @IsDateString()
  @IsOptional()
  @MaxLength(10)
  dueDate?: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
