import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div>
      <h1>Welcome!</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Sign up</button>
      </Link>
    </div>
  );
}

export default WelcomePage;
