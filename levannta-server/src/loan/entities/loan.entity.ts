import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'loans',
})
export class Loan extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  loanId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  companyId: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  amount: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  interestRate: number;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: [],
  })
  paymentDates: string[];

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  installments: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  })
  installmentValue: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  active: boolean;
}
