import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsService } from './project.service';
import { ProjectsController } from './project.controller';
import { ProjectSchema, PROJECT_NAME } from '../schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PROJECT_NAME, schema: ProjectSchema }]),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectModule {}
