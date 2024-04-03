import React from 'react';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  return (
    <div className="container">
      <div>
        <h2>404</h2>
        <h3>UH OH! You're lost.</h3>
        <p>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          Landing Page.
        </p>
        <Link to="/landing">
          <Button>Go Back to Landing Page</Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
