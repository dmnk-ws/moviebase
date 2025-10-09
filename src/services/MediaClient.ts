export interface QueryParams {
  page?: number;
  language?: string;
  timeWindow?: 'day' | 'week';
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  overview: string;
  imagePath: string | null;
}

export interface Show {
  id: number;
  name: string;
  description: string;
  overview: string;
  imagePath: string | null;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/**
 * Abstract class for media (movies and TV shows) API services
 * Extend this class to create service implementations for different APIs
 */
export default abstract class MediaClient {
  /**
   * Fetch trending movies
   * @param params - Query parameters (page, language, timeWindow)
   * @returns Response with results array and metadata
   */
  public abstract getTrendingMovies(params?: QueryParams): Promise<Movie[]>;

  /**
   * Fetch trending TV shows
   * @param params - Query parameters (page, language, timeWindow)
   * @returns Response with results array and metadata
   */
  public abstract getTrendingShows(params?: QueryParams): Promise<Show[]>;

  /**
   * Search for movies
   * @param query - Search query
   * @param params - Additional query parameters
   * @returns Response with results array and metadata
   */
  public abstract searchMovies(
    query: string,
    params?: QueryParams
  ): Promise<PaginatedResponse<Movie>>;

  /**
   * Search for TV shows
   * @param query - Search query
   * @param params - Additional query parameters
   * @returns Response with results array and metadata
   */
  public abstract searchShows(
    query: string,
    params?: QueryParams
  ): Promise<PaginatedResponse<Show>>;

  /**
   * Get movie details by ID
   * @param id - Movie ID
   * @returns Movie details
   */
  public abstract getMovieDetails(id: string | number): Promise<Movie>;

  /**
   * Get TV show details by ID
   * @param id - TV show ID
   * @returns TV show details
   */
  public abstract getShowDetails(id: string | number): Promise<Show>;
}
