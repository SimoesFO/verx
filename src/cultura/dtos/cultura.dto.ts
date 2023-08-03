import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString, IsUUID, Length } from 'class-validator';

export class CulturaDTO {
  @IsUUID(null, { message: 'ID inválido' })
  @ApiProperty({ default: '7f5c285a-06c6-4b13-a06f-affe4eec1d1e' })
  id: string;

  @IsString({ message: 'Nome da cultura Inválido' })
  @Length(1, 300, {
    message: 'O nome da cultura deve conter entre 5 e 300 caracteres',
  })
  @ApiProperty({ default: 'Buriti' })
  nome: string;

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
