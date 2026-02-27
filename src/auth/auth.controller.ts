import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDTO } from './dto/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiOkResponse({
    type: AuthResponseDTO,
  })
  @Post('register')
  register(@Body() dto: RegisterDTO): Promise<Record<any, string>> {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Logar usuário' })
  @ApiOkResponse({
    type: AuthResponseDTO,
  })
  @Post('login')
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }
}