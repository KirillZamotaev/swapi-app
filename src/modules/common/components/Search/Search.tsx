import React, { useState, useEffect, ChangeEvent } from 'react'
import { TextField, Box } from '@mui/material'

import { useDebouncedValue } from 'modules/common/hooks/useDebouncedValue'

interface SearchProps {
  onSearch: (searchTerm: string) => void
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebouncedValue(searchTerm, 500)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    onSearch(debouncedSearch)
  }, [debouncedSearch])

  return (
    <Box my={3}>
      <TextField
        fullWidth
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
      />
    </Box>
  )
}
