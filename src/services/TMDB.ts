import axios from 'axios';
import MediaClient, { QueryParams } from './MediaClient';
import { Movie } from '../entities/Movie';
import { Show } from '../entities/Show';
import { Genre } from '../entities/Genre';
import { GenreType } from '../enums/GenreType';

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

interface TMDBShow {
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

interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface TMDBGenres {
  genres: {
    id: number;
    name: string;
  }[];
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
    this.accessToken = import.meta.env.VITE_MOVIE_DB_ACCESS_TOKEN;

    if (!this.accessToken) {
      console.warn('VITE_MOVIE_DB_ACCESS_TOKEN is not set in environment variables');
    }

    this.configPromise = this.fetchConfiguration();
  }

  public static getInstance(): TMDB {
    if (!TMDB.instance) TMDB.instance = new TMDB();

    return TMDB.instance;
  }

  public async getTrendingMovies(params: QueryParams = {}): Promise<Movie[]> {
    const { page = 1, language = 'en-US', timeWindow = 'day' } = params;

    try {
      const response = await axios.get<PaginatedResponse<TMDBMovie>>(
        `${BASE_URL}/trending/movie/${timeWindow}`,
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
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  }

  public async getTrendingShows(params: QueryParams = {}): Promise<Show[]> {
    const { page = 1, language = 'en-US', timeWindow = 'day' } = params;

    try {
      const response = await axios.get<PaginatedResponse<TMDBShow>>(
        `${BASE_URL}/trending/tv/${timeWindow}`,
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
      console.error('Error fetching trending TV shows:', error);
      throw error;
    }
  }

  public async getMovieGenres(): Promise<Genre[]> {
    try {
      const response = await axios.get<TMDBGenres>(`${BASE_URL}/genre/movie/list`, {
        headers: this.getHeaders(),
      });

      return response.data.genres.map((genre) => ({
        ...genre,
        type: GenreType.MOVIE,
      }));
    } catch (error) {
      console.error('Error fetching movie genres:', error);
      throw error;
    }
  }

  public async getShowGenres(): Promise<Genre[]> {
    try {
      const response = await axios.get<TMDBGenres>(`${BASE_URL}/genre/tv/list`, {
        headers: this.getHeaders(),
      });

      return response.data.genres.map((genre) => ({
        ...genre,
        type: GenreType.SHOW,
      }));
    } catch (error) {
      console.error('Error fetching show genres:', error);
      throw error;
    }
  }

  public async getMoviesByGenreId(params: QueryParams = {}): Promise<Movie[]> {
    const { page = 1, language = 'en-US', genre } = params;

    try {
      const response = await axios.get<PaginatedResponse<TMDBMovie>>(
        `${BASE_URL}/discover/movie`,
        {
          headers: this.getHeaders(),
          params: {
            page,
            language,
            with_genres: genre,
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
      console.error('Error fetching movies by genreId:', error);
      throw error;
    }
  }

  public async getShowsByGenreId(params: QueryParams = {}): Promise<Show[]> {
    const { page = 1, language = 'en-US', genre } = params;

    try {
      const response = await axios.get<PaginatedResponse<TMDBShow>>(
        `${BASE_URL}/discover/tv`,
        {
          headers: this.getHeaders(),
          params: {
            page,
            language,
            with_genres: genre,
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
      console.error('Error fetching shows by genreId:', error);
      throw error;
    }
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
}

export default TMDB;
