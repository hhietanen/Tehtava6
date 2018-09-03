import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Media } from 'react-bootstrap'

const Menu = ({state, addNew, notify}) => {
  const menuStyle = {
  fontSize: 20,
  backgroundColor: 'lightblue',
}

  const selected = {
  fontSize: 20,
  backgroundColor: 'grey',
}

return (
  <div>
  <div style={menuStyle}>    
    <NavLink exact to="/" activeStyle={selected}>anecdotes</NavLink>&nbsp;
    <NavLink exact to="/create" activeStyle={selected}>create new</NavLink>&nbsp;
    <NavLink exact to="/about" activeStyle={selected}>about </NavLink>&nbsp;
  </div>
  <Route exact path="/" render={() => <AnecdoteList anecdotes={state.anecdotes} />} />
  <Route path="/create" render={({history}) => 
    <CreateNew notify={notify} history={history} addNew={addNew}/>} />
  <Route path="/about" render={() => <About />} />
  <Route exact path="/anecdotes/:id" render={({match}) =>
        <Anecdote anecdote={anecdoteById(match.params.id, state)} />}
        />
  </div>
)
}
const anecdoteById = (id, state) => (
//  console.log(state.anecdotes)
  state.anecdotes.find(anecdote => anecdote.id === id)
)

const Anecdote = ({anecdote}) => {
  console.log(anecdote)

  return (
    <div>
      <h2> {anecdote.content} by {anecdote.author}</h2>

      <div>has {anecdote.votes} votes</div>
      <div>for more info see {anecdote.info}</div>
    </div>
    )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => 
          <ListGroupItem key={anecdote.id} >
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}
              </Link>
      </ListGroupItem>
      )}
    </ListGroup>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>

    <Media>

    <Media.Body>
     <Media.Heading>According to Wikipedia: </Media.Heading>
    
    <em>An anecdote is a brief, revealing account of an individual person 
    or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their 
      primary purpose is not simply to provoke laughter but to reveal a 
      truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or 
      trait, to communicate an abstract idea about a person, place, or thing 
      through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you 
    can find the best and add more.</p>
    </Media.Body>
        <Media.Right>
      <img src={require('./ada.jpg')} alt="thumbnail" />
    </Media.Right>
    </Media>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

const Notification = ({notify}) => {
const footerStyle = {
  color: 'green',
  fontSize: 36,
  borderColor: 'green',
  borderStyle: 'solid',
  borderRadius: '25px'
}

const noStyle ={
  display: 'none' 
}

let myStyle = notify ? footerStyle : noStyle

console.log(notify)
  return (
  <div style = {myStyle} > 
    {notify}
  </div>
)
}
class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }



  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }


  handleSubmit = (e, history, notify) => {
    e.preventDefault()
    console.log(this.props.history)
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
   console.log(history)
   this.props.notify(this.state.content)

   this.props.history.push('/')

  }

  render() {
console.log(this.props.history)

    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit} history={this.props.history}>
          <div>
            content 
            <input name='content' value={this.state.content} 
            onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} 
            onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} 
            onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 1,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 11,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)


  notify = (notification) => {
    this.setState({message: `A new anecdote: '${notification}' created!`})
    console.log('Päästiin notifyhyn')
    setTimeout(() => {
      this.setState({message: null})
    }, 3000)
  }


  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }




  render() {
    return (
      <div className="container">
      <Router>
      <div>
          <Notification notify={this.state.message} />
        <h1>Software anecdotes</h1>
          <Menu notify={this.notify} state={this.state} addNew={this.addNew}/>
  
        <Footer />
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
