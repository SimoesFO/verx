import { PartialType } from '@nestjs/swagger';
import { ProdutorDTO } from './produtor.dto';

export class ProdutorUpdateDTO extends PartialType(ProdutorDTO) {}
