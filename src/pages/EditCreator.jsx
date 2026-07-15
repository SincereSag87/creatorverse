import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  })

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
        console.error('Load error:', error)
        setErrorMessage(`Unable to load creator: ${error.message}`)
      } else {
        setCreator({
          name: data.name ?? '',
          url: data.url ?? '',
          description: data.description ?? '',
          imageURL: data.imageURL ?? ''
        })
      }

      setLoading(false)
    }

    fetchCreator()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target

    setCreator((currentCreator) => ({
      ...currentCreator,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    const { data, error } = await supabase
      .from('creators')
      .update(creator)
      .eq('id', Number(id))
      .select()

    console.log('Updated data:', data)
    console.log('Update error:', error)

    if (error) {
      console.error('Update error:', error)
      setErrorMessage(`Unable to update creator: ${error.message}`)
      return
    }

    if (!data || data.length === 0) {
      setErrorMessage('No creator record was updated.')
      return
    }

    navigate(`/creators/${id}`)
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${creator.name}?`
    )

    if (!confirmed) {
      return
    }

    setErrorMessage('')

    const { data, error } = await supabase
      .from('creators')
      .delete()
      .eq('id', Number(id))
      .select()

    console.log('Deleted data:', data)
    console.log('Delete error:', error)

    if (error) {
      console.error('Delete error:', error)
      setErrorMessage(`Unable to delete creator: ${error.message}`)
      return
    }

    if (!data || data.length === 0) {
      setErrorMessage(
        'No creator record was deleted. Check the Supabase DELETE policy.'
      )
      return
    }

    navigate('/')
  }

  if (loading) {
    return <p>Loading creator...</p>
  }

  return (
    <section>
      <h1>Edit Creator</h1>

      {errorMessage && (
        <p role="alert">
          {errorMessage}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />

          <input
            id="name"
            type="text"
            name="name"
            value={creator.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="url">Channel URL</label>
          <br />

          <input
            id="url"
            type="url"
            name="url"
            value={creator.url}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="description">Description</label>
          <br />

          <textarea
            id="description"
            name="description"
            value={creator.description}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="imageURL">Image URL</label>
          <br />

          <input
            id="imageURL"
            type="url"
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          Save Changes
        </button>

        {' '}

        <Link to={`/creators/${id}`}>
          Cancel
        </Link>

        <br />
        <br />

        <button
          type="button"
          onClick={handleDelete}
        >
          Delete Creator
        </button>
      </form>
    </section>
  )
}

export default EditCreator