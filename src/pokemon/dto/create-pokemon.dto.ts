import { IsPositive, IsString, IsInt, MinLength, Min } from 'class-validator';

export class CreatePokemonDto {
  @IsPositive()
  @IsInt()
  @Min(1)
  no: number;

  @IsString()
  @MinLength(1)
  name: string;
}
