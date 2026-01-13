import { Controller, Get } from '@nestjs/common';
import { PokemonSeed, SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed(): Promise<PokemonSeed[]> {
    return this.seedService.executeSeed();
  }
}
