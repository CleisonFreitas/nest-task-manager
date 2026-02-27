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
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDTO): Promise<Record<any, string>> {
        console.log('metodo register está sendo chamado.');
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

        return this.generateToken(user);
    }

    async login(dto: LoginDTO): Promise<Record<any, string>> {
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

        return this.generateToken(user);
    }

    private generateToken(user: User): Record<any, string> {
        const payload = { sub: user.id, email: user.email };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}