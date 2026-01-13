import { BadRequestException, Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/httpAdapters/axios.adapter';

export interface PokemonSeed {
  name: string;
  no: number;
}

@Injectable()
export class SeedService {
  constructor(
    // Para que sepa que debe inyectar el modelo y se le pasa el nomrbe
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const pokemons: PokemonSeed[] = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      return { name, no };
    });
    try {
      await this.pokemonModel.deleteMany({});
      await this.pokemonModel.insertMany(pokemons);
    } catch (err) {
      throw new BadRequestException(err);
    }

    return pokemons;
  }
}
