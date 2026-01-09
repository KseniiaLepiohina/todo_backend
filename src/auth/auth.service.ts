import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private configService:ConfigService
  ) {}

  async signUpUser(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;

    // Перевірка на унікальність
    const existingUser = await this.authRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    try {
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const newUser = this.authRepository.create({
        username,
        password: hashedPassword,
      });

      return await this.authRepository.save(newUser);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          `User registration failed: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'User registration failed due to unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // auth.service.ts
async loginUser(dto: CreateAuthDto) {
  const { username, password } = dto;

  // Знаходимо користувача по username
  const user = await this.authRepository.findOne({ where: { username } });

  if (!user) {
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  if (!user.password) {
    throw new HttpException('User has no password set', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  // Порівняння пароля
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  if (!process.env.JWT_SECRET) {
    throw new HttpException('JWT secret not set', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  // Генеруємо токен
  const jwtSecret = this.configService.get<string>('JWT_SECRET');
  if (!jwtSecret) {
    throw new HttpException('JWT secret not set', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    jwtSecret,
    { expiresIn: '7d' }
  );

  return { token, user };
}


  async findAllUsers() {
    return await this.authRepository.find();
  }

  async findOneUser(username:string) {
    try {
      const findOneUser = await this.authRepository.findOne({ where: { username } });
      if (!findOneUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return findOneUser;
    } catch {
      throw new HttpException(
        'Error fetching user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
 
}
