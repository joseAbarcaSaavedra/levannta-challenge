import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CompanySubscriptionsService } from './company-subscriptions.service';
import { CompanySubscriptionsController } from './company-subscriptions.controller';
import { CompanySubscription } from './entities/company-subscription.entity';

@Module({
  imports: [SequelizeModule.forFeature([CompanySubscription])],
  controllers: [CompanySubscriptionsController],
  providers: [CompanySubscriptionsService],
  exports: [CompanySubscriptionsService],
})
export class CompanySubscriptionsModule {}
