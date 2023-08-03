import { Module } from '@nestjs/common';
import { CulturaController } from './controllers/cultura.controller';
import { CulturaService } from './services/cultura.service';
import { CulturaRepository } from './repostories/cultura.repository';
import { PrismaCulturaRepository } from './repostories/prisma/prisma-cultura.repository';

const _CulturaRepository = {
  provide: CulturaRepository,
  useClass: PrismaCulturaRepository,
};

@Module({
  imports: [],
  controllers: [CulturaController],
  providers: [_CulturaRepository, CulturaService],
  exports: [_CulturaRepository],
})
export class CulturaModule {}
