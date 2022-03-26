import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles.css";
import { Provider } from "./Reduxx";
import Effect from "./components/Effect";
import Context from "./components/Context";
import Reducer from "./components/Reducer";
import ReduxDemo from "./components/ReduxDemo";
import Memo from "./components/Memo";
import Ref from "./components/Ref";

export default function App() {
  const [demoText] = useState("useState demo");
  return (
    <Router>
      <Provider>
        <div className="App">
          <h3>Hooks</h3>
          <ul>
            <li>
              <Link to="/">useState</Link>
            </li>
            <li>
              <Link to="/effect">useEffect</Link>
            </li>
            <li>
              <Link to="/context">useContext</Link>
            </li>
            <li>
              <Link to="/reducer">useReducer</Link>
            </li>
            <li>
              <Link to="/reduxDeom">useReducer+useContext≈Redux</Link>
            </li>
            <li>
              <Link to="/memo">useMemo</Link>
            </li>
            <li>
              <Link to="/ref">useRef</Link>
            </li>
          </ul>
          <div className="show">
            <Route path="/" exact render={() => <div>{demoText}</div>} />
            <Route path="/effect" exact component={Effect} />
            <Route path="/context" exact component={Context} />
            <Route path="/reducer" exact component={Reducer} />
            <Route path="/reduxDeom" exact component={ReduxDemo} />
            <Route path="/memo" exact component={Memo} />
            <Route path="/ref" exact component={Ref} />
          </div>
        </div>
      </Provider>
    </Router>
  );
}
