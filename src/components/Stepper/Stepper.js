import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import styles from './Stepper.css';

import Progress from './Progress';
import Steps, { Step } from './Steps';
import { Stage } from './Progress';

class Stepper extends Component {
  constructor(props) {
    super(props);

    this.collected = '';
  }
  state = {
    stage: this.props.stage,
  };

  static Progress = Progress;
  static Steps = Steps;
  static Step = Step;
  static Stage = Stage;

  nextHandleClick = () => {
    this.setState({ stage: this.state.stage + 1 });
  };

  previousHandleClick = () => {
    this.setState({ stage: this.state.stage - 1 });
  };

  callbackFn = (val) => () =>{
    this.collected += val + ' ';
    console.log({collected: this.collected});
  }

  render() {
    const { stage } = this.state;
    const { children } = this.props;

    return (
      <div className={styles.container}>
        {
          Children.map(children, child =>
            cloneElement(child, {
              stage,
              nextHandleClick: this.nextHandleClick,
              previousHandleClick: this.previousHandleClick,
              cb: this.callbackFn
            })
          )
        }
      </div>
    );
  }
}

Stepper.propTypes = {
  stage: PropTypes.number,
  children: PropTypes.array.isRequired,
};

Stepper.defaultProps = {
  stage: 1,
};

export default Stepper;
