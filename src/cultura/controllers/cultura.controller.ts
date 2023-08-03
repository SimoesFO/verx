import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CulturaService } from '../services/cultura.service';
import { CulturaCreateDTO } from '../dtos/cultura-create.dto';
import { CulturaUpdateDTO } from '../dtos/cultura-update.dto';
import { ApiResponse, ApiTags, PickType } from '@nestjs/swagger';
import { CulturaDTO } from '../dtos/cultura.dto';

@ApiTags('Culturas de Cultivo')
@Controller('culturas')
export class CulturaController {
  constructor(private readonly culturaService: CulturaService) {}

  @ApiResponse({
    type: [CulturaDTO],
  })
  @Get()
  findAll() {
    return this.culturaService.findAll();
  }

  @ApiResponse({
    type: CulturaDTO,
  })
  @Get(':id')
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.culturaService.findOneById(id);
  }

  @ApiResponse({
    type: CulturaDTO,
  })
  @Post()
  create(@Body() data: CulturaCreateDTO) {
    return this.culturaService.create(data);
  }

  @ApiResponse({
    type: CulturaDTO,
  })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CulturaUpdateDTO,
  ) {
    return this.culturaService.update({ ...data, id });
  }

  @ApiResponse({
    type: PickType(CulturaDTO, ['id']),
  })
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.culturaService.delete(id);
  }
}
