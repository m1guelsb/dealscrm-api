import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsDateString()
  @IsNotEmpty()
  @MaxLength(10)
  dueDate: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
