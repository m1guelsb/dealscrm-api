import { SigninDtoInput, SignupDtoInput } from '../dto';

export interface iAuthRepository {
  signup: (dto: SignupDtoInput) => Promise<{ access_token: string }>;

  signin: (dto: SigninDtoInput) => Promise<{ access_token: string }>;

  signToken: (
    userId: string,
    email: string,
  ) => Promise<{
    access_token: string;
  }>;
}
