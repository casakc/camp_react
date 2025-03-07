import React from 'react';
import logo from './Zettel, Logo1.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from './AppHeader';
import AppSubheader from './AppSubheader';
import AppBody from './AppBody';
import AppFooter from './AppFooter';

function App() {
  return (
    
    <div className="App">
      <div className='container'>
      <AppHeader />
      <AppSubheader />
      <AppBody />
      <AppFooter />
 </div>
</div>
  );
}

export default App;





