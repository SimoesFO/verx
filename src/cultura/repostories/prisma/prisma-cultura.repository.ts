import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Cultura } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CulturaRepository } from '../cultura.repository';

@Injectable()
export class PrismaCulturaRepository implements CulturaRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(PrismaCulturaRepository.name);

  async findAll(): Promise<Cultura[]> {
    try {
      return await this.prisma.cultura.findMany({
        where: { deleted: false },
        orderBy: { created_at: 'desc' },
      });
    } catch (error) {
      this.logger.error('findAll');
      console.log(error);
      throw new InternalServerErrorException(
        'Não foi possível realizar a busca dos Culturaes rurais',
      );
    }
  }

  async findOneById(id: string): Promise<Cultura> {
    try {
      return await this.prisma.cultura.findFirst({
        where: { id, deleted: false },
      });
    } catch (error) {
      this.logger.error('findOneById');
      console.log(error);
      throw new InternalServerErrorException(
        'Não foi possível realizar a busca por usuário',
      );
    }
  }

  async create(data: Cultura): Promise<Cultura> {
    try {
      return await this.prisma.cultura.create({ data });
    } catch (error) {
      this.logger.error('create');
      console.log(error);

      if (error?.status && error?.status == 422) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Não foi possível cadastrar o usuário.',
      );
    }
  }

  async update(obj: Cultura): Promise<Cultura> {
    try {
      const { id, ...data } = obj;

      return await this.prisma.cultura.update({ where: { id }, data });
    } catch (error) {
      this.logger.error('update');
      console.log(error);
      throw new InternalServerErrorException(
        'Não foi possível atualizar o usuário.',
      );
    }
  }

  async delete(id: string): Promise<Partial<Cultura>> {
    try {
      const user = await this.prisma.cultura.findFirst({
        where: { id },
      });

      if (!user)
        throw new UnprocessableEntityException('Usuário não encontrado');

      if (user.deleted) return { id };

      await this.prisma.cultura.update({
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
        'Não foi possível deletar o usuário.',
      );
    }
  }
}
