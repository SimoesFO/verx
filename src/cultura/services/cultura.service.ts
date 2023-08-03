import { Injectable, Logger } from '@nestjs/common';
import { CulturaRepository } from '../repostories/cultura.repository';
import { CulturaDTO } from '../dtos/cultura.dto';
import { CulturaCreateDTO } from '../dtos/cultura-create.dto';
import { CulturaUpdateDTO } from '../dtos/cultura-update.dto';

@Injectable()
export class CulturaService {
  constructor(private readonly repository: CulturaRepository) {}

  private readonly logger = new Logger(CulturaService.name);

  async findAll(): Promise<CulturaDTO[]> {
    return this.repository.findAll();
  }

  async findOneById(id: string): Promise<CulturaDTO> {
    return this.repository.findOneById(id);
  }

  async create(data: CulturaCreateDTO): Promise<CulturaDTO> {
    return this.repository.create(data);
  }

  async update(data: CulturaUpdateDTO): Promise<CulturaDTO> {
    return this.repository.update(data);
  }

  async delete(id: string): Promise<Partial<CulturaDTO>> {
    return this.repository.delete(id);
  }
}
