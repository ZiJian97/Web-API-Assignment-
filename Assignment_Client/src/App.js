// heroku : https://fierce-everglades-81123.herokuapp.com/
import React, { Component } from 'react';
import './App.css';
import CharacterCard from './CharacterCard';
import Carousal from './Carousal';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      alertPopUpSuccess: false,
      name: '',
      my_id: '',
      characters: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
    this.setState({ alertPopUpSuccess: false });
  }

  getAllCharacters = () => {
    axios
      .get('https://radiant-bastion-74568.herokuapp.com/GetAllCharacters')
      .then(result => {
        this.setState({ characters: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllCharacters();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });
    this.setState({ alertPopUpSuccess: false });
    const query = `https://radiant-bastion-74568.herokuapp.com/AddNewCharacter?name=${
      this.state.name
    }`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        } else {
          this.setState({ alertPopUpSuccess: true });
          setTimeout(() => {
            this.setState({ alertPopUpSuccess: false });
          }, 2000);
        }
        this.getAllCharacters();
      })
      .catch(error => {
        // alert('Error: ', error);
        this.setState({ alertVisible: true });
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  DeleteCharacter(my_id) {
    this.setState({
      characters: this.state.characters.filter(character => {
        if (character.my_id !== my_id) return character;
      })
    });
    const query = `https://radiant-bastion-74568.herokuapp.com/DeleteCharacter?my_id=${my_id}`;

    axios
      .get(query)
      .then(result => {
        this.getAllCharacters();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let characterCards = this.state.characters.map(character => {
      return (
        <Col sm="12" key={character.name}>
          <CharacterCard
            DeleteCharacter={this.DeleteCharacter.bind(this)}
            character={character}
          />
        </Col>
      );
    });
    return (
      <div className="App">
        <Container>
          <Label
            style={{ fontSize: '50px', fontFamily: 'Script typeface' }}
            for="name"
          >
            Welcome To Game Of Thrones
          </Label>
          <Carousal id="jumboheader" />
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Character not found
              </Alert>

              <Alert
                color="success"
                isOpen={this.state.alertPopUpSuccess}
                toggle={this.onDismiss}
              >
                Character Added
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="name">Enter The Character Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Character Name (Eg. Jon Snow)"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary">Add Character</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{characterCards}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
