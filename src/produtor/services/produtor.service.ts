import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CulturaRepository } from 'src/cultura/repostories/cultura.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ProdutorCreateDTO } from '../dtos/produtor-create.dto';
import { ProdutorUpdateDTO } from '../dtos/produtor-update.dto';
import { ProdutorDTO } from '../dtos/produtor.dto';
import { ProdutorRepository } from '../repositories/produtor.repository';

@Injectable()
export class ProdutorService {
  constructor(
    private readonly repository: ProdutorRepository,
    private readonly repostiroyCultura: CulturaRepository,
    private readonly prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(ProdutorService.name);

  async findAll(): Promise<ProdutorDTO[]> {
    return this.repository.findAll();
  }

  async findOneById(id: string): Promise<ProdutorDTO> {
    return this.repository.findOneById(id);
  }

  async create(data: ProdutorCreateDTO): Promise<ProdutorDTO> {
    const { area_total, area_cultivo, area_vegetacao } = data;

    if (area_total < area_cultivo + area_vegetacao) {
      throw new BadRequestException(
        'Área de cultivo + área de vegetação não pode ser maior do que a área total',
      );
    }
    return this.repository.create(data);
  }

  async update(data: ProdutorUpdateDTO): Promise<ProdutorDTO> {
    return this.repository.update(data);
  }

  async delete(id: string): Promise<Partial<ProdutorDTO>> {
    return this.repository.delete(id);
  }

  async linkProdutoresCulturas(id: string, data: { id: string }[]) {
    try {
      return await this.prisma.produtorRural.update({
        where: { id },
        data: {
          culturas: {
            connect: data,
          },
        },
        include: {
          culturas: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async unlinkProdutoresCulturas(id: string, data: { id: string }[]) {
    try {
      return await this.prisma.produtorRural.update({
        where: { id },
        data: {
          culturas: {
            disconnect: data,
          },
        },
        include: {
          culturas: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
