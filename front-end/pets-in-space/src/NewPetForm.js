import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Image from "react-bootstrap/Image";

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
            type="uri"
            checked={this.state.image}
            onChange={(e) => this.handleChangeImage(e)}
          />
        </Form.Group>
        <br></br>
        <Button variant="primary" type="submit">
          Memorialize
        </Button>
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

