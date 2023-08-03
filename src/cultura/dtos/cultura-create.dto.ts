import { PickType } from '@nestjs/swagger';
import { CulturaDTO } from './cultura.dto';

export class CulturaCreateDTO extends PickType(CulturaDTO, ['nome']) {}
