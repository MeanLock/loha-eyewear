import { Test, TestingModule } from '@nestjs/testing';
import { ProductStatusesController } from './product-statuses.controller';

describe('ProductStatusesController', () => {
  let controller: ProductStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductStatusesController],
    }).compile();

    controller = module.get<ProductStatusesController>(ProductStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
