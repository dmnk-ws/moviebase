import axios from 'axios';
import MediaClient, { QueryParams, PaginatedSearchResults } from './MediaClient';
import { Movie } from '../entities/Movie';
import { Show } from '../entities/Show';
import { Genre } from '../entities/Genre';
import { Keyword } from '../entities/Keyword';
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
  TMDBKeyword,
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
          overview: movie.overview,
          imagePath: await this.buildImageUrl(movie.poster_path),
          backdropPath: await this.buildImageUrl(
            movie.backdrop_path,
            DEFAULT_BACKDROP_SIZE
          ),
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
          overview: show.overview,
          imagePath: await this.buildImageUrl(show.poster_path),
          backdropPath: await this.buildImageUrl(
            show.backdrop_path,
            DEFAULT_BACKDROP_SIZE
          ),
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

  public async searchKeyword(
    params: QueryParams = {}
  ): Promise<PaginatedSearchResults<Keyword>> {
    const { query, page = 1 } = params;

    if (!query) throw new Error('Search query is required');

    try {
      const response = await axios.get<PaginatedResponse<TMDBKeyword>>(
        `${BASE_URL}/search/keyword`,
        {
          headers: this.getHeaders(),
          params: {
            query,
            page,
          },
        }
      );

      const keywords: Keyword[] = response.data.results.map((keyword) => ({
        id: keyword.id,
        name: keyword.name,
      }));

      return {
        results: keywords,
        page: response.data.page,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
      };
    } catch (error) {
      console.error('Error searching keywords:', error);
      throw error;
    }
  }

  public async searchMovieByKeyword(
    params: QueryParams = {}
  ): Promise<PaginatedSearchResults<Movie>> {
    const { query, page = 1, language = 'en-US' } = params;

    if (!query) throw new Error('Search query is required');

    try {
      const response = await axios.get<PaginatedResponse<TMDBMovie>>(
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

      const movies = await Promise.all(
        response.data.results.map(async (movie) => ({
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          overview: movie.overview,
          imagePath: await this.buildImageUrl(movie.poster_path),
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
        }))
      );

      return {
        results: movies,
        page: response.data.page,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
      };
    } catch (error) {
      console.error('Error searching movies by keyword:', error);
      throw error;
    }
  }

  public async searchShowByKeyword(
    params: QueryParams = {}
  ): Promise<PaginatedSearchResults<Show>> {
    const { query, page = 1, language = 'en-US' } = params;

    if (!query) throw new Error('Search query is required');

    try {
      const response = await axios.get<PaginatedResponse<TMDBShow>>(
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

      const shows = await Promise.all(
        response.data.results.map(async (show) => ({
          id: show.id,
          name: show.name,
          description: show.overview,
          overview: show.overview,
          imagePath: await this.buildImageUrl(show.poster_path),
          firstAirDate: show.first_air_date,
          voteAverage: show.vote_average,
        }))
      );

      return {
        results: shows,
        page: response.data.page,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
      };
    } catch (error) {
      console.error('Error searching shows by keyword:', error);
      throw error;
    }
  }

  public async getTopRatedMovies(params: QueryParams = {}): Promise<Movie[]> {
    const { page, language } = params;

    try {
      const response = await axios.get<PaginatedResponse<TMDBMovie>>(
        `${BASE_URL}/movie/top_rated`,
        {
          headers: this.getHeaders(),
          params: {
            page,
            language,
          },
        }
      );

      return Promise.all(
        response.data.results.map(async (movie) => ({
          id: movie.id,
          title: movie.title,
          imagePath: await this.buildImageUrl(movie.poster_path),
          date: movie.release_date,
          voteAverage: movie.vote_average,
          releaseDate: movie.release_date,
        }))
      );
    } catch (error) {
      console.error('Error fetching top-rated movies', error);
      throw error;
    }
  }

  public async getTopRatedShows(params: QueryParams = {}): Promise<Show[]> {
    const { page, language } = params;

    try {
      const response = await axios.get<PaginatedResponse<TMDBShow>>(
        `${BASE_URL}/tv/top_rated`,
        {
          headers: this.getHeaders(),
          params: {
            page,
            language,
          },
        }
      );

      return Promise.all(
        response.data.results.map(async (show) => ({
          id: show.id,
          name: show.name,
          imagePath: await this.buildImageUrl(show.poster_path),
          firstAirDate: show.first_air_date,
          voteAverage: show.vote_average,
        }))
      );
    } catch (error) {
      console.error('Error fetching top-rated shows', error);
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
