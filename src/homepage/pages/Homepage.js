import React from 'react';
import Typewriter from 'typewriter-effect';

import './Homepage.css';

const Homepage = () => {
  return (
    <React.Fragment>
      <h1 className='homepage-title'>
        <span>
          <Typewriter
            options={{
              strings: ['Welcome to On Demand Car Wash website!'],
              autoStart: true,
              loop: true,
              delay: 50,
            }}
          />
        </span>
      </h1>
    </React.Fragment>
  );
};

export default Homepage;
