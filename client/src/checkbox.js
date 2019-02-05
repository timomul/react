import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class Checkbox extends Component {
  state = {
    isChecked: false,
  }
  
	toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;
    
		this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
			}
      ));
      
      handleCheckboxChange(label);
    }
    
    render() {
      const { label } = this.props;
      const { isChecked } = this.state;
      

      
      return (
        <div className ="checkbox">
				<label>
					<input
					type="checkbox"
					value={label}
					checked={isChecked}
          onChange={this.toggleCheckboxChange}
          
					/>
					{label}
				</label>
			</div>
    ) 
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
	handleCheckboxChange: PropTypes.func.isRequired,
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
// <div align="left">
// <label for={this.props.item.id}>
// 	<input type="checkbox" name="item" id={this.props.item.id} value={this.props.item.item}/>
// 	{this.props.item.item}
// 	{/* <br/> */}
// </label>
// </div>