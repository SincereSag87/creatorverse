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
      <p>Discover some of the best programming creators on YouTube.</p>

      {creators.length === 0 ? (
        <p>No creators have been added yet.</p>
      ) : (
        <div className="creator-grid">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ShowCreators
