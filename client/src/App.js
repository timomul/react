import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Checkbox from './checkbox';

class App extends Component {
  ///////////////////////////Partie connection backend////////////////////////////////////////////////////////////
        state = {
          data: []
        }
        componentDidMount(){
          // Call our fetch function below once the component mounts
          this.callBackendAPI()
          .then(res => this.setState({ data: res.items }))          
          .catch(err => console.log(err))
        }
        // Fetches our GET route from the Express server.
        // (Note the route we are fetching matches the GET
        // route from server.js)
        callBackendAPI = async () => {
          const response = await fetch('/data')
          const body = await response.json()
          
          if (response.status !== 200) {
            throw Error(body.message)
          }
          let now = new Date();
          console.log("Data has been fetched !", now);
          return body
        }
  ///////////////////////////////////////////////////////////////////////////////////////
  componentWillMount = () => {
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
          {/* <form name='checklist-1'>
            {items.map((item) => (<Checkbox key={item.id} item={item}/>))}
          </form> */}
            <form className="inner" onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <button className="btn" type="submit">Save</button>
            </form>
            <form className="inner" onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <button className="btn" type="submit">Save</button>
            </form>
            <form className="inner" onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <button className="btn" type="submit">Save</button>
            </form>
        </div>
        
        {/* // Render the newly fetched data inside of this.state.data */}
        {/* <p className="App-intro">{this.state.data}</p> */}
      </div>
    );
  }
}

export default App;
