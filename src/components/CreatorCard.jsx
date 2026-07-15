import { Link } from 'react-router-dom'

function CreatorCard({ creator }) {
  return (
    <div
      style={{
        border: '1px solid white',
        padding: '20px',
        marginBottom: '20px'
      }}
    >
      <h2>{creator.name}</h2>

      <p>{creator.description}</p>

      <a
        href={creator.url}
        target="_blank"
        rel="noreferrer"
      >
        Visit Channel
      </a>

      <br />
      <br />

      <Link to={`/creators/${creator.id}`}>
        View Details
      </Link>

      {' | '}

      <Link to={`/creators/${creator.id}/edit`}>
        Edit
      </Link>
    </div>
  )
}

export default CreatorCard