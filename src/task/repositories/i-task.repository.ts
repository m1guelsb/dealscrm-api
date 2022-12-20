import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

export interface iTaskRepository {
  createTask: (
    userId: string,
    dealId: string,
    dto: CreateTaskDto,
  ) => Promise<TaskEntity>;

  findAllTasks: (userId: string) => Promise<TaskEntity[]>;

  findOneTask: (userId: string, taskId: string) => Promise<TaskEntity>;

  updateTask: (
    userId: string,
    taskId: string,
    dto: UpdateTaskDto,
  ) => Promise<TaskEntity>;

  deleteTask: (userId: string, taskId: string) => void;
}
