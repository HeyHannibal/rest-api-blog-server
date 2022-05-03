import Homepage from './components/homepage';
import './stylesheets/App.css';
import { Outlet, Link } from "react-router-dom";



function App() {


  return (
    <div className="App">
      <Homepage/>
      <Outlet />
    </div>
  );
}

export default App;
