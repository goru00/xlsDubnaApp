import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tables from './pages/Tables';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/tables'} component={Tables} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
