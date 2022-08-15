import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
  
    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
      }    

    return (
        <div>
            {anecdotes.sort((a,b) => b.votes - a.votes).map((anecdote, i) =>
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