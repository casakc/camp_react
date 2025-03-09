import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from './AppHeader';
import AppSubheader from './AppSubheader';
import AppBody from './AppBody';
import AppFooter from './AppFooter';
import Navbar from './Navbar';

function App() {
  return (
    
    <div className="App">
      <div className='container'>
       <AppHeader />
      <Navbar />
      <AppSubheader />
      <AppBody />
      <AppFooter />
 </div>
</div>
  );
}

export default App;





