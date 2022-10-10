import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import SEPractice from "./pages/SE-Practice";
import SubmitArticle from "./pages/Submit-Article";
import TableTemplate from "./pages/TableTemplate";
import ModeratorPage from "./pages/ModeratorPage";

const App = () => {
  
  return (
    <Router>
      <div>
        <h1> Software Practice Empirical Evidence Database (SPEED)</h1>
        <ul className="header">
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/SEPractice">Select the Practice</NavLink>
          </li>
          <li>
            <NavLink to="/SubmitArticle">Submit an Article</NavLink>
          </li>
          <li>
            <NavLink to="/ModeratorPage">Moderator Page</NavLink>
          </li>
          <li>
            <NavLink to="/TableTemplate">Analyst Page</NavLink>
          </li>
        </ul>
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/SEPractice" component={SEPractice} />
          <Route path="/SubmitArticle" component={SubmitArticle} />
          <Route path="/ModeratorPage" component={ModeratorPage} />
          <Route path="/TableTemplate" component={TableTemplate} />
        </div>
      </div>
    </Router>
  );
};

export default App;
