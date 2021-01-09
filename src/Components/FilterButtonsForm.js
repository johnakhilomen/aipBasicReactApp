import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../_styles/filter.css';
import Context from '../Context';
import Tooltip from './Tooltip'


class FilterButtonsForm extends Component{
    static defaultProps ={
        buttonInfo:[],
        ariaLabel:'',
        icon_type:'',
        post_type:'',
    };

    static contextType=Context;
    render(){
      let buttons=this.props.buttonInfo;
      const Buttons = buttons.map((buttonInfoObject,i)=>{
        const ariaLabel= buttonInfoObject.aria_label;
        const iconType = buttonInfoObject.icon_type;
        const fieldType = buttonInfoObject.field_type;
        const tooltipMessage = buttonInfoObject.tooltipMessage;
        const tooltipClass = buttonInfoObject.tooltipClass;
        let button = ( <button key={i} aria-label={`button-access ${ariaLabel}`}
                        onClick={()=>{this.props.updateFields(fieldType)}}
                        className="button-icon-link">
        <FontAwesomeIcon className="filter-icon" icon={iconType} />
        <Tooltip message={`${tooltipMessage}.`} positionClass={tooltipClass}/>
        </button>);
      return(button)
    })
    return(
      <section className="filter-button-row">
        {Buttons}
      </section>
    )
   }
}

export default FilterButtonsForm;