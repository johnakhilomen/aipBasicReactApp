import React, { Component } from 'react';
import '../_styles/filter.css';
import Context from '../Context';
import IconButton from './IconButton.js'

class FilterButtons extends Component{
    static defaultProps ={
        buttonInfo:[],
        ariaLabel:'',
        icon_type:'',
        post_type:'',
       };
    static contextType= Context;   
    render(){
      let buttons=this.props.buttonInfo;
      const Buttons = buttons.map((buttonInfoObject,i)=>{
        const ariaLabel= buttonInfoObject.aria_label;
        const iconType = buttonInfoObject.icon_type;
        const link = buttonInfoObject.link;
        const displayChange = buttonInfoObject.display_change;
        const tooltipMessage = buttonInfoObject.tooltipMessage;
        const tooltipClass = buttonInfoObject.tooltipClass;

        let button = (<button></button>)

        button = (<IconButton
          key={i} 
          link={link}
          aria-label={`button-access ${ariaLabel}`}
          displayChange={displayChange}
          iconType={iconType}
          tooltipMessage = {tooltipMessage}
          tooltipClass = {tooltipClass}
          pageType = {this.props.pageType}/>
       );           
        return(button);      
    })  
    return(
       <section className={`${this.props.rowPosition} filter-button-row`}>
          <div className="button-row">
            {Buttons}
          </div>  
       </section>
        )
    }
}
export default FilterButtons;