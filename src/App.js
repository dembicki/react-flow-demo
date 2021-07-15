import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Diagram from './examples/Diagram';
import Checkboxes from './examples/Checkboxes';

const App = () => (
  <Router>
  <div>
    <nav>
      <ul style={{display: 'flex', gap: '10px'}}>
        <li>
          <Link to="/">Diagrams</Link>
        </li>
        <li>
          <Link to="/checkboxes">Auto-fill Checkboxes</Link>
        </li>
      </ul>
    </nav>

    <Switch>
      <Route exact path="/">
        <Diagram />
      </Route>
      <Route exact path="/checkboxes">
        <Checkboxes />
      </Route>
    </Switch>
  </div>
</Router>
)

export default App;
