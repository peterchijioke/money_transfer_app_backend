import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  first_name!: string;  

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  last_name!: string;  

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password!: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 11)
  phone!: string;
}
