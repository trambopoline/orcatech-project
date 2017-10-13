import React, { Component } from 'react';
// import logo from './logo.svg';
import $ from 'jquery';
import './App.css';

class App extends Component {

  constructor(props)
  {
    super(props);

    this.state =
    {
      items: [],
      nextId: -1,
    }

  }

  componentDidMount()
  {
    // Grab first 10 items
    fetch(`http://localhost:3001/?action=get`, {
        // method: 'GET',
        // mode: 'no-cors',
        // accept: 'application/json',
      })
    .then( (response) =>  { return response.json(); } ).then ( (data) => 
      {
        let items = [];

        // Convert the object literal to an array
        for (let property in data) {
          items.push(data[property]);
        }

        // items = data;
        let highestID = -1;
        let newValue;
        for( let item in items )
        {
          // console.log( items[item].ID );
          if( items[item] == null ) continue;

          newValue = parseInt( items[item].ID, 0 );

          if ( newValue > highestID)
          {
            highestID = newValue;
          }
          else
          {
            newValue = highestID;
          }
        }

        console.log( items );
        console.log( highestID+1 );

        this.setState(
        {
          items: items,
          nextId: newValue + 1,
        });
      });

  }

  createItem( name, model, macAddress )
  {
    console.log( name, model, macAddress );

    //need to send it to the server, then add it
    let expandedItems = this.state.items;
    let nextId = this.state.nextId + 1;

    // &name=&model=&macAddress=
    expandedItems.push(
      {
        "ID": this.state.nextId,
        "name": name,
        "model": model,
        "macAddress": macAddress,
      });

    this.setState(
    {
      items: expandedItems,
      nextId: nextId,
    })

      fetch(`http://localhost:3001/?action=post&ID=${nextId}&name=${name}&model=${model}&macAddress=${macAddress}`, {
        // method: 'GET',
        // mode: 'no-cors',
        // accept: 'application/json',
      });
  }

  deleteItem( idOfItemToDelete )
  {
    let reducedItems = $.grep( this.state.items, ( item ) =>  item.ID !== idOfItemToDelete );

    this.setState(
    {
      items: reducedItems,
    });
  }

  render(){
    console.log( this.state.items );
    return (
      <div className="App">
        <Tables
          items={this.state.items}
          handleDelete={ ( idOfItemToDelete ) => this.deleteItem( idOfItemToDelete ) }
          handleCreate={ ( name, model, macAddress ) => this.createItem( name, model, macAddress ) }
        />
      </div>
      );
  }
}

class Tables extends React.Component
{
  handleCreate()
  {
  }

  render(){
    const rows = [];

    // if this.props.items !==
    this.props.items.forEach( (item) =>
    {
      rows.push(
       <Row
         key={item.ID}
         item={item}
         handleDelete={ () => this.props.handleDelete( item.ID ) }
       />
      );
    });

    return (
      <div className="Tables">
        <table>
          <tbody>
            <tr className="header-row">
              <td>ID</td>
              <td>Name</td>
              <td>Model</td>
              <td>Mac Address</td>
            </tr>
            {rows}
            <NewItem
              handleCreate={ ( name, model, macAddress ) => this.props.handleCreate( name, model, macAddress ) }
            />
          </tbody>
        </table>
      </div>
      );
  }
}
class Row extends React.Component
{

  render()
  {
    return (
      <tr className="Row">
        <td>{this.props.item.ID}</td>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.model}</td>
        <td>{this.props.item.macAddress}</td>
        <td>
          <button className="delete-item" onClick={ this.props.handleDelete }>Delete</button>
        </td>
      </tr>
      );
  }
}

class NewItem extends React.Component
{
  constructor( props )
  {
    super(props);
    this.state =
    {
      name: '',
      model: '',
      macAddress: '',
    };
  }

  updateName( event )
  {
    // console.dir( event.target );
    this.setState(
    {
      name: event.target.value,
    });
  }

  updateModel( event )
  {
    // console.dir( event.target );
    this.setState(
    {
      model: event.target.value,
    });
  }

  updateMacAddress( event )
  {
    // console.dir( event.target );
    this.setState(
    {
      macAddress: event.target.value,
    });
  }

  render()
  {
    return (
      // <table>
      //     <tbody>
            <tr className="new-item">
              <td></td>
              <td>
                  <label htmlFor="new-name">Name: </label>
                  <input id="new-name"
                         value={this.state.name}
                         onChange={event => this.updateName(event) }
                         />
              </td>
              <td>
                  <label htmlFor="new-model">Model: </label>
                  <input id="new-model"
                         value={this.state.model}
                         onChange={event => this.updateModel(event) }
                         />
              </td>
              <td>
                  <label htmlFor="new-mac-address">Mac Address: </label>
                  <input id="new-mac-address"
                         value={this.state.macAddress}
                         onChange={event => this.updateMacAddress(event) }
                         />
              </td>
              <td>
                <button className="create-new-item" onClick={ ( name, model, macAddress ) => this.props.handleCreate( this.state.name, this.state.model, this.state.macAddress )} >Create</button>
              </td>
            </tr>
        //   </tbody>
        // </table>
    );
  }
}

export default App;
