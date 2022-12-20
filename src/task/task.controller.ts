import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnprocessableEntityException,
  Headers,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UpdateDealDto } from 'src/deal/dto/update-deal.dto';
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

  @Get(':taskId')
  findOneTask(@GetUser('id') userId: string, @Param('taskId') taskId: string) {
    return this.taskService.findOneTask(userId, taskId);
  }

  @Patch(':taskId')
  updateTask(
    @GetUser('id') userId: string,
    @Param('taskId') taskId: string,
    @Body() dto: UpdateDealDto,
  ) {
    return this.taskService.updateDeal(userId, taskId, dto);
  }
}
