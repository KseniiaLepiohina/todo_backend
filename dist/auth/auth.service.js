"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeorm_1 = require("@nestjs/typeorm");
const auth_entity_1 = require("./entities/auth.entity");
const typeorm_2 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    authRepository;
    dataSource;
    configService;
    constructor(authRepository, dataSource, configService) {
        this.authRepository = authRepository;
        this.dataSource = dataSource;
        this.configService = configService;
    }
    async signUpUser(createAuthDto) {
        const { username, password } = createAuthDto;
        try {
            const existingUser = await this.dataSource
                .getRepository(auth_entity_1.Auth)
                .createQueryBuilder('user')
                .where('user.username = :username', { username })
                .getOne();
            if (existingUser) {
                throw new common_1.HttpException('User already exists', common_1.HttpStatus.CONFLICT);
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const result = await this.dataSource
                .createQueryBuilder()
                .insert()
                .into(auth_entity_1.Auth)
                .values({ username, password: hashedPassword })
                .execute();
            const userId = result.identifiers[0].id;
            const jwtSecret = this.configService.get('JWT_SECRET');
            if (!jwtSecret) {
                throw new common_1.HttpException('JWT_SECRET is not configured', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const token = jsonwebtoken_1.default.sign({ id: userId, username }, jwtSecret, { expiresIn: '7d' });
            return {
                message: 'User successfully created',
                token,
                userId
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('Failed to create new user', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async loginUser(dto) {
        const { username, password } = dto;
        const user = await this.dataSource
            .getRepository(auth_entity_1.Auth)
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .addSelect('user.password')
            .getOne();
        if (!user) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const jwtSecret = this.configService.get('JWT_SECRET');
        if (!jwtSecret) {
            throw new common_1.HttpException('JWT_SECRET is not configured', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '7d' });
        return { token, user };
    }
    async findAllUsers() {
        return await this.authRepository.find();
    }
    async findOneUser(username) {
        try {
            const findOneUser = await this.authRepository.findOne({ where: { username } });
            if (!findOneUser) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            return findOneUser;
        }
        catch {
            throw new common_1.HttpException('Error fetching user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.Auth)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map