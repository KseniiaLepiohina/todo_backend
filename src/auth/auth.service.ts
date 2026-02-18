import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { DataSource, Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private dataSource: DataSource,
    private configService: ConfigService
  ) { }

  async signUpUser(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;

    try {
      // 1. Check uniqueness (Must call .getOne()!)
      const existingUser = await this.dataSource
        .getRepository(Auth)
        .createQueryBuilder('user')
        .where('user.username = :username', { username })
        .getOne();

      if (existingUser) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      // 2. Hash and Insert
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Auth)
        .values({ username, password: hashedPassword })
        .execute();

      // The 'result' contains the generated ID
      const userId = result.identifiers[0].id;

      // 3. Generate Token
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      if (!jwtSecret) {
        throw new HttpException('JWT_SECRET is not configured', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const token = jwt.sign(
        { id: userId, username },
        jwtSecret,
        { expiresIn: '7d' }
      );

      return {
        message: 'User successfully created',
        token,
        userId
      };

    } catch (error) {
      // Pass through our specific 'Conflict' error, otherwise throw generic
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed to create new user', HttpStatus.BAD_REQUEST);
    }
  }

  // auth.service.ts
  async loginUser(dto: CreateAuthDto) {
    const { username, password } = dto;

    // 1. Fetch user (including hidden password)
    const user = await this.dataSource
      .getRepository(Auth)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // 2. Password Verification
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // 3. Token Generation
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new HttpException('JWT_SECRET is not configured', HttpStatus.INTERNAL_SERVER_ERROR);
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

  async findOneUser(username: string) {
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
