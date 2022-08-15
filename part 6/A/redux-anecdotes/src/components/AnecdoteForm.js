import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createAnecdoteHelper = (event) => {
        event.preventDefault()
        dispatch(createAnecdote(event.target.create.value))
      }

    return (
        <div>
            <h4>create new</h4>
            <form onSubmit={ createAnecdoteHelper }>
                <input name='create'/>
                <button type='submit'>create</button>
            </form>
        </div>
    )

}


export default AnecdoteForm