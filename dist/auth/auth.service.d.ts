import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private authRepository;
    private configService;
    constructor(authRepository: Repository<Auth>, configService: ConfigService);
    signUpUser(createAuthDto: CreateAuthDto): Promise<Auth>;
    loginUser(dto: CreateAuthDto): Promise<{
        token: string;
        user: Auth;
    }>;
    findAllUsers(): Promise<Auth[]>;
    findOneUser(username: string): Promise<Auth>;
}
