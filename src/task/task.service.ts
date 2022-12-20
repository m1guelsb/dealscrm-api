import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './repositories/TaskRepository';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  createTask(userId: string, dealId: string, dto: CreateTaskDto) {
    return this.taskRepository.createTask(userId, dealId, dto);
  }

  findAllTasks(userId: string) {
    return this.taskRepository.findAllTasks(userId);
  }
}
