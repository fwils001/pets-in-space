import React, { Component } from "react";
import Form from "react-bootstrap/Form";


export default class NewPetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      about: "",
      image: [],
    };
  }

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleChangeAbout = (event) => {
    this.setState({
      about: event.target.value,
    });
  };

  handleChangeImage = (event) => {
    this.setState({
      image: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(this.props.baseUrl + "/pets", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        about: this.state.about,
        image: this.state.image,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.props.addPet(data);
        this.setState({
          name: "",
          about: "",
          image: [],
        });
      })
      .catch((error) => console.log({ Error: error }));
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            md={{ span: 6, offset: 6 }}
            type="text"
            onChange={(e) => this.handleChangeName(e)}
            value={this.state.name}
            required
          />
        </Form.Group>
        <br></br>
        <Form.Group className="about">
          <Form.Label>About:</Form.Label>
          <Form.Control
            type="textarea"
            onChange={(e) => this.handleChangeAbout(e)}
            value={this.state.about}
            required
          />
        </Form.Group>
        <br></br>
        <Form.Group className="image">
          <Form.Label>Image:</Form.Label>
          <Form.Control
            type="url"
            value={this.state.image}
            onChange={(e) => this.handleChangeImage(e)}
          />
        </Form.Group>
        <br></br>
        <button class="memorialize">Memorialize</button>
        <hr></hr>
      </Form>
    );
  }
}



// import React, { Component } from 'react'

// export default class NewPetForm extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       name: ''
//     }
//   }
//   handleChange = (event) => {
//     console.log(event.target.value)
//     this.setState({
//       name: event.target.value
//     })
//   }
//   handleSubmit = (event) => {
//     event.preventDefault()
//     fetch(this.props.baseUrl + '/pets', {
//       method: 'POST',
//       body: JSON.stringify({name: this.state.name}),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       credentials: "include"
//     }).then( res => {
//         return res.json()
//     }).then( data => {
//       console.log(data)
//       this.props.addPet(data)
//       this.setState({
//         name: ''
//       })
//     }).catch (error => console.error({'Error': error}))
//   }
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label htmlFor="name">Name: </label>
//         <input type="text" id="name" name="name" onChange={ (e) => this.handleChange(e)} value={this.state.name} />
//         <input type="submit" value="Memorialize" />
//       </form>
//     )
//   }
// }

