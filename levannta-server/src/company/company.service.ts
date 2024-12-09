import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { CompanySubscriptionsService } from '../company-subscriptions/company-subscriptions.service';
import { CreateCompanySubscriptionDto } from './../company-subscriptions/dto/create-company-subscription.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private companyRepository: typeof Company,
    private readonly companySubscriptionsService: CompanySubscriptionsService,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.create(createCompanyDto as any);
  }

  findAll() {
    return this.companyRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }

  async setSubscriptions(
    companyId: string,
    subscriptions: CreateCompanySubscriptionDto[],
  ) {
    // Overriding subscriptions with the new ones
    // First, remove all the subscriptions for the company
    await this.companySubscriptionsService.removeMany({ companyId });
    // Then, we create the new subscriptions
    return await Promise.all(
      subscriptions.map(async (sub: any) => {
        try {
          const subscription: CreateCompanySubscriptionDto = {
            companyId,
            clientId: sub['ID_CLIENTE'],
            month: parseInt(sub['MES']),
            year: parseInt(sub['AÑO']),
            amount: parseInt(sub['MONTO (USD)']),
          };
          const entity =
            await this.companySubscriptionsService.create(subscription);

          return entity;
        } catch (error) {
          console.log('error---->', error);
        }
      }),
    );
  }

  getSubscriptions(filter: any) {
    return this.companySubscriptionsService.findAll(filter);
  }

  async getSubscriptionsToEvaluateLoan(
    companyId: string,
    month: number,
    year: number,
  ) {
    const previousMonth = month === 1 ? 12 : month - 1;
    const previousYear = month === 1 ? year - 1 : year;

    const currentMonthSubscribers = await this.getSubscriptions({
      month: month,
      year: year,
      companyId: companyId,
    });

    const previousMonthSubscribers = await this.getSubscriptions({
      month: previousMonth,
      year: previousYear,
      companyId: companyId,
    });

    return { currentMonthSubscribers, previousMonthSubscribers };
  }
}
