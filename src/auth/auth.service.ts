import { Injectable } from '@nestjs/common';
import { SigninDtoInput, SignupDtoInput } from './dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthRepository } from './repository/AuthRepository';

@Injectable()
export class AuthService {
  constructor(private AuthRepository: AuthRepository) {}

  signup(dto: SignupDtoInput) {
    return this.AuthRepository.signup(dto);
  }

  signin(dto: SigninDtoInput) {
    return this.AuthRepository.signin(dto);
  }
}
