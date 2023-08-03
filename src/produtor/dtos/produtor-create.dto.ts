import { PickType } from '@nestjs/swagger';
import { ProdutorDTO } from './produtor.dto';

export class ProdutorCreateDTO extends PickType(ProdutorDTO, [
  'cpf_cnpj',
  'produtor',
  'fazenda',
  'cidade',
  'estado',
  'area_total',
  'area_cultivo',
  'area_vegetacao',
]) {}
