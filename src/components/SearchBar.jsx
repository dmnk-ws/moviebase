import { Search } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'

const SearchBar = () => {
    return (
        <IconButton 
            type="submit" 
            sx={{ color: '#FFFFFF' }}
        >
            <Search 
                fontSize="large" 
            />
        </IconButton>
    )
}

export default SearchBar