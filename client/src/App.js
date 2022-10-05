import {BrowserRouter , Route, Switch} from "react-router-dom";
import Landing from '../src/components/Landing/Landing.jsx';
import Home from '../src/components/Home/Home.jsx';
import Detail from "./components/Detail/Detail.jsx";
import Create from './components/Form/Form.jsx';
import Error from './components/Error/Error.jsx';
// import './App.css';

function App() {
  return (
    // <div className="App">
    //   <h1>Henry Dogs</h1>
    // </div>

  //conocimiento del store le doy visibilidad a los componentes internos
  <BrowserRouter> 
  <Switch>
      <Route exact path='/' component={Landing}/> 
      <Route exact path='/home' component={Home}/>
      <Route path='/dogs/:id' component={Detail}/>
      <Route path='/dogs/' component={Create}/>
      <Route component={Error}/>
     
  </Switch>
  </BrowserRouter> 


  );
}

export default App;
