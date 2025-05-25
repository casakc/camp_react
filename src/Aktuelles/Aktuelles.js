import React from 'react';
import { Helmet } from "react-helmet-async";
import './Aktuelles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AktuellesHeader from './AktuellesHeader';
import AktuellesSubheader from './AktuellesSubheader';
import AktuellesBody from './AktuellesBody';
import AktuellesFooter from './AktuellesFooter';
import Navbar from '../Navbar';

export default function Aktuelles({ setQuestionId }) {
  return (
       <div className="Aktuelles">
    <Helmet>
        <title>cAMP - Aktuelles</title>
        <meta name="description" content="This is an example page." />
      </Helmet>
      <div className='container'>
       <AktuellesHeader />
      <Navbar />
      <AktuellesSubheader />
      <AktuellesBody setQuestionId={setQuestionId} /> {/* Forward prop */}
      <AktuellesFooter />
 </div>
</div>
  );
}