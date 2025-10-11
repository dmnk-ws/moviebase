import { TrendingMovies, TrendingShows, Layout, SearchHero } from './index';

const Feed = () => {
  return (
    <Layout>
      <SearchHero />
      <TrendingMovies />
      <TrendingShows />
    </Layout>
  );
};

export default Feed;
