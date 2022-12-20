import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto implements Partial<CreateTaskDto> {
  @IsString()
  @IsOptional()
  title?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
