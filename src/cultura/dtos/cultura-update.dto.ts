import { PartialType } from '@nestjs/swagger';
import { CulturaDTO } from './cultura.dto';

export class CulturaUpdateDTO extends PartialType(CulturaDTO) {}
