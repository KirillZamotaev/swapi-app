import { Box, Typography } from '@mui/material'
import { IPeople } from 'swapi-ts'

export const PropsView = ({ data }: { data: IPeople }) => {
  return (
    <Box>
      <Typography>Name: {data.name}</Typography>
      <Typography>Height: {data.height}</Typography>
      <Typography>Mass: {data.mass}</Typography>
      <Typography>Hair Color: {data.hair_color}</Typography>
      <Typography>Skin Color: {data.skin_color}</Typography>
      <Typography>Eye Color: {data.eye_color}</Typography>
      <Typography>Birth Year: {data.birth_year}</Typography>
      <Typography>Gender: {data.gender}</Typography>
    </Box>
  )
}
