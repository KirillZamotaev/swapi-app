import React from 'react'
import { Container } from '@mui/material'

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return <Container maxWidth="lg">{children}</Container>
}
