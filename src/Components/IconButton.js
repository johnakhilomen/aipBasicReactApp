import React, {Component} from 'react';
import Context from '../Context';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from './Tooltip';

class IconButton extends Component{
    static contextType = Context;
    render(){
    //change the icon depending if on the dashboard or bookmark page
    const {ariaLabel, iconType, displayChange, link, buttonColor, tooltipMessage, tooltipClass, pageType} = this.props
    let currentDisplay= this.context.currentDisplay;
    let activeTypeClass='';
    let activeUserClass='';
    if(pageType){
      activeUserClass = currentDisplay[pageType].current_user;
      activeTypeClass = currentDisplay[pageType].current_post_type;
    }

    let tooltip =(<Tooltip message={`${tooltipMessage}.`} positionClass={tooltipClass}/>)
    let button = (<button></button>)
    if(iconType==='text-all'){
        button = (<Link 
                 to={link}
                 aria-label={`button-access ${ariaLabel}`}
                 onClick={e=>{this.context.updatePostType(displayChange); this.context.updateUsernameToDisplay(displayChange);}}
                 className={`button-icon-link button-w-text ${buttonColor} ${activeUserClass}-activeUsers ${activeTypeClass}-activeType`}>
                 All
                 {tooltip}
                  </Link>)}
    else{
      button = (<Link 
                to={link}
                aria-label={`button-access ${ariaLabel}`}
                onClick={e=>{this.context.updatePostType(displayChange); this.context.updateUsernameToDisplay(displayChange);}}
                className={`button-icon-link ${buttonColor} ${activeUserClass}-activeUsers ${activeTypeClass}-activeType`}>
                <FontAwesomeIcon className="filter-icon" icon={iconType} />
                {tooltip}
                </Link>)}
    return(
        <div className="icon-button-container">
           {button}
        </div>
    )
  }
}
export default IconButton; 