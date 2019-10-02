import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import HourGlass from '../../animations/HourGlass.js';

import styles from './Stepper.css';

export const Stage = ({ stage, num }) => (
  <div className={circleStyle(stage, num)}>
    {renderIcon(stage, num)}
  </div>
);

const renderIcon = (stage, num) => {
  if (stage === num) {
    return <HourGlass size='30px' />;
  } else if (stage < num) {
    return (
      <div>
        <div>{num}</div>
        <img
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            width: '15px'
          }}

          src='../../../web/images/icons/padlock.svg'
        />
      </div>
    );
  }
  return <img 
    className='animated fadeIn'
    styles={{ width: '12px' }}
    src='../../../web/images/icons/checked2.svg'
  />;
};

const circleStyle = (stage, num) => {
  if (stage === num) {
    return `${styles.circle} ${styles.circleActive}`;
  } else if (stage > num) {
    return `${styles.circle} ${styles.circleComplete}`;
  }
  return styles.circle;
};

class Progress extends Component {
  render() {
    const { stage, children } = this.props;

    return (
      <div className={styles.progressContainer}>
        {Children.map(children, (child, idx) => cloneElement(child, { stage, num: idx + 1})) }
      </div>
    );
  }
}

Stage.propTypes = {
  stage: PropTypes.number.isRequired,
  num: PropTypes.number.isRequired,
};

Progress.propTypes = {
  children: PropTypes.array.isRequired,
  stage: PropTypes.number.isRequired,
};

export default Progress;
