import React, {Component} from 'react';
import Nav from './Nav';
import About from './About';
import '../_styles/home.css';

class Home extends Component{
  state = {
    isBoxVisible:false,
    scrollPosition:0,
    statsRef:React.createRef(),
};

startExploring = () => {
  this.setState(prevState => ({ isBoxVisible: !prevState.isBoxVisible }));
  this.props.history.push('/dashboard');
  };
signUpPopUp=()=>{
  this.setState(prevState => ({ isBoxVisible: !prevState.isBoxVisible }));
  this.props.history.push('/user-signup');
}
signUpInClick=()=>{
  this.setState(prevState => ({ isBoxVisible: !prevState.isBoxVisible }));
  this.props.history.push('/my-account');
}
learnMore=()=>{
  if(this.state.isBoxVisible)
    {this.setState(prevState => ({ isBoxVisible: !prevState.isBoxVisible }));}
    //need to scroll to learn more
  if(this.state.statsRef.current){
    this.state.statsRef.current.scrollIntoView({ 
    behavior: "smooth", 
    block: "start"
  })
}
}
render(){
  //const { isBoxVisible } = this.state;
  return(            
    <div className="home">
      <Nav pageType={'home'} onSignUpPopUp = {this.signUpPopUp} onSignUpInClick = {this.signUpInClick} gotoLearnMore = {this.gotoLearnMore}/>      
        <header className="header-home">
         <div className="landing-page">  
          <h1>Welcome to The Autoimmune Solution</h1>
          <h2 className="tagline">Your resource for nutritional science and lifestyle of the Autoimmune Diet.</h2>          
          <p>This app was created to find positive thoughts, books, podcasts, recipes and events in the AIP Community.You can create your own posts and bookmark posts.</p>
          <button className="button" onClick={this.learnMore}>Learn More</button>
          <button className="button" onClick={this.startExploring}>Start</button>     
          </div>
          <About/>    
        </header>
        <main>           
          <div ref={this.state.statsRef}></div>         
        </main>               
    </div>            
  )
 }
}
export default Home;