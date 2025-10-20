import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
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

  async loginUser(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;

    // знайти користувача лише по username
    const user = await this.authRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // порівняння пароля з bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findAllUsers() {
    return await this.authRepository.find();
  }

  async findOneUser(id: number) {
    try {
      const findOneUser = await this.authRepository.findOne({ where: { id } });
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
