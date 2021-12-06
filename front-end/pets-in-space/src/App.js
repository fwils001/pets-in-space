import './App.css';
import React, { Component } from 'react'
import NewPetForm from './NewPetForm'
import Nav from './Nav'
// import { login } from '../../../back-end/controllers/users.ctrls';

let baseUrl = process.env.REACT_APP_BASEURL

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pets: [],
      modalOpen: false,
      petToBeEdited:{},
      name:'',
      about: '',
      image: [],
      userLoggedIn: false,
      userId: ""
    }
  
  }
  getPets = () => {
    fetch(baseUrl + "/pets", {
      credentials: "include"
    })
    .then(res => {
      if(res.status === 200) {
        return res.json()
      } else {
        return []
      }
    }).then(data => {
      console.log(data)
      this.setState({ pets: data })
    })
  }
  addPet = (newPet) => {
    console.log(newPet)
    const copyPets = [...this.state.pets]
    copyPets.push(newPet)
    this.setState({
      pets: copyPets,
    })
  }

  loginUser = async (e) => {
    console.log('loginUser')
    e.preventDefault()
    const url = baseUrl + '/users/login'
    const loginBody = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(loginBody),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })
      console.log(response)
      console.log("BODY: ",response.body)
      const jsonResults = await response.json()
      console.log(jsonResults)
      if (response.status === 200) {
        this.getPets()
        console.log("I am inside the response.status")
        this.setState({
          userLoggedIn: true,
          userId: jsonResults._id
        })
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }
  register = async (e) => {
    e.preventDefault()
    const url = baseUrl + '/users/signup'
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        this.getPets()
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }
  logoutUser = async (e) => {
    console.log('logout user')
    e.preventDefault()
    const url = baseUrl + '/users/logout'
    try {
      const response = await fetch(url, {
        method: 'DELETE',      
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        this.setState({
          userLoggedIn: false
        })
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }
  
  deletePet = (id) => {
      // console.log(id)
      fetch(baseUrl + '/pets/' + id, {
      method: 'DELETE',
      credentials: "include"
    }).then( res => {
      // console.log(res)
      // if I checked for a 200 response code
      const findIndex = this.state.pets.findIndex(pet => pet._id === id)
      const copyPets = [...this.state.pets]
      copyPets.splice(findIndex, 1)
      this.setState({
        pets: copyPets
      })
    })
  }
 
  handleSubmit = async (e) => {
    e.preventDefault()
    const url = baseUrl + '/pets/' + this.state.petToBeEdited._id
    try{
      const response = await fetch( url , {
        method: 'PUT',
        body: JSON.stringify({
          name: e.target.name.value,
          about: e.target.about.value,
          image: e.target.image.value
        }),
        headers: {
          'Content-Type' : 'application/json'
        },
        credentials: "include"
      })
      if (response.status === 200){
        const updatedPet = await response.json()
        const findIndex = this.state.pets.findIndex(pet => pet._id === updatedPet._id)
        const copyPets = [...this.state.pets]
        copyPets[findIndex] = updatedPet
        this.setState({
          pets: copyPets,
          modalOpen:false
        })
      }
    }
    catch(err){
      console.log('Error => ', err);
    }
  }
 handleChange = (e)=>{
   this.setState({
     [e.target.name]: e.target.value
   })
 }
  showEditForm = (pet)=>{
    this.setState({
      modalOpen:true,
      name: pet.name,
      about: pet.about,
      image: pet.image,
      petToBeEdited:pet
    })
  }

  componentDidMount() {
    this.getPets()
  }
  render() {
    return (
      <div className="App">
        
        <Nav loginUser={this.loginUser} register={this.register} logout={this.logout}/>
        <div id="dogsandcats">
      <img src="https://imgur.com/fyLNPq3.jpg" alt="pets"/>
      </div>
        <h1>Pets in Space</h1>
        <NewPetForm baseUrl={baseUrl} addPet={this.addPet}/>
        <table>
          <tbody>
            {this.state.pets.map((pet, i) => {
                return (
                  <tr class="table" key={pet._id}>
                    <td class="pet-name">{pet.name} 🦊🐶🌹</td>
                    <td class="pet-about">{pet.about}</td>
                    <td><img class="pet-image"src={pet.image} alt="pet"></img></td>
                    {this.state.userId===pet.user ?
                    <>
                    <button onClick={() => {this.showEditForm(pet)}}>Edit</button>
                    <button onClick={() => this.deletePet(pet._id)}>Delete</button>
                    </>
                    : ""
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
          {
            this.state.modalOpen &&
            <form onSubmit={this.handleSubmit}>
              <label>Name: </label>
              <input name="name" value={this.state.name} onChange={this.handleChange}/> <br/>
              <label>About: </label>
              <input name="about" value={this.state.about} onChange={this.handleChange}/>
              <label>Image: </label>
              <input name="image" value={this.state.image} onChange={this.handleChange}/>
              <button>submit</button>
            </form>
          }
          
        
      </div>
    );
  }
}
export default App;
