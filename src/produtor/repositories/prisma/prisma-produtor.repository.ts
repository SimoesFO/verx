import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ProdutorRural as Produtor } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ProdutorRepository } from '../produtor.repository';

@Injectable()
export class PrismaProdutorRepository implements ProdutorRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(PrismaProdutorRepository.name);

  async findAll(): Promise<Produtor[]> {
    try {
      return await this.prisma.produtorRural.findMany({
        where: { deleted: false },
        orderBy: { created_at: 'desc' },
        include: {
          culturas: true,
        },
      });
    } catch (error) {
      this.logger.error('findAll');
      console.log(error);
      throw new InternalServerErrorException(
        'Não foi possível realizar a busca dos produtores rurais',
      );
    }
  }

  async findOneById(id: string): Promise<Produtor> {
    try {
      return await this.prisma.produtorRural.findFirst({
        where: { id, deleted: false },
      });
    } catch (error) {
      this.logger.error('findOneById');
      console.log(error);
      throw new InternalServerErrorException(
        'Não foi possível realizar a busca por produtor rural',
      );
    }
  }

  async create(data: Produtor): Promise<Produtor> {
    try {
      const { cpf_cnpj } = data;
      const produtor = await this.prisma.produtorRural.findFirst({
        where: {
          AND: [{ deleted: false }, { OR: [{ cpf_cnpj }] }],
        },
      });

      if (produtor)
        throw new UnprocessableEntityException('Produtor já cadastrado');

      return await this.prisma.produtorRural.create({ data });
    } catch (error) {
      this.logger.error('create');
      console.log(error);

      if (error?.status && error?.status == 422) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Não foi possível cadastrar o produtor rural.',
      );
    }
  }

  async update(obj: Produtor): Promise<Produtor> {
    try {
      const { id, ...data } = obj;

      return await this.prisma.produtorRural.update({ where: { id }, data });
    } catch (error) {
      this.logger.error('update');
      console.log(error);
      throw new InternalServerErrorException(
        'Não foi possível atualizar o produtor rural.',
      );
    }
  }

  async delete(id: string): Promise<Partial<Produtor>> {
    try {
      const user = await this.prisma.produtorRural.findFirst({
        where: { id },
      });

      if (!user)
        throw new UnprocessableEntityException('Produtor rural não encontrado');

      if (user.deleted) return { id };

      await this.prisma.produtorRural.update({
        where: { id },
        data: { deleted: true },
      });

      return { id };
    } catch (error) {
      this.logger.error('delete');
      console.log(error);

      if (error?.status && error?.status == 422) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Não foi possível deletar o produtor rural.',
      );
    }
  }
}
