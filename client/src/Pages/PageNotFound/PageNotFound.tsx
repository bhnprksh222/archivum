import { useHistory } from "react-router-dom";
import './pageNotFound.scss'

const PageNotFound: React.FC = () => {
  const history = useHistory()

  const Redirect = () => {
    history.push('/')
    history.go(0)
  }
  return (
    <div className="container">
      <h2 className="container-404">404! - Page not Found</h2>
      <h3 className="container-title">UH OH! You're lost.</h3>
      <p className="container-description">
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the button below to go back to the
        Landing Page.
      </p>
      <button className="container-gobackBtn" onClick={() => Redirect()}>
        Go Back to Landing Page
      </button>
    </div >
  );
};

export default PageNotFound;
