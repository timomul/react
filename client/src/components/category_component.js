import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class Category extends Component {
  render() {
    const { label, category } = this.props;

    return (
      <div classname="category">

      </div>
    )
  }
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
};