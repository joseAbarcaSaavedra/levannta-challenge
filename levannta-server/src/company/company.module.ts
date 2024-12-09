import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { CompanySubscriptionsModule } from '../company-subscriptions/company-subscriptions.module';

@Module({
  imports: [SequelizeModule.forFeature([Company]), CompanySubscriptionsModule],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
