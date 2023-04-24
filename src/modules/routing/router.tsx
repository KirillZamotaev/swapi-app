import { Routes, Route } from 'react-router-dom'

import { PersonsList, PersonDetail } from 'modules/routing/pages'

export const Router = () => (
  <Routes>
    <Route index element={<PersonsList />} />
    <Route path="/person/:name" element={<PersonDetail />} />
    <Route path="*" element={<p>Nothing here: 404!</p>} />
  </Routes>
)
