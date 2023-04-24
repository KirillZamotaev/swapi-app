import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'

import { useAppDispatch, useAppSelector } from 'store'
import { fetchPersons, searchPersons } from 'modules/persons'
import { Search } from 'modules/common/components/Search'
import { View } from 'modules/common/components/View'

export const PersonsList: React.FC = () => {
  const navigate = useNavigate()

  const { persons, isLoading } = useAppSelector((store) => store.persons)

  const dispatch = useAppDispatch()

  const handleCardClick = (name: string) => {
    navigate(`/person/${name}`)
  }

  useEffect(() => {
    dispatch(fetchPersons())
  }, [])

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      spacing={1}
      sx={{
        width: '100%'
      }}
    >
      <Grid item>
        <Search onSearch={(request) => dispatch(searchPersons(request))} />
      </Grid>
      <Grid item>
        <View
          data={persons}
          isLoading={isLoading}
          handleCardClick={handleCardClick}
        />
      </Grid>
    </Grid>
  )
}
