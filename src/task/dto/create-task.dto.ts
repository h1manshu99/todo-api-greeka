import { IsBoolean, IsDateString, IsEnum, IsString } from 'class-validator';
import { TaskPriority } from '../enums/priority.enum';
import { TaskStatus } from '../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy groceries' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2025-03-20T18:30:00.000Z' })
  @IsDateString()
  dueDate: Date;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.PENDING })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({ enum: TaskPriority, example: TaskPriority.RED })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;
}
