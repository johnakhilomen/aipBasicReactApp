import React from 'react';
import ReactDOM from 'react-dom'
import Home from '../Home'
import { BrowserRouter as Router, Link } from 'react-router-dom';



describe(`Home component`, () => {
    
    it('renders without crashing', () => {

        const div = document.createElement('div');
        ReactDOM.render(<Router><Home/></Router>, div);
        ReactDOM.unmountComponentAtNode(div);
      });

})