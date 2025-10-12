import { Genre } from './Genre';

export interface Show {
  id: number;
  name: string;
  imagePath: string | null;
  overview?: string;
  backdropPath?: string | null;
  firstAirDate?: string;
  genres?: Genre[];
  createdBy?: Array<{ id: number; name: string }>;
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  voteAverage?: number;
}
