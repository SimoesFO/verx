import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CulturaDTO } from 'src/cultura/dtos/cultura.dto';

export class ProdutorDTO {
  @IsUUID(null, { message: 'ID inválido' })
  @ApiProperty({ default: '77ef6fe8-4894-4fa8-8439-7e6a838cf38e' })
  id: string;

  @IsString({ message: 'CPF deve ser um texto e somente números' })
  @MinLength(11, {
    message: 'CPF/CNPF deve conter no minímo 11 caracteres e somente números',
  })
  @MaxLength(14, {
    message: 'CPF/CNPF deve conter no maxímo 14 caracteres e somente números',
  })
  @ApiProperty({ default: '01234567890' })
  cpf_cnpj: string;

  @IsString({ message: 'Produtor Inválido' })
  @Length(5, 300, { message: 'Nome deve conter entre 5 e 300 caracteres' })
  @ApiProperty({ default: 'João de Alencar Silva' })
  produtor: string;

  @IsString({ message: 'Fazenda Inválido' })
  @Length(5, 300, {
    message: 'O nome da fazenda deve conter entre 5 e 300 caracteres',
  })
  @ApiProperty({ default: 'Fazenda Nova Esperança' })
  fazenda: string;

  @IsString({ message: 'Nome da cidade inválido' })
  @Length(5, 100, {
    message: 'O nome da cidade deve conter entre 5 e 100 caracteres.',
  })
  @ApiProperty({ default: 'Curitiba' })
  cidade: string;

  @IsString({ message: 'Nome do UF inválido' })
  @Length(2, 2, { message: 'O UF deve conter apenas dois caracteres' })
  @ApiProperty({ default: 'PR' })
  estado: string;

  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'A área total deve ser um número.' },
  )
  @ApiProperty({ default: 10 })
  area_total: number;

  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'A área de cultivo deve ser um número.' },
  )
  @ApiProperty({ default: 7 })
  area_cultivo: number;

  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'A área de vegetacao deve ser um número.' },
  )
  @ApiProperty({ default: 3 })
  area_vegetacao: number;

  @IsOptional()
  @ApiProperty({ type: [CulturaDTO] })
  culturas?: CulturaDTO[];

  @IsDate({ message: 'Data inválida' })
  @ApiProperty({ default: new Date() })
  created_at: Date;

  @IsDate({ message: 'Data inválida' })
  @ApiProperty({ default: new Date() })
  updated_at: Date;

  @IsBoolean()
  @ApiProperty({ default: false })
  deleted: boolean;
}
