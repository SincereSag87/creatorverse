import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function AddCreator() {
  const navigate = useNavigate()

  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  })

  const handleChange = (e) => {
    setCreator({
      ...creator,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from('creators')
      .insert([creator])

    if (error) {
      console.error(error)
      alert('Unable to add creator.')
    } else {
      alert('Creator added successfully!')
      navigate('/')
    }
  }

  return (
    <div>
      <h1>Add Creator</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={creator.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>YouTube URL</label>
          <br />
          <input
            type="text"
            name="url"
            value={creator.url}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            name="description"
            value={creator.description}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Image URL</label>
          <br />
          <input
            type="text"
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          Add Creator
        </button>
      </form>
    </div>
  )
}

export default AddCreator