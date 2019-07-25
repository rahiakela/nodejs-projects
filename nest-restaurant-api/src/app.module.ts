import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ItemsController } from './items/items.controller';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { ItemsService } from './services/items.service';

@Module({
  imports: [],
  controllers: [AppController, ItemsController, ShoppingCartController],
  providers: [ItemsService],
})
export class AppModule {}
