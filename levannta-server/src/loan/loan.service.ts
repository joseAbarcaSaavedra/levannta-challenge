import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Loan } from './entities/loan.entity';
import { WhereOptions } from 'sequelize';
import * as dayjs from 'dayjs';

@Injectable()
export class LoanService {
  constructor(
    @InjectModel(Loan)
    private readonly loanRepository: typeof Loan,
  ) {}

  async create(loanData: Partial<Loan>) {
    // Calcula el número de cuotas pactadas
    loanData.installments = loanData.paymentDates?.length || 0;

    return await this.loanRepository.create(loanData);
  }

  async updateLoan(loanId: string, loanData: Partial<Loan>) {
    // Calcula el número de cuotas pactadas
    if (loanData.paymentDates) {
      loanData.installments = loanData.paymentDates.length;
    }

    await this.loanRepository.update(loanData, {
      where: { loanId },
    });

    return this.findOne(loanId);
  }

  async findAll(filter?: WhereOptions<Loan>) {
    const loans = await this.loanRepository.findAll({
      where: filter,
    });
    return loans.map((subscription) => subscription.get({ plain: true }));
  }

  async findOne(loanId: string) {
    return await this.loanRepository.findByPk(loanId);
  }

  evaluateLoan(
    companyId: string,
    currentMonthSubscribers: any,
    previousMonthSubscribers: any,
  ) {
    try {
      const previousMonthIds: string[] = [];

      // Get Current MRR
      const MRR = currentMonthSubscribers.reduce(
        (sum: number, sub: any) => sum + sub.amount,
        0,
      );

      const churnedCustomers = previousMonthIds.filter(
        (id: string) =>
          !currentMonthSubscribers.some((sub: any) => sub.id === id),
      );

      const churnRate = Math.round(
        (churnedCustomers.length / previousMonthSubscribers.length) * 100,
      );
      /**
       * Customized formula for calculating the score, credit limit, and score based on the MRR and churn rate
       */

      // Get Score
      const score = MRR / 10 - churnRate * (churnRate > 5 ? 15 : 10);

      // Get credit limit
      const creditLimit =
        score > 70 ? (churnRate > 5 ? MRR * 0.95 : MRR) * 0.5 : 0;

      return { MRR, churnRate, score, creditLimit };

      // TODO: Check company active loans and return the maximum loan amount
    } catch (error) {
      throw new Error(error);
    }
  }

  getMaxLoanAmount(
    companyId: string,
    currentMonthSubscribers: any,
    previousMonthSubscribers: any,
  ): number {
    const { creditLimit } = this.evaluateLoan(
      companyId,
      currentMonthSubscribers,
      previousMonthSubscribers,
    );
    return creditLimit;
  }

  async applyLoan(applyLoanDto: any) {
    const INTEREST_RATE = 1.25; // TODO: Define the interest rate in settings or based on the score

    const { companyId, amount, installments, score, creditLimit } =
      applyLoanDto;

    if (!amount) {
      throw new BadRequestException(
        'Loan amount is required to apply for a loan',
      );
    }
    if (!installments) {
      throw new BadRequestException(
        'Number of installments is required to apply for a loan',
      );
    }
    if (score < 70) {
      // TODO: Define the minimum score in settings
      throw new BadRequestException(
        'Loan application rejected due to low score',
      );
    }

    // Check if the loan amount exceeds the credit limit
    const activeLoans = await this.findAll({
      active: true,
      companyId,
    });

    const activeLoansAmount = activeLoans.reduce(
      (sum: number, loan: any) => sum + loan.amount,
      0,
    );

    if (amount + activeLoansAmount > creditLimit) {
      throw new BadRequestException(
        `Loan amount exceeds the maximum loan amount of ${creditLimit}, your current active loans amount is ${activeLoansAmount}`,
      );
    }

    const { installmentValue, paymentDates } = this.calculateInstallments(
      amount,
      INTEREST_RATE,
      installments,
    );

    console.log('{ installmentValue, paymentDates }', {
      installmentValue,
      paymentDates,
    });

    const loanData: CreateLoanDto = {
      companyId,
      amount,
      installments: installments,
      paymentDates,
      installmentValue,
      interestRate: INTEREST_RATE,
      creditLimit,
    };

    return await this.create(loanData);
  }

  calculateInstallments(
    amount: number,
    interestRate: number,
    installments: number,
  ) {
    const monthlyRate = interestRate / 12 / 100;

    const monthlyInstallment =
      monthlyRate > 0
        ? (amount * monthlyRate * Math.pow(1 + monthlyRate, installments)) /
          (Math.pow(1 + monthlyRate, installments) - 1)
        : amount / installments;

    const paymentDates = [];
    const now = dayjs();

    for (let i = 0; i < installments; i++) {
      paymentDates.push(now.add(i + 1, 'month').format('YYYY-MM-DD'));
    }

    return {
      installmentValue: parseFloat(monthlyInstallment.toFixed(2)), // rounded to 2 decimal places
      paymentDates,
    };
  }

  async activeLoans(companyId: string) {
    // Get active loans
    return await this.findAll({
      companyId,
      active: true,
    });
  }
}
