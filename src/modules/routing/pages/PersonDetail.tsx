import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Box, Typography, CircularProgress } from '@mui/material'

import { usePerson } from 'modules/persons/hooks/usePerson'
import { PropsForm, PropsView } from 'modules/persons/components/Props'

type RouteParams = Record<string, string | undefined>

export const PersonDetail: React.FC = () => {
  const { name } = useParams<RouteParams>()
  const { data, setData, saveData, isLoading } = usePerson(name)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (data != null) {
      setData({ ...data, [name]: value })
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (data) {
      saveData(data)
      setIsEditMode(false)
    }
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }

  if (!data) {
    return <Box>No data </Box>
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Person Detail</Typography>
        <Button variant="contained" color="primary" onClick={toggleEditMode}>
          {isEditMode ? 'Cancel' : 'Edit'}
        </Button>
      </Box>

      {isEditMode && (
        <PropsForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          data={data}
        />
      )}
      {!isEditMode && <PropsView data={data} />}
    </Box>
  )
}
