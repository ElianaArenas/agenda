import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css'

const IndexPage = lazy(() => import('./pages/Index'));
const ListadoTotal = lazy(() => import('./pages/ListadoTotal'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage/>} />
      <Route path="/listado-total" element={<ListadoTotal/>} />
    </Routes>
  )
}

export default App
