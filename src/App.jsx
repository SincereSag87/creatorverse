import { Link, useRoutes } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import './App.css'

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <ShowCreators />
    },
    {
      path: '/creators/new',
      element: <AddCreator />
    },
    {
      path: '/creators/:id',
      element: <ViewCreator />
    },
    {
      path: '/creators/:id/edit',
      element: <EditCreator />
    }
  ])

  return (
    <div className="app">
      <header className="header">

        <div className="logo-section">
          <Link to="/" className="site-title">
            🌟 Creatorverse
          </Link>
        </div>

        <nav className="navbar">
          <Link to="/">All Creators</Link>
          <Link to="/creators/new">Add Creator</Link>
        </nav>

      </header>

      <main>
        {routes}
      </main>
    </div>
  )
}

export default App