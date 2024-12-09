import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileService } from './_core/services/file.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { CompanyService } from './company/company.service';
import { LoanService } from './loan/loan.service';

@Controller()
export class AppController {
  constructor(
    private readonly fileService: FileService,
    private readonly companyService: CompanyService,
    private readonly loanService: LoanService,
  ) {}

  @Post('portfolio')
  @UseInterceptors(FileInterceptor('file'))
  async setPortfolio(@UploadedFile() file: Express.Multer.File): Promise<any> {
    try {
      const COMPANY_ID = 'company-1';
      // TODO: check company authentication

      // Read input file
      const companyPortfolio = await this.fileService.parseCsv(file.buffer);

      // Save to database
      await this.companyService.setSubscriptions(COMPANY_ID, companyPortfolio);

      // Use current month and previous month to evaluate the loan
      const CURRENT_MONTH = new Date().getMonth() + 1;
      const CURRENT_YEAR = new Date().getFullYear();

      const { currentMonthSubscribers, previousMonthSubscribers } =
        await this.companyService.getSubscriptionsToEvaluateLoan(
          COMPANY_ID,
          CURRENT_MONTH,
          CURRENT_YEAR,
        );

      // Get maximum loan amount
      const maxLoanAmount = await this.loanService.getMaxLoanAmount(
        COMPANY_ID,
        currentMonthSubscribers,
        previousMonthSubscribers,
      );
      return {
        maxLoanAmount,
      };
    } catch (error) {
      // TODO: Log error
      throw new BadRequestException(error);
    }
  }

  @Post('apply-loan')
  async applyLoan(@Body() body: { amount: number }): Promise<any> {
    try {
      // TODO: check company authentication
      const COMPANY_ID = 'company-1'; // Default company ID
      const INSTALLMENTS = 6; // Default number of installments

      const { amount } = body;

      // Use current month and previous month to evaluate the loan
      const CURRENT_MONTH = new Date().getMonth() + 1;
      const CURRENT_YEAR = new Date().getFullYear();

      const { currentMonthSubscribers, previousMonthSubscribers } =
        await this.companyService.getSubscriptionsToEvaluateLoan(
          COMPANY_ID,
          CURRENT_MONTH,
          CURRENT_YEAR,
        );

      // Get maximum loan amount
      const { creditLimit, score } = await this.loanService.evaluateLoan(
        COMPANY_ID,
        currentMonthSubscribers,
        previousMonthSubscribers,
      );

      // Save loan application
      const loan = await this.loanService.applyLoan({
        companyId: COMPANY_ID,
        amount,
        installments: INSTALLMENTS,
        score,
        creditLimit,
      });

      return { ...loan };
    } catch (error) {
      // TODO: Log error
      throw new BadRequestException(error);
    }
  }

  @Get('loan-status')
  async getLoanStatus(): Promise<any> {
    try {
      // TODO: check company authentication
      const COMPANY_ID = 'company-1'; // Default company ID

      // Get loan status
      const loans = await this.loanService.activeLoans(COMPANY_ID);

      return { status: loans.length > 0 ? 'active' : 'inactive', loans };
    } catch (error) {
      // TODO: Log error
      throw new BadRequestException(error);
    }
  }
}
