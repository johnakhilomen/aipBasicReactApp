import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import IconButton from './IconButton';
import { faPlusSquare} from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class Nav extends Component {
    render() { 
      let List="";
      if (this.props.pageType === 'interior'){
       List = ( 
          <nav className="main-nav nav">
              <IconButton
                  link={'/new-post'}
                  ariaLabel={`add new post`}
                  displayChange={'all'}
                  iconType={faPlusSquare}
                  buttonColor={'orange-background'}
                  tooltipMessage = {'create a new post'}
                  tooltipClass={'bottom-farright'}
              />
              <h1><Link className="site-heading" to={'/dashboard'}>The Autoimmune Solution</Link></h1>
              <IconButton
                  link={'/'}
                  ariaLabel={`learn more page`}
                  displayChange={'all'}
                  iconType={faHome}
                  buttonColor={'orange-background'}
                  tooltipMessage = {'learn more about AIP'}
                  tooltipClass={'bottom-farleft'}
              />
          </nav>)}      
        if (this.props.pageType==='home'){
            List = (
              <div className="home-nav-links">
                <button className="nav-link" onClick={this.props.onSignUpPopUp}>Sign-up</button>
                <button className="nav-link" onClick={this.props.onSignUpInClick} >Sign-in</button>
              </div>)
        }                         
    return (
      <div>
        {List}
      </div>
    );
    }
}
 
export default Nav;