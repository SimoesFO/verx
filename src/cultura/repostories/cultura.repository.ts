import { CulturaCreateDTO } from '../dtos/cultura-create.dto';
import { CulturaUpdateDTO } from '../dtos/cultura-update.dto';
import { CulturaDTO } from '../dtos/cultura.dto';

export abstract class CulturaRepository {
  abstract findAll(): Promise<CulturaDTO[]>;
  abstract findOneById(id: string): Promise<CulturaDTO>;
  abstract create(data: CulturaCreateDTO): Promise<CulturaDTO>;
  abstract update(obj: CulturaUpdateDTO): Promise<CulturaDTO>;
  abstract delete(id: string): Promise<Partial<CulturaDTO>>;
}
