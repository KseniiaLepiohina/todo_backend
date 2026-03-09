import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private authRepository;
    private dataSource;
    private configService;
    constructor(authRepository: Repository<Auth>, dataSource: DataSource, configService: ConfigService);
    signUpUser(createAuthDto: CreateAuthDto): Promise<{
        message: string;
        token: string;
        userId: any;
    }>;
    loginUser(dto: CreateAuthDto): Promise<{
        token: string;
        user: Auth;
    }>;
    findAllUsers(): Promise<Auth[]>;
    findOneUser(username: string): Promise<Auth>;
}
