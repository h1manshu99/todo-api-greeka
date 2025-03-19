import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseUUIDPipe,
  } from '@nestjs/common';
  import { TaskService } from './task.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto';
  import { FilterTaskDto } from './dto/filter-task.dto';
  import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Tasks')
  @Controller('tasks')
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
      return this.taskService.create(createTaskDto);
    }
  
    @Get()
    findAll(@Query() filterDto: FilterTaskDto) {
      return this.taskService.findAll(filterDto);
    }
  
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.taskService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateTaskDto: UpdateTaskDto,
    ) {
      return this.taskService.update(id, updateTaskDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.taskService.remove(id);
    }
  }
  