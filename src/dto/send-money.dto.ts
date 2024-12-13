import { IsString, IsNumber, IsNotEmpty, IsPositive, Length, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SendMoneyDTO {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @Length(10, 10)  
  recipientAccount: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)  
  bankCode: string;
}
