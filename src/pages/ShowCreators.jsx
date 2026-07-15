import { useEffect, useState } from 'react'
import { supabase } from '../client'

function ShowCreators() {
  const [creators, setCreators] =useState([])

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')

      if (error) {
        console.error(error)
      } else {
        setCreators(data)
      }
    }

    fetchCreators()
  }, [])

  return (
    <div>
      <h2>All Creators</h2>

      {creators.length === 0 ? (
        <p>No creators have been added yet.</p>
      ) : (
        creators.map((creator) => (
          <div key={creator.id}>
            <h3>{creator.name}</h3>
            <p>{creator.description}</p>

            <a
              href={creator.url}
              target="_blank"
              rel="noreferrer"
            >
              Visit Channel
            </a>

            <hr />
          </div>
        ))
      )}
    </div>
  )
}

export default ShowCreators