import React, {Component} from 'react';

class Tooltip extends Component{
  state={
    isTooltipVisible:false,
  }

showTooltip=()=>{
  this.setState({isTooltipVisible:true});
  this.timerHandle = setTimeout(() =>  this.setState({isTooltipVisible:false}), 2000);
}

componentWillUnmount=() =>{
  // To clear the timeout if event take you to another route
   clearTimeout(this.timerHandle);
}

  render(){
    const {isTooltipVisible} =this.state
    return (
      <span className='tooltip'
        onClick={this.showTooltip}
      >
        <div className={`tooltip-message ${this.props.positionClass} ${isTooltipVisible ? 'visible' : ""}`}>
          {this.props.message}
        </div>
      </span>
    )
  }
}

export default Tooltip;