import { Test, TestingModule } from '@nestjs/testing';
import { CompanySubscriptionsController } from './company-subscriptions.controller';
import { CompanySubscriptionsService } from './company-subscriptions.service';

describe('CompanySubscriptionsController', () => {
  let controller: CompanySubscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanySubscriptionsController],
      providers: [CompanySubscriptionsService],
    }).compile();

    controller = module.get<CompanySubscriptionsController>(CompanySubscriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
