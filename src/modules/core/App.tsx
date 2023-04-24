import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'

import { Router } from 'modules/routing'
import { Layout } from 'modules/common/components/Layout'
import store from 'store'
import theme from 'theme'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}
