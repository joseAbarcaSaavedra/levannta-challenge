import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { FileService } from './_core/services/file.service';
import { CompanyModule } from './company/company.module';
import { CompanySubscriptionsModule } from './company-subscriptions/company-subscriptions.module';
import { LoanModule } from './loan/loan.module';
import { dataBaseConfig } from './_core/database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [
    CompanyModule,
    CompanySubscriptionsModule,
    LoanModule,
    SequelizeModule.forRoot(dataBaseConfig),
  ],
  controllers: [AppController],
  providers: [AppService, FileService],
})
export class AppModule {}
