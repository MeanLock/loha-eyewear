import { Test, TestingModule } from '@nestjs/testing';
import { ProductStatusesService } from './product-statuses.service';

describe('ProductStatusesService', () => {
  let service: ProductStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductStatusesService],
    }).compile();

    service = module.get<ProductStatusesService>(ProductStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
