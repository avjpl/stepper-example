import React, { Component } from 'react';
import Stepper from './Stepper/Stepper';

import Signup from './Forms/Signup';
import RegisterForm from './Forms/Register';
import SelectModel from './Forms/SelectModel';

const Home = () => (
  <Stepper stage={1}>
    <Stepper.Progress>
      <Stepper.Stage />
      <Stepper.Stage />
      <Stepper.Stage />
    </Stepper.Progress>
    <Stepper.Steps>
      <Stepper.Step component={Signup} />
      <Stepper.Step component={RegisterForm} />
      <Stepper.Step component={SelectModel} />
    </Stepper.Steps>
  </Stepper>
);

export default Home;
