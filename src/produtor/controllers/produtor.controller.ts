import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutorService } from '../services/produtor.service';
import { ProdutorCreateDTO } from '../dtos/produtor-create.dto';
import { ProdutorUpdateDTO } from '../dtos/produtor-update.dto';
import {
  ApiBody,
  ApiHeader,
  ApiProperty,
  ApiResponse,
  ApiTags,
  PickType,
} from '@nestjs/swagger';
import { create } from 'domain';
import { type } from 'os';
import { ProdutorDTO } from '../dtos/produtor.dto';
import { ProdutorCulturaLinkDTO } from '../dtos/produtor-cultura-link-dto';

@ApiTags('Produtores Rurais')
@Controller('produtores')
export class ProdutorController {
  constructor(private readonly produtorService: ProdutorService) {}

  @ApiResponse({
    type: [ProdutorDTO],
  })
  @Get()
  findAll() {
    return this.produtorService.findAll();
  }

  @ApiResponse({
    type: ProdutorDTO,
  })
  @Get(':id')
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.produtorService.findOneById(id);
  }

  @ApiResponse({
    type: ProdutorDTO,
  })
  @Post()
  create(@Body() data: ProdutorCreateDTO) {
    return this.produtorService.create(data);
  }

  @ApiResponse({
    type: ProdutorDTO,
  })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ProdutorUpdateDTO,
  ) {
    return this.produtorService.update({ ...data, id });
  }

  @ApiResponse({
    type: PickType(ProdutorDTO, ['id']),
  })
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.produtorService.delete(id);
  }

  @ApiBody({ type: [ProdutorCulturaLinkDTO] })
  @ApiResponse({
    type: ProdutorDTO,
  })
  @Patch(':id/culturas')
  linkProdutoresCulturas(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ProdutorCulturaLinkDTO[],
  ) {
    return this.produtorService.linkProdutoresCulturas(id, data);
  }

  @ApiBody({ type: [ProdutorCulturaLinkDTO] })
  @ApiResponse({
    type: ProdutorDTO,
  })
  @Patch(':id/culturas/remove')
  unlinkProdutoresCulturas(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ProdutorCulturaLinkDTO[],
  ) {
    return this.produtorService.unlinkProdutoresCulturas(id, data);
  }
}
