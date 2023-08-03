import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { CulturaModule } from './cultura/cultura.module';
import { ProdutorModule } from './produtor/produtor.module';

@Module({
  imports: [SharedModule, ProdutorModule, CulturaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
