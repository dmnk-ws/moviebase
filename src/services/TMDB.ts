import axios from 'axios';
import MediaClient, {
  Movie,
  Show,
  QueryParams,
  PaginatedResponse,
} from './MediaClient';

interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  video: boolean;
}

export interface TMDBShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  origin_country: string[];
}

interface TMDBConfiguration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_IMAGE_SIZE = 'w500';

class TMDB extends MediaClient {
  private static instance: TMDB;
  private readonly accessToken: string | undefined;
  private readonly configPromise: Promise<void>;
  private imageBaseUrl: string = '';

  private constructor() {
    super();
    this.accessToken = process.env.REACT_APP_MOVIE_DB_ACCESS_TOKEN;

    if (!this.accessToken) {
      console.warn(
        'REACT_APP_MOVIE_DB_ACCESS_TOKEN is not set in environment variables'
      );
    }

    this.configPromise = this.fetchConfiguration();
  }

  public static getInstance(): TMDB {
    if (!TMDB.instance) TMDB.instance = new TMDB();

    return TMDB.instance;
  }

  private async fetchConfiguration(): Promise<void> {
    try {
      const response = await axios.get<TMDBConfiguration>(`${BASE_URL}/configuration`, {
        headers: this.getHeaders(),
      });
      this.imageBaseUrl = response.data.images.secure_base_url;
    } catch (error) {
      console.error('Error fetching TMDB configuration:', error);
      this.imageBaseUrl = 'https://image.tmdb.org/t/p/';
    }
  }

  private async buildImageUrl(
    path: string | null,
    size: string = DEFAULT_IMAGE_SIZE
  ): Promise<string | null> {
    if (!path) return null;

    await this.configPromise;

    return `${this.imageBaseUrl}${size}${path}`;
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  public async getPopularMovies(params: QueryParams = {}): Promise<Movie[]> {
    const { page = 1, language = 'en-US' } = params;

    try {
      const response = await axios.get<PaginatedResponse<TMDBMovie>>(
        `${BASE_URL}/movie/popular`,
        {
          headers: this.getHeaders(),
          params: {
            language,
            page,
          },
        }
      );

      return Promise.all(
        response.data.results.map(async (movie) => ({
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          overview: movie.overview,
          imagePath: await this.buildImageUrl(movie.poster_path),
        }))
      );
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }

  public async getPopularShows(params: QueryParams = {}): Promise<Show[]> {
    const { page = 1, language = 'en-US' } = params;

    try {
      const response = await axios.get<PaginatedResponse<TMDBShow>>(
        `${BASE_URL}/tv/popular`,
        {
          headers: this.getHeaders(),
          params: {
            language,
            page,
          },
        }
      );

      return Promise.all(
        response.data.results.map(async (show) => ({
          id: show.id,
          name: show.name,
          description: show.overview,
          overview: show.overview,
          imagePath: await this.buildImageUrl(show.poster_path),
        }))
      );
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
      throw error;
    }
  }

  public async searchMovies(
    query: string,
    params: QueryParams = {}
  ): Promise<PaginatedResponse<Movie>> {
    const { page = 1, language = 'en-US' } = params;

    try {
      const response = await axios.get<PaginatedResponse<Movie>>(
        `${BASE_URL}/search/movie`,
        {
          headers: this.getHeaders(),
          params: {
            query,
            language,
            page,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }

  public async searchShows(
    query: string,
    params: QueryParams = {}
  ): Promise<PaginatedResponse<Show>> {
    const { page = 1, language = 'en-US' } = params;

    try {
      const response = await axios.get<PaginatedResponse<Show>>(
        `${BASE_URL}/search/tv`,
        {
          headers: this.getHeaders(),
          params: {
            query,
            language,
            page,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error searching TV shows:', error);
      throw error;
    }
  }

  public async getMovieDetails(id: string | number): Promise<Movie> {
    try {
      const response = await axios.get<Movie>(`${BASE_URL}/movie/${id}`, {
        headers: this.getHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching movie details for ID ${id}:`, error);
      throw error;
    }
  }

  public async getShowDetails(id: string | number): Promise<Show> {
    try {
      const response = await axios.get<Show>(`${BASE_URL}/tv/${id}`, {
        headers: this.getHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching TV show details for ID ${id}:`, error);
      throw error;
    }
  }
}

export default TMDB;
