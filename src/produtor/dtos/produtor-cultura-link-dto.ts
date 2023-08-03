import { ApiProperty } from '@nestjs/swagger';

export class ProdutorCulturaLinkDTO {
  @ApiProperty({ description: 'id da cultura a ser vinculada ao produtor' })
  id: string;
}
