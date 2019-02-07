import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Item from './Item_component';

export default class Category extends Component {
  constructor(props) {
    super(props);
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
  
  createItemElement = ItemName => (
    <Item
    ItemName={ItemName}
    handleCheckboxChange={this.toggleCheckbox}
    key={ItemName}
    />
    )
    
    filteritems (CategoryName) {  
      const { data } = this.props;
      let filteredItems = data.filter(function (e) {
        return e.category_name === CategoryName;
      }).map(obj => obj.name);
    return filteredItems;
    }

      createItemElements = (CategoryName) => (
        this.filteritems(CategoryName).map(this.createItemElement)
      )

  render() {
    const { CategoryName } = this.props;

    return (
      <div id='App-form'>
      <div className="category">
        <h3> { CategoryName } </h3>
          <form className="inner" onSubmit={this.handleFormSubmit}>
            {this.createItemElements(CategoryName)}
          <button className="btn" type="submit">Save</button>
        </form>
    </div>
      </div>
    )
  }
}

Category.propTypes = {
  CategoryName: PropTypes.string.isRequired,
};