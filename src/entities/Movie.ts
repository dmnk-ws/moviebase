import { Genre } from './Genre';

export interface Movie {
  id: number;
  title: string;
  description: string;
  overview: string;
  imagePath: string | null;
  backdropPath?: string | null;
  releaseDate?: string;
  genres?: Genre[];
  runtime?: number;
  voteAverage?: number;
}
