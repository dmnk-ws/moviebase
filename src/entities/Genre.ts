import { GenreType } from '../enums/GenreType';

export interface Genre {
  id: number;
  name: string;
  type: GenreType;
}
