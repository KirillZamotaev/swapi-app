import { TextField, Button } from '@mui/material'
import { IPeople } from 'swapi-ts'

interface PropsFormProps {
  data: IPeople
  handleSubmit: (e: React.FormEvent) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PropsForm: React.FC<PropsFormProps> = ({
  data,
  handleSubmit,
  handleChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={data.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="height"
        label="Height"
        value={data.height}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="mass"
        label="Mass"
        value={data.mass}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="hair_color"
        label="Hair Color"
        value={data.hair_color}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="skin_color"
        label="Skin Color"
        value={data.skin_color}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="eye_color"
        label="Eye Color"
        value={data.eye_color}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="birth_year"
        label="Birth Year"
        value={data.birth_year}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="gender"
        label="Gender"
        value={data.gender}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </form>
  )
}
