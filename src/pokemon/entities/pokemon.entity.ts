import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Entidades hacen relación a la tabla de la base de datos
// Cada instancia de la clase es un registro de la base de datos

// Le decimos que este es un esquema de la base de datos
@Schema()
export class Pokemon extends Document {
  // id: string; Mongo coloca un id automáticamente
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

// Se exportta el esquema
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
