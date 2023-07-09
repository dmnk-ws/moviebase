import { Stack } from "@mui/material";

import { MovieCard } from './'

const Movies = ({movies}) => {
    if (!movies?.length) return 'Loading...';

    return (
        <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="start"
            gap={2}
            sx={{display: 'flex', justifyContent: {xs: 'center'}, alignItems: {xs: 'center'}}}
        >
            {movies.map((movie, index) => (
                <MovieCard 
                    key={index}
                    movie={movie} 
                />
            ))}
        </Stack>
    )
}

export default Movies