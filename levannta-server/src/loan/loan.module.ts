import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Loan } from './entities/loan.entity';
@Module({
  imports: [SequelizeModule.forFeature([Loan])],

  controllers: [LoanController],
  providers: [LoanService],
  exports: [LoanService],
})
export class LoanModule {}
