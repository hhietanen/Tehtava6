import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, {content, votes:0 })
  console.log(response.data)
  return response.data
}

const voteAnecdote = async (content) => {
	console.log('put triggered')
	const response = await axios
	.put(`http://localhost:3001/anecdotes/${content.id}`, 
		{ ...content, votes : content.votes+1 })
	console.log(response.data)
	return response.data
}

export default { getAll , createNew, voteAnecdote}