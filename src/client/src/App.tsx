import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Layout, Logo } from './components/components'

export const App = () => {
  return (
    <Layout>
      <Logo />
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Layout>
  )
}
