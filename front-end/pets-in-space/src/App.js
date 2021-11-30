import './App.css';
import React, { Component } from 'react'
import NewPetForm from './NewPetForm'
import Nav from './Nav'

let baseUrl = process.env.REACT_APP_BASEURL

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pets: [],
      modalOpen: false,
      petToBeEdited:{},
      description:'',
      name: '',
      userLoggedIn: false
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
      if (response.status === 200) {
        this.getPets()
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
  // toggleCelebrated = (pet) => {
  //   console.log(pet)
  //   fetch(baseUrl + '/holidays/' + holiday._id, {
  //     method: 'PUT',
  //     body: JSON.stringify({celebrated: !holiday.celebrated}),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     credentials: "include"
  //   }).then(res => res.json())
  //   .then(resJson => {
  //     // console.log(resJson)
  //     const copyHolidays = [...this.state.holidays]
  //     const findIndex = this.state.holidays.findIndex(
  //       holiday => holiday._id === resJson._id)
  //     copyHolidays[findIndex].celebrated = resJson.celebrated
  //     this.setState({
  //       holidays: copyHolidays
  //     })
  //   })
  // }
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
  // addLike = (holiday) => {
  //   // console.log(holiday)
  //   fetch(baseUrl + '/holidays/' + holiday._id, {
  //     method: 'PUT',
  //     body: JSON.stringify({ likes: holiday.likes + 1}),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     credentials: "include"
  //   }).then(res => res.json())
  //   .then(resJson => {
  //     // console.log(resJson)
  //     const copyHolidays = [...this.state.holidays]
  //     const findIndex = this.state.holidays.findIndex(holiday => holiday._id === resJson._id)
  //     copyHolidays[findIndex].likes = resJson.likes
  //     this.setState({
  //       holidays: copyHolidays
  //     })
  //   })
  // }
  // for more on async functions
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
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
        //console.log(updatedHoliday)
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
  // component lifecycle flowchart
  // https://levelup.gitconnected.com/componentdidmakesense-react-lifecycle-explanation-393dcb19e459
  componentDidMount() {
    this.getPets()
  }
  render() {
    return (
      <div className="App">
        <Nav loginUser={this.loginUser} register={this.register}/>
        <h1>Pets in Space</h1>
        <NewPetForm baseUrl={baseUrl} addPet={ this.addPet }/>
        <table>
          <tbody>
            { this.state.pets.map((pet, i) => {
                return (
                  <tr key={pet._id}>
                    <td>{ pet.name }</td>
                    <td key={i}> {pet.about} </td>
                    <td>{pet.image}</td>
                    <td onClick={() => { this.showEditForm(pet)}}>Show Edit Form</td>
                    <td onClick={() => this.deletePet(pet._id)}>X</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <br/>
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
