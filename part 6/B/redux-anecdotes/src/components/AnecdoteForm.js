import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createAnecdoteHelper = (event) => {
        event.preventDefault()
        dispatch(setNotification('New anecdote created!'))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 4000)

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