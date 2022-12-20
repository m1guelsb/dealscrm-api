import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnprocessableEntityException,
  Headers,
  Get,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(
    @GetUser('id') userId: string,
    @Headers('dealId') dealId: string,
    @Body() dto: CreateTaskDto,
  ) {
    if (!dealId)
      throw new UnprocessableEntityException(
        '{ dealId: string } header is required',
      );
    return this.taskService.createTask(userId, dealId, dto);
  }

  @Get()
  findAllTasks(@GetUser('id') userId: string) {
    return this.taskService.findAllTasks(userId);
  }
}
