import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Button.css';

class Button extends Component {
  handleClick = () => {
    const { click } = this.props;
    click ? click() : '';
  }

  render() {
    const { type, disabled, children } = this.props;

    return (
      <button
        type={type}
        onClick={this.handleClick}
        disabled={disabled}
        styleName={[
          styles.base,
          this.props.block && styles.block,
          this.props.customStyle ? {background: this.props.customStyle} : '',
        ]}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  click: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.array.isRequired,
};

Button.defaultProps = {
  type: ''
};

export default Button;
