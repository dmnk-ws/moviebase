import axios from 'axios';
import MediaClient, { QueryParams } from './MediaClient';
import { Movie } from '../entities/Movie';
import { Show } from '../entities/Show';
import { Genre } from '../entities/Genre';
import { GenreType } from '../enums/GenreType';
import {
  TMDBMovie,
  TMDBMovieDetails,
  TMDBShow,
  TMDBShowDetails,
  TMDBConfiguration,
  PaginatedResponse,
  TMDBGenres,
  TMDBVideos,
} from './interfaces/tmdb';
import { Videos } from '../entities/Videos';

const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_IMAGE_SIZE = 'w500';
const DEFAULT_BACKDROP_SIZE = 'w1280';

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

  public async getMovieById(id: number): Promise<Movie> {
    try {
      const response = await axios.get<TMDBMovieDetails>(`${BASE_URL}/movie/${id}`, {
        headers: this.getHeaders(),
      });

      const movie = response.data;

      return {
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        overview: movie.overview,
        imagePath: await this.buildImageUrl(movie.poster_path),
        backdropPath: await this.buildImageUrl(
          movie.backdrop_path,
          DEFAULT_BACKDROP_SIZE
        ),
        releaseDate: movie.release_date,
        genres: movie.genres,
        runtime: movie.runtime,
        voteAverage: movie.vote_average,
      };
    } catch (error) {
      console.error('Error fetching movie by id:', error);
      throw error;
    }
  }

  public async getShowById(id: number): Promise<Show> {
    try {
      const response = await axios.get<TMDBShowDetails>(`${BASE_URL}/tv/${id}`, {
        headers: this.getHeaders(),
      });

      const show = response.data;

      return {
        id: show.id,
        name: show.name,
        description: show.overview,
        overview: show.overview,
        imagePath: await this.buildImageUrl(show.poster_path),
        backdropPath: await this.buildImageUrl(
          show.backdrop_path,
          DEFAULT_BACKDROP_SIZE
        ),
        firstAirDate: show.first_air_date,
        genres: show.genres,
        createdBy: show.created_by.map((creator) => ({
          id: creator.id,
          name: creator.name,
        })),
        numberOfSeasons: show.number_of_seasons,
        numberOfEpisodes: show.number_of_episodes,
        voteAverage: show.vote_average,
      };
    } catch (error) {
      console.error('Error fetching show by id:', error);
      throw error;
    }
  }

  public async getMovieVideosById(id: number): Promise<Videos> {
    try {
      const response = await axios.get<TMDBVideos>(`${BASE_URL}/movie/${id}/videos`, {
        headers: this.getHeaders(),
      });

      return {
        id: response.data.id,
        results: response.data.results.map((video) => ({
          id: video.id,
          key: video.key,
          name: video.name,
          site: video.site,
          type: video.type,
        })),
      };
    } catch (error) {
      console.error('Error fetching movie videos by id', id);
      throw error;
    }
  }

  public async getShowVideosById(id: number): Promise<Videos> {
    try {
      const response = await axios.get<TMDBVideos>(`${BASE_URL}/tv/${id}/videos`, {
        headers: this.getHeaders(),
      });

      return {
        id: response.data.id,
        results: response.data.results.map((video) => ({
          id: video.id,
          key: video.key,
          name: video.name,
          site: video.site,
          type: video.type,
        })),
      };
    } catch (error) {
      console.error('Error fetching movie videos by id', id);
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
