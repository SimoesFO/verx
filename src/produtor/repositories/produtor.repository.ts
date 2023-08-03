import { ProdutorCreateDTO } from '../dtos/produtor-create.dto';
import { ProdutorUpdateDTO } from '../dtos/produtor-update.dto';
import { ProdutorDTO } from '../dtos/produtor.dto';

export abstract class ProdutorRepository {
  abstract findAll(): Promise<ProdutorDTO[]>;
  abstract findOneById(id: string): Promise<ProdutorDTO>;
  abstract create(data: ProdutorCreateDTO): Promise<ProdutorDTO>;
  abstract update(obj: ProdutorUpdateDTO): Promise<ProdutorDTO>;
  abstract delete(id: string): Promise<Partial<ProdutorDTO>>;
}
