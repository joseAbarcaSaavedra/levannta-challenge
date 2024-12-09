import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';

import { CreateCompanySubscriptionDto } from './dto/create-company-subscription.dto';
import { UpdateCompanySubscriptionDto } from './dto/update-company-subscription.dto';
import { CompanySubscription } from './entities/company-subscription.entity';

@Injectable()
export class CompanySubscriptionsService {
  constructor(
    @InjectModel(CompanySubscription)
    private companySubscriptionRepository: typeof CompanySubscription,
  ) {}

  async create(createCompanySubscriptionDto: CreateCompanySubscriptionDto) {
    return await this.companySubscriptionRepository.create(
      createCompanySubscriptionDto as any,
    );
  }
  async findAll(filter?: WhereOptions<CompanySubscription>) {
    const subscriptions = await this.companySubscriptionRepository.findAll({
      where: filter,
    });
    return subscriptions.map((subscription) =>
      subscription.get({ plain: true }),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} companySubscription`;
  }

  async update(updateCompanySubscriptionDto: CreateCompanySubscriptionDto) {
    const { clientId, companyId, month, year, amount } =
      updateCompanySubscriptionDto;

    const updateDto: UpdateCompanySubscriptionDto = {
      amount,
    };
    return await this.companySubscriptionRepository.update(updateDto, {
      where: { clientId, companyId, month, year },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} companySubscription`;
  }

  removeMany(filter: WhereOptions<CompanySubscription>) {
    return this.companySubscriptionRepository.destroy({ where: filter });
  }
}
