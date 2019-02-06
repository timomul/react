import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Checkbox from './components/item_component';

class App extends Component {
  ///////////////////////////Partie connection backend////////////////////////////////////
  componentDidMount(){
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
    .then(res => this.setState({ data: res }))          
    .catch(err => console.log(err))
  }

  callBackendAPI = async () => {
    const response = await fetch('http://checkngo.ighilr.fr/api/items/')
    const body = await response.json()
    
    if (response.status !== 200) {
      throw Error(body.message)
    }
    let now = new Date();
    console.log("Data has been fetched !", now);
    console.log(body);
    return body
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.selectedCheckboxes = new Set();
  }
  
  toggleCheckbox = ItemName => {
    if (this.selectedCheckboxes.has(ItemName)) {
      this.selectedCheckboxes.delete(ItemName);
    }else{
      this.selectedCheckboxes.add(ItemName);
    }
  }
  
  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected');
    }
  }
  
  createCheckbox = ItemName => (
    <Checkbox
    ItemName={ItemName}
    handleCheckboxChange={this.toggleCheckbox}
    key={ItemName}
    />
    )
    
    createCheckboxes = () => (
      this.state.data.map(obj => obj.name).map(this.createCheckbox)
      )

render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className='App-title'>Let's pack !</h1>
        </header>
        <div id='App-form'>
            <form className="inner" onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <button className="btn" type="submit">Save</button>
            </form>
        </div>
      </div>
    );
  }
}

export default App;
