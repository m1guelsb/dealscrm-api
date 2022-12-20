import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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

  findOneTask(userId: string, taskId: string) {
    return this.taskRepository.findOneTask(userId, taskId);
  }

  updateTask(userId: string, taskId: string, dto: UpdateTaskDto) {
    return this.taskRepository.updateTask(userId, taskId, dto);
  }

  deleteTask(userId: string, taskId: string) {
    return this.taskRepository.deleteTask(userId, taskId);
  }
}
