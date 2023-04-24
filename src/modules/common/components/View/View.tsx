import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material'
import { FC } from 'react'
import { IPeople } from 'swapi-ts'

import { usePagination } from 'modules/common/hooks/usePagination'

import { Pagination } from '../Pagination'

interface ViewProps {
  data: IPeople[]
  isLoading: boolean
  handleCardClick: (name: string) => void
}

export const View: FC<ViewProps> = ({ data, isLoading, handleCardClick }) => {
  const { items, page, setPage, itemsPerPage } = usePagination<IPeople>(data)

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }

  if (!data) {
    return <Box>No data</Box>
  }

  return (
    <Grid direction="column" container spacing={2}>
      <Grid item>
        <Grid container spacing={2}>
          {items.map((person) => (
            <Grid key={person.name} item xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(person.name)}>
                  <CardContent>
                    <Typography variant="h6">{person.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Grid>
    </Grid>
  )
}
