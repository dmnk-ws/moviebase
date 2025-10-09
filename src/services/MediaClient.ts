import { Movie } from '../entities/Movie';
import { Show } from '../entities/Show';
import { Genre } from '../entities/Genre';

export interface QueryParams {
  page?: number;
  language?: string;
  timeWindow?: 'day' | 'week';
  genre?: number;
}

/**
 * Abstract class for media (movies and TV shows) API services
 * Extend this class to create service implementations for different APIs
 */
export default abstract class MediaClient {
  /**
   * Fetch trending movies
   * @param params - Query parameters (page, language, timeWindow)
   * @returns Response with Movie[]
   */
  public abstract getTrendingMovies(params?: QueryParams): Promise<Movie[]>;

  /**
   * Fetch trending TV shows
   * @param params - Query parameters (page, language, timeWindow)
   * @returns Response with Show[]
   */
  public abstract getTrendingShows(params?: QueryParams): Promise<Show[]>;

  /**
   * Fetch movie genres
   * @param params - Query parameters
   * @return Response with Genre[] of type 'movie'
   */
  public abstract getMovieGenres(params?: QueryParams): Promise<Genre[]>;

  /**
   * Fetch show genres
   * @param params - Query parameters
   * @return Response with Genre[] of type 'show'
   */
  public abstract getShowGenres(params?: QueryParams): Promise<Genre[]>;

  /**
   * Fetch movies by genre ID
   * @param params - Query parameters including genre ID
   * @returns Response with Movie[]
   */
  public abstract getMoviesByGenreId(params?: QueryParams): Promise<Movie[]>;

  /**
   * Fetch shows by genre ID
   * @param params - Query parameters including genre ID
   * @returns Response with Show[]
   */
  public abstract getShowsByGenreId(params?: QueryParams): Promise<Show[]>;
}
