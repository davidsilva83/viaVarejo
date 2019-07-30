import React, { Component } from 'react';
import { Button ,Form, FormGroup, Label, Input, FormText, Container, Row, Col, Alert } from 'reactstrap';


export class Home extends Component {
  static displayName = Home.name;


    constructor(props) {
        super(props);
  
        this.state = {
            Nome: '',
            Latitude: '',
            Longitude: '',
        }

        this.salvar = this.salvar.bind(this);
      
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    salvar = async () => {

        await fetch('api/CadastroDeAmigos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(data => {
                console.log(JSON.stringify(this.state))
            });
    }

//     <table className='table table-striped'>
//    <thead>
//        <tr>
//            <th>Nome </th>
//            <th>Latitude</th>
//            <th>Longitude</th>
//            <th></th>
//        </tr>
//    </thead>
//    <tbody>
//        <tr>
//            <td><input type="text" /></td>
//            <td><input type="text" /></td>
//            <td><input type="text" /></td>
//            <td><input type="button" name="Salvar" value="Salvar" />   </td>
//        </tr>
//    </tbody>
//</table>

    render() {
        var cssBotao = {
            'margin-top': 10
        }
    return (
      <div>
            <h1>Cadasto de amigos</h1>              
            <Row>
                <Col xs="6">
                    <Label for="Nome">Nome</Label>
                    <Input type="text" name="Nome" id="Nome" value={this.state.Nome} onChange={e => this.handleChange(e)} />
                </Col>
                <Col xs="3">
                    <Label for="Latitude">Latitude</Label>
                    <Input type="text" name="Latitude" id="Latitude" value={this.state.Latitude} onChange={e => this.handleChange(e)} />
                </Col>
                <Col xs="3">
                    <Label for="Longitude">Longitude</Label>
                    <Input type="text" name="Longitude" id="Longitude" value={this.state.Longitude} onChange={e => this.handleChange(e)} />
                </Col>
                <Col xs="6">
                    <Button style={cssBotao} color="primary" onClick={this.salvar}>
                        Salvar
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs="1">
                  
                </Col>                
            </Row>      
           
      </div>
    );
  }
}
