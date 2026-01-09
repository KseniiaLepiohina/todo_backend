import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveTasks } from './entities/ActiveTasks.entity';
import { CompletedTasks } from './entities/CompletedTasks.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PassportModule,
    AuthModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET!,
        signOptions:{expiresIn:'24h'}
      }),
    TypeOrmModule.forFeature([ActiveTasks,CompletedTasks, Auth])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
