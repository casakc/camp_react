import React from 'react';
import { Helmet } from "react-helmet-async";
import './AktuellesAnswer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AktuellesHeader from './AktuellesHeader';
import AktuellesSubheaderAnswer from './AktuellesSubheaderAnswer';
import AktuellesBodyAnswer from './AktuellesBodyAnswer';
import AktuellesFooter from './AktuellesFooter';
import Navbar from '../Navbar';

export default function AktuellesAnswer() {
  return (
       <div className="AktuellesAnswer">
    <Helmet>
        <title>cAMP - Antwort des Tages</title>
        <meta name="description" content="This is an example page." />
      </Helmet>
      <div className='container'>
       <AktuellesHeader />
      <Navbar />
      <AktuellesSubheaderAnswer />
      <AktuellesBodyAnswer />
      <AktuellesFooter />
 </div>
</div>
  );
}





