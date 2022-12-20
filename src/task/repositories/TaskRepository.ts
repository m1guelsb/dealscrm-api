import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { iTaskRepository } from './i-task.repository';

@Injectable()
export class TaskRepository implements iTaskRepository {
  constructor(private prisma: PrismaService) {}

  async createTask(
    userId: string,
    dealId: string,
    dto: CreateTaskDto,
  ): Promise<TaskEntity> {
    const deal = await this.prisma.deal.findUnique({
      where: {
        id: dealId,
      },
    });

    if (!deal)
      throw new NotFoundException(
        'customer with the provided id does not exists',
      );

    if (deal.userId !== userId)
      throw new ForbiddenException('access to resource denied');

    const newTask = await this.prisma.task.create({
      data: {
        userId,
        dealId,
        ...dto,
      },
    });

    return new TaskEntity(newTask);
  }

  async findAllTasks(userId: string): Promise<TaskEntity[]> {
    const tasksList = await this.prisma.task.findMany({
      where: {
        userId,
      },
    });

    if (!!tasksList.length && tasksList[0].userId !== userId)
      throw new ForbiddenException('access to resource denied');

    return tasksList;
  }

  async findOneTask(userId: string, taskId: string): Promise<TaskEntity> {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task)
      throw new NotFoundException('task with provided id does not exists');

    if (task && task.userId !== userId)
      throw new ForbiddenException('access to resource denied');

    return task;
  }

  async updateTask(userId: string, taskId: string, dto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (task.userId !== userId)
      throw new ForbiddenException('access to resource denied');

    const editedTask = await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...dto,
      },
    });

    return editedTask;
  }
}
