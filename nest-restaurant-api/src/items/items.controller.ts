import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { Item } from '../models/items';
import { ValidationPipe } from '../common/validation.pipe';
import { CreateItemDto } from '../dto/create-item.dto';

@Controller('items')
export class ItemsController {

  constructor(private readonly itemsService: ItemsService) {

  }

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() item: CreateItemDto) {
    this.itemsService.create(item);
  }
}
