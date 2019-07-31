import React, { Component } from 'react';
import { Button ,Form, FormGroup, Label, Input, FormText, Container, Row, Col, Alert } from 'reactstrap';


export class Home extends Component {
  static displayName = Home.name;


    constructor(props) {
        super(props);
  
        this.state = {
            id : null,
            Nome: 'david',
            Latitude: '1',
            Longitude: '2',
            listaAmigos: []
        }

        this.salvar = this.salvar.bind(this);
        this.excluir = this.excluir.bind(this);
    }

    componentDidMount() {
        this.buscarAmigos();
    }

    buscarAmigos = () => {
        fetch('api/CadastroDeAmigos')
            .then(
                data => data.json()
                .then((dados) => {
                    this.setState({ listaAmigos: JSON.stringify(dados) });
                })
            );
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    salvar = async () => {
        await fetch('api/CadastroDeAmigos/Salvar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(data => {
            this.buscarAmigos();
            console.log(JSON.stringify(this.state))
        });
    }

    excluir = function (id) {
        alert(id);
    }


    static renderTabela(model, a) {
        let arrayConvertido = []
        if (model.length > 0) {
            arrayConvertido = JSON.parse(model);
        }
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Nome </th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {arrayConvertido.map(amigo =>
                        <tr key={amigo.id}>
                            <td>{amigo.nome}</td>
                            <td>{amigo.latitude}</td>
                            <td>{amigo.longitude}</td>
                            <td>
                            </td>
                        </tr>
                    )}                 
                </tbody>
            </table>
        );
        //<Button color="primary" onClick={a.excluir(amigo.id)}>
        //    Excluir
        //                         </Button>

    }


    render() {
        var cssBotao = {
            'margin-top': 10
        }

        let tabela = Home.renderTabela(this.state.listaAmigos, this);

    return (
      <div>
            <h1>Cadasto de amigos</h1>              
            <Row>
                <Col xs="6">
                    <Label for="nome">Nome</Label>
                    <Input type="text" name="Nome" id="nome" value={this.state.Nome} onChange={e => this.handleChange(e)} />
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
                <Col xs="12">
                    { tabela }
                </Col>
            </Row>
      </div>
    );
  }
}
