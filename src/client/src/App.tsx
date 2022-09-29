import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Layout, Logo } from './components/components'

export const App = () => {
  return (
    <Layout aria-label="container">
      <Logo />
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Layout>
  )
}
