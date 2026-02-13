import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(createAuthDto: CreateAuthDto): Promise<import("./entities/auth.entity").Auth>;
    loginUser(createAuthDto: CreateAuthDto): Promise<{
        id: number;
        username: string;
        token: string;
    }>;
    findUserByUsername(username: string): Promise<import("./entities/auth.entity").Auth>;
    findAll(): Promise<import("./entities/auth.entity").Auth[]>;
    findOne(id: string): Promise<import("./entities/auth.entity").Auth>;
}
