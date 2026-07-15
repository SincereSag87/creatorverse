import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'

function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)

  useEffect(() => {
    async function loadCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error(error)
      } else {
        setCreator(data)
      }
    }

    loadCreator()
  }, [id])

  if (!creator) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{creator.name}</h1>

      <p>{creator.description}</p>

      <a
        href={creator.url}
        target="_blank"
        rel="noreferrer"
      >
        Visit Channel
      </a>

      <br /><br />

      <Link to="/">← Back to Creators</Link>
    </div>
  )
}

export default ViewCreator