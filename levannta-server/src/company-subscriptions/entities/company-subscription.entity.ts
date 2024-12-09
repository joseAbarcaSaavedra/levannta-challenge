import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  tableName: 'company_subscriptions',
})
export class CompanySubscription extends Model {
  @PrimaryKey // Marca este campo como parte de la clave primaria compuesta
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  clientId: string;

  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  companyId: string;

  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  month: number;

  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
    validate: {
      min: 0, // Validación para asegurar que no sea negativo
    },
  })
  amount: number;
}
