import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { MongoServerError } from 'mongodb';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  constructor(
    // Para que sepa que debe inyectar el modelo y se le pasa el nomrbe
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit') as number;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (err: unknown) {
      this.handleExceptions(err);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .limit(limit) // Limite de registros
      .skip(offset) // Desplazamiento de registros
      .sort({ no: 1 }) // Orden de registros: asc (1) o desc (-1)
      .select(['-__v', '-_id']); // "-"" + la key que quiero eliminar
  }

  async findOne(term: string) {
    // Hay que buscar por mongo id, nombre y numero
    // Variabe de tipo entity
    let pokemon: Pokemon | null = null;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    } else if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    } else {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or number ${term} not found`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto?.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      await pokemon.updateOne(updatePokemonDto);
      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto,
      } as Pokemon;
    } catch (err: unknown) {
      this.handleExceptions(err);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      return new BadRequestException(`Pokemon with id ${id} not found`);
    }
    return { deletedCount };
  }

  private handleExceptions(err: unknown) {
    if (err instanceof MongoServerError) {
      if (err.code === 11000)
        throw new ConflictException(
          `Pokemon already exists on database: ${JSON.stringify(err.keyValue)}`,
        );
    }
    throw new InternalServerErrorException(
      `Error updating pokemon (check server logs): ${JSON.stringify(err)}`,
    );
  }
}
