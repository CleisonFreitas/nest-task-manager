import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
    Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: RegisterDTO) {
        const userExists = await this.usersRepository.findOne({
            where: { email: dto.email },
        });

        if (userExists) {
            throw new BadRequestException('Email já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(dto.senha, 10);

        const user = this.usersRepository.create({
            ...dto,
            senha: hashedPassword,
        });

        await this.usersRepository.save(user);

        return { message: 'Usuário criado com sucesso' };
    }

    async login(dto: LoginDTO) {
        const user = await this.usersRepository.findOne({
            where: { email: dto.email },
            select: ['id', 'email', 'senha'],
        });

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const passwordMatch = await bcrypt.compare(dto.senha, user.senha);

        if (!passwordMatch) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: user.id, email: user.email };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}