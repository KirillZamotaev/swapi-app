import { Pagination as MuiPagination } from '@mui/material'
interface PaginationProps {
  count: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  count,
  currentPage,
  onPageChange
}) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value)
  }

  return (
    <MuiPagination
      count={count}
      page={currentPage}
      onChange={handleChange}
      color="primary"
      shape="rounded"
      showFirstButton
      showLastButton
    />
  )
}
