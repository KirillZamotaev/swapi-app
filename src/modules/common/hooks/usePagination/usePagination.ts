import { useState, useMemo } from 'react';

export function usePagination<T>(data: T[] | undefined = []) {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const items = useMemo(
    () => data.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [data, itemsPerPage, page]
  );

  return {
    page,
    setPage,
    items,
    itemsPerPage,
    setItemsPerPage,
  };
}
