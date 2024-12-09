import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileService } from './_core/services/file.service';
import { SequelizeModule } from '@nestjs/sequelize';

import { LoanModule } from './loan/loan.module';
import { CompanyModule } from './company/company.module';
import { CompanySubscriptionsModule } from './company-subscriptions/company-subscriptions.module';

import { dataBaseConfig } from './_core/database/database.config';

@Module({
  imports: [
    CompanyModule,
    CompanySubscriptionsModule,
    LoanModule,
    SequelizeModule.forRoot(dataBaseConfig),
  ],
  controllers: [AppController],
  providers: [FileService],
})
export class AppModule {}
