//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Col
} from 'reactstrap';

export class CharacterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    let {
      my_id,
      title,
      name,
      gender,
      culture,
      born,
      aliases,
      pic_address
    } = this.props.character;
    return (
      <div>
        <Table id="tables">
          <thead>
            <tr>
              <th>ID</th>
              <th>
                <center>Image</center>
              </th>
              <th>
                <center>Name</center>
              </th>
              <th>
                <center>Gender</center>
              </th>
              <th>
                <center>Culture</center>
              </th>
              <th>
                <center>Born</center>
              </th>
              <th>
                <center>Action</center>
              </th>
            </tr>
          </thead>
          <tbody onClick={this.toggle}>
            {this.props.buttonLabel}
            <tr>
              <td style={{ width: '10px' }}>{my_id}</td>
              <td style={{ width: '200px' }}>
                <img width="200px" height="300px" src={pic_address} />
              </td>

              <td style={{ width: '180px' }}>{name}</td>
              <td style={{ width: '180px' }}>{gender}</td>
              <td style={{ width: '180px' }}>{culture}</td>
              <td style={{ width: '180px' }}>{born}</td>

              <td id="delete_position">
                <Button
                  color="primary"
                  onClick={() => this.props.DeleteCharacter(my_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{name}</ModalHeader>

          <ModalBody style={{ backgroundColor: 'Grey' }}>
            <div class="row">
              <Col sm="6">
                <img
                  style={{ marginRight: '10px' }}
                  width="250px"
                  height="300px"
                  src={pic_address}
                />
              </Col>

              <Col sm="6">
                <ListGroup style={{ marginLeft: '10px' }}>
                  <ListGroupItem>
                    <b>Aliases</b>
                  </ListGroupItem>
                  <ListGroupItem
                    style={{ fontSize: '12px', textAlign: 'left' }}
                  >
                    {aliases}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Okay
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CharacterCard;
