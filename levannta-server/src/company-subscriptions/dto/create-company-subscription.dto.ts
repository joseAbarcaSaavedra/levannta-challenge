import { IsString, IsInt, IsNumber, Min, Max } from 'class-validator';

export class CreateCompanySubscriptionDto {
  @IsString()
  clientId: string;

  @IsString()
  companyId: string;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  @Min(2023) // Puedes ajustar este valor según tus necesidades
  year: number;

  @IsNumber()
  @Min(0) // Asegura que el monto sea positivo
  amount: number;
}
