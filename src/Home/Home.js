import React from 'react';
import { Helmet } from "react-helmet-async";
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeHeader from './HomeHeader';
import HomeSubheader from './HomeSubheader';
import HomeBody from './HomeBody';
import HomeFooter from './HomeFooter';
import Navbar from '../Navbar';

export default function Home() {
  return (
     <div className="Home">
      <Helmet>
              <title>cAMP - Herzlich Willkommen!</title>
              <meta name="description" content="This is an example page." />
            </Helmet>
      <div className='container'>
       <HomeHeader />
      <Navbar />
      <HomeSubheader />
      <HomeBody />
      <HomeFooter />
 </div>
</div>
  );
}











