import {
  IsString,
  IsNumber,
  IsInt,
  Min,
  Max,
  IsArray,
  ArrayNotEmpty,
  ValidateIf,
} from 'class-validator';

export class CreateLoanDto {
  @IsString()
  companyId: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsInt()
  @Min(1)
  installments: number;

  @IsArray()
  @ArrayNotEmpty()
  paymentDates: string[];

  @IsNumber()
  @Min(0)
  installmentValue: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  interestRate: number;

  @ValidateIf((o) => o.creditLimit !== undefined)
  @IsNumber()
  @Min(1)
  creditLimit?: number;
}
