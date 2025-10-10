import { Movie } from '../entities/Movie';
import { Show } from '../entities/Show';
import { Genre } from '../entities/Genre';
import { Videos } from '../entities/Videos';

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

  /**
   * Fetch movie by id
   * @param id
   * @returns Response with Movie
   */
  public abstract getMovieById(id: number): Promise<Movie>;

  /**
   * Fetch show by id
   * @param id
   * @returns Response with Show
   */
  public abstract getShowById(id: number): Promise<Show>;

  /**
   * Search for movie videos by id
   * @param id - Movie id
   * @returns Response with Videos results
   */
  public abstract getMovieVideosById(id: number): Promise<Videos>;

  /**
   * Search for show videos by id
   * @param id - Show id
   * @returns Response with Videos results
   */
  public abstract getShowVideosById(id: number): Promise<Videos>;
}
