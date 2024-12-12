import { IsString, IsEmail, Length } from 'class-validator';

export class SignupDto {
  @IsString()
  @Length(3, 50)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 20)
  password!: string;
}
