import { Genre } from './Genre';

export interface Movie {
  id: number;
  title: string;
  imagePath: string | null;
  overview?: string;
  backdropPath?: string | null;
  releaseDate?: string;
  genres?: Genre[];
  runtime?: number;
  voteAverage?: number;
}
