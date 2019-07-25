import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartController } from './shopping-cart.controller';

describe('ShoppingCart Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ShoppingCartController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ShoppingCartController = module.get<ShoppingCartController>(ShoppingCartController);
    expect(controller).toBeDefined();
  });
});
