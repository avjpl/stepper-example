import React, { Component, Children, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import { Power2, TweenLite } from 'gsap';

import {
  TransitionGroup,
  Transition
} from 'react-transition-group';

import Button from '../Button';

import styles from './Stepper.css';

export const Step = ({ num, component, cb }) => {
  return (
    <div key={num} className={styles.stageContent}>
      { !component && `Stage ${num}`}
      { component && createElement(component, {cb}) }
    </div>
  );
}

const entering = node => {
  TweenLite.fromTo(
    node,
    1,
    {
      scaleX: 0.9,
      scaleY: 0.9,
      opacity: 0,
      cx: 500
    },
    {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      cx: 0,
      ease: Power2.easeOut,
    }
  ).delay(0.4);
};
const exiting = node => {
  TweenLite.to(node, 0.6, {
    opacity: 0,
    onComplete: console.log('Animation Complete'),
  });
};

class Steps extends Component {
  render() {
    const {
      stage,
      nextHandleClick,
      previousHandleClick,
      children,
      cb
    }  = this.props;

    const count = Children.count(children);

    return (
      <div className={styles.stagesContainer}>
        <div className={styles.stages}>
          <TransitionGroup>
            {
              Children.map(children, (child, idx) => {
                let num = idx + 1;

                return (
                  stage === num &&
                    <Transition 
                      appear={true}
                      timeout={300}
                      onEntering={entering}
                      onExiting={exiting}
                    >
                      { cloneElement(child, { num, cb }) }
                    </Transition>
                );
              })
            }
          </TransitionGroup>
        </div>

        <div className={styles.stageButton}>
          {
            stage !== 1 &&
            <Button click={previousHandleClick}>Previous</Button>
          }
          {
            stage !== count
              ? <Button disabled={stage === count} click={nextHandleClick}>Next</Button>
              : <Button>Submit</Button>
          }
        </div>
      </div>
    );
  }
}

Steps.propTypes = {
  children: PropTypes.array.isRequired,
  stage: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Steps;
