import { Test, TestingModule } from '@nestjs/testing';
import { CompanySubscriptionsService } from './company-subscriptions.service';

describe('CompanySubscriptionsService', () => {
  let service: CompanySubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanySubscriptionsService],
    }).compile();

    service = module.get<CompanySubscriptionsService>(CompanySubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
