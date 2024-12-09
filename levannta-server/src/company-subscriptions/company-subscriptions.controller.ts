import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanySubscriptionsService } from './company-subscriptions.service';
import { CreateCompanySubscriptionDto } from './dto/create-company-subscription.dto';
import { UpdateCompanySubscriptionDto } from './dto/update-company-subscription.dto';

@Controller('company-subscriptions')
export class CompanySubscriptionsController {
  constructor(
    private readonly companySubscriptionsService: CompanySubscriptionsService,
  ) {}

  @Post()
  create(@Body() createCompanySubscriptionDto: CreateCompanySubscriptionDto) {
    return this.companySubscriptionsService.create(
      createCompanySubscriptionDto,
    );
  }

  @Get()
  findAll() {
    return this.companySubscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companySubscriptionsService.findOne(+id);
  }
}
