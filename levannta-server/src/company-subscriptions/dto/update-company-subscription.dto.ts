import { IsNumber, Min } from 'class-validator';
export class UpdateCompanySubscriptionDto {
  @IsNumber()
  @Min(0) // Asegura que el monto sea positivo
  amount: number;
}
