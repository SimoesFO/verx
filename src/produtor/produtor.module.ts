import { Module } from '@nestjs/common';
import { ProdutorRepository } from './repositories/produtor.repository';
import { PrismaProdutorRepository } from './repositories/prisma/prisma-produtor.repository';
import { ProdutorController } from './controllers/produtor.controller';
import { ProdutorService } from './services/produtor.service';
import { CulturaModule } from 'src/cultura/cultura.module';

const _ProdutorRepository = {
  provide: ProdutorRepository,
  useClass: PrismaProdutorRepository,
};

@Module({
  imports: [CulturaModule],
  controllers: [ProdutorController],
  providers: [_ProdutorRepository, ProdutorService],
})
export class ProdutorModule {}
