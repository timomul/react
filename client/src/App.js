import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Category from './components/Category_component';

class App extends Component {
  state = {
    data: []
  }

  componentDidMount(){
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
    .then(res => this.setState({ data: res }))      
    .catch(err => console.log(err));
  }
  
  callBackendAPI = async () => {
    const response = await fetch('http://checkngo.ighilr.fr/api/items/');
    const body = await response.json();
    
    if (response.status !== 200) {
      throw Error(body.message);
    }
    let now = new Date();
    console.log("Data has been fetched !", now);
    return body;
  }

  createCategoryElement = CategoryName => (
    <Category
    CategoryName={CategoryName}
    data={this.state.data}
    key={CategoryName}
    />
    )

    filterCategories = () => {  
      const { data } = this.state;
      return [...new Set(data.map(item => item.category_name))];
    }

      createCategoryElements = () => (
        this.filterCategories().map(this.createCategoryElement)
      )

  render() {
    const {data} = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className='App-title'>Let's pack !</h1>
        </header>
        <div id='App-form' data={data}>
          {this.createCategoryElements()}
        </div>
      </div>
    );
  }
}

export default App;
