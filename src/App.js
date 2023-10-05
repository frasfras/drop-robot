import logo from './logo.svg';
import './App.css';
import './style.css'
import './bootstrap.min.css'

// import MyForm from './MyForm';
import NameDetails from './NameDetails';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
    
    <div className="container bg-gradent-primary">
    <header className="App-header">
                  <b>Skilly </b>
                  {/* <NameDetails /> */} 
               
    </header>
    <div align="center"> <a href="/login" className="cLink">Login  Account</a></div>
      {/* <Search/> */}
      <NameDetails />
      <Routes>
        {/* <Route path="/login"  element={<MyForm />}/> */}
        {/* <Route path="/exam"  element={<Example />}/> */}
        {/* <Route path="/resum" element={<ResumeUpload />}/>
        <Route path="/doc"  element={<Documents />}/> */}
       
      </Routes>
    </div>
  
  </Router>
  );
}

export default App;
