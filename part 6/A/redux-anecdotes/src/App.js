import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'


const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm/>
      <br></br>
      <AnecdoteList/>
    </div>
  )
}

export default App