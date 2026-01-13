import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]), // Definición del esquema
    CommonModule,
  ],
  exports: [MongooseModule], // Exportamos el módulo de Mongoose
})
export class PokemonModule {}
