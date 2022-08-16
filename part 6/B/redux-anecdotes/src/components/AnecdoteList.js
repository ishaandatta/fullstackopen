import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const filter = useSelector(state => String(state.filter[0]))
    const anecdotesList = useSelector(state => {
        return state.anecdotes.filter(elem => (filter.toUpperCase() === elem.content.substring(0,filter.length).toUpperCase()))
    })

    console.log(anecdotesList)
    const dispatch = useDispatch()
  
    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`Voted for: ${anecdotesList.find(x => x.id===id).content}`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 4000)
      }    

    return (
        <div>
            {[...anecdotesList].sort((a,b) => b.votes - a.votes).map((anecdote, i) =>
              <div key={anecdote.id}>
                <li key={i}>
                  {anecdote.content}
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                  </div>
                  <br></br>
                </li>
              </div>
            )}
        </div>
    )
}

export default AnecdoteList