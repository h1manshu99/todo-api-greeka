import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Between } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      createdAt: new Date(),
    });
    return await this.taskRepository.save(task);
  }

  async findAll(filterDto: FilterTaskDto): Promise<{ data: Task[]; total: number }> {
    const {
      status,
      priority,
      isActive,
      dueDateFrom,
      dueDateTo,
      page = 1,
      limit = 10,
      search,
    } = filterDto;

    const where: any = {};

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (isActive !== undefined) where.isActive = isActive;

    if (dueDateFrom && dueDateTo) {
      where.dueDate = Between(dueDateFrom, dueDateTo);
    }

    if (search) {
      where.name = ILike(`%${search}%`);
    }

    const [data, total] = await this.taskRepository.findAndCount({
      where,
      order: { dueDate: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  async remove(id: string): Promise<{ message: string }> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
    return { message: 'Task deleted successfully' };
  }
}
