import { useEffect, useState } from 'react'
import { supabase } from '../client'
import CreatorCard from '../components/CreatorCard'

function ShowCreators() {
  const [creators, setCreators] = useState([])

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
          <CreatorCard
            key={creator.id}
            creator={creator}
          />
        ))
      )}
    </div>
  )
}

export default ShowCreators
