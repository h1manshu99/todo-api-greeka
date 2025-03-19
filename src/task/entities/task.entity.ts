import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../enums/status.enum";
import { TaskPriority } from "../enums/priority.enum";
  
  @Entity()
  export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column({ type: 'timestamp' })
    dueDate: Date;
  
    @Column({ type: 'enum', enum: TaskStatus })
    status: TaskStatus;
  
    @Column({ type: 'enum', enum: TaskPriority })
    priority: TaskPriority;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @Column({ default: true })
    isActive: boolean;
  }
  