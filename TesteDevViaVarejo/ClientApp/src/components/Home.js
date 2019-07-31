import React, { Component } from 'react';
import { Button, Label, Input, Row, Col, Alert } from 'reactstrap';


export class Home extends Component {
  static displayName = Home.name;


    constructor(props) {
        super(props);
  
        this.state = {
            id : null,
            Nome: 'david',
            Latitude: '1',
            Longitude: '2',
            listaAmigos: [],
            mensagem: ''
        }

        this.salvar = this.salvar.bind(this);
        this.calcular = this.calcular.bind(this);
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

    calcular = () => {
        fetch('api/CadastroDeAmigos/Calcular')
            .then(
                data => data.json()
                    .then((dados) => {
                        
                        this.setState({ mensagem: dados.mensagem });
                    })
            );
    }

    
    salvar = async () => {
        let modelEnvio = {
            Id: 0,
            Nome: this.state.Nome,
            Latitude: this.state.Latitude,
            Longitude: this.state.Longitude,
        }

        await fetch('api/CadastroDeAmigos/Cadastrar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modelEnvio)
        })
        .then(data => {
            this.buscarAmigos();            
        });
    }

    excluir = async (ev) => {
        await fetch('api/CadastroDeAmigos/Apagar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Id: parseInt(ev.currentTarget.value) })
        })
        .then(data => {
            this.buscarAmigos();
        });
    }


    static renderTabela(model, newthis) {
        let arrayConvertido = []
        if (model.length > 0) {
            arrayConvertido = JSON.parse(model);
        }
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {arrayConvertido.map((amigo) => (
                        <tr key={amigo.id}>
                            <td>{amigo.id}</td>
                            <td>{amigo.nome}</td>
                            <td>{amigo.latitude}</td>
                            <td>{amigo.longitude}</td>
                            <td>
                                <Button color="primary"
                                    key={amigo.id}
                                    value={amigo.id}
                                    onClick={newthis.excluir}>
                                    Excluir
                                 </Button>
                            </td>
                        </tr>)
                    )}                 
                </tbody>
            </table>
        );
    }


    render() {

    let tabela = Home.renderTabela(this.state.listaAmigos, this);

    return (
      <div>
            <h3>Cadasto de amigos</h3>              
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
                <Col xs="2">
                    <Button style={{ marginTop: '10px' }} color="primary" onClick={this.salvar}>
                        Salvar
                    </Button>
                </Col>
                <Col xs="3">
                    <Button style={{ marginTop: '10px' }} color="primary" onClick={this.calcular}>
                        Encontrar amigo mais perto
                    </Button>
                </Col>
                <Col xs="6">
                    <Label style={{ marginTop: '10px' }} >
                        {this.state.mensagem}
                    </Label>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col xs="12">
                    <h3>Lista de amigos cadastrados</h3>  
                </Col>
                <Col xs="12">
                    { tabela }
                </Col>
            </Row>
            <hr />           
      </div>
    );
  }
}
