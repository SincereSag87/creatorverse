import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../client'

function ViewCreator() {
  const { id } = useParams()

  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', Number(id))
        .single()

      if (error) {
        console.error('Unable to load creator:', error)
        setErrorMessage(`Unable to load creator: ${error.message}`)
      } else {
        setCreator(data)
      }

      setLoading(false)
    }

    fetchCreator()
  }, [id])

  if (loading) {
    return <p>Loading creator...</p>
  }

  if (errorMessage) {
    return <p role="alert">{errorMessage}</p>
  }

  if (!creator) {
    return <p>Creator not found.</p>
  }

  return (
    <section className="creator-details">
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="creator-details-image"
        />
      )}

      <h1>{creator.name}</h1>

      <p className="creator-details-description">
        {creator.description}
      </p>

      <a
        href={creator.url}
        target="_blank"
        rel="noreferrer"
        className="details-link"
      >
        Visit Channel
      </a>

      <div className="details-actions">
        <Link to={`/creators/${creator.id}/edit`}>
          Edit Creator
        </Link>

        <Link to="/">
          ← Back to Creators
        </Link>
      </div>
    </section>
  )
}

export default ViewCreator