import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Checkbox from './checkbox';

class App extends Component {
  ///////////////////////////Partie connection backend////////////////////////////////////
  componentDidMount(){
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
    .then(res => this.setState({ data: res }))          
    .catch(err => console.log(err))
  }
  
  callBackendAPI = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/item/')
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
  
  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    }else{
      this.selectedCheckboxes.add(label);
    }
  }
  
  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected');
    }
  }
  
  createCheckbox = label => (
    <Checkbox
    label={label}
    handleCheckboxChange={this.toggleCheckbox}
    key={label}
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
