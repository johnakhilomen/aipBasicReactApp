import React, {Component} from 'react';
import Nav from './Nav';

class MyAccount extends Component{
    state = {
        isBoxVisible:false
    }
    BetaVersionPopUp=(e)=>{
        e.preventDefault();
        this.setState({ isBoxVisible: true });
    }
    closeWindow=()=>{
        this.setState({ isBoxVisible: false });
    }    
    render(){       
        return(
          <div className="account-page">
            <Nav pageType={'interior'}/>
              <div className={`box beta-version-box ${this.state.isBoxVisible ? "" : "hidden"}`}>
              <p>Since this is still the Beta version of the app, you cannot update account information. Please check back soon to be able to sign-up and update your account whenever!</p>
              <button className="button" onClick={this.closeWindow}>Close</button>
              </div>             
                <form className="update-account-form" onSubmit={e=>this.BetaVersionPopUp(e)}>
                    <h2>My Account</h2>                    
                    <p>Please enter your username and password to SignIn.</p>
                    
                    <div className="form-field-group">
                        <label htmlFor="username">UserName</label>
                        <input placeholder="user123" type="username" name='username' id='username'/>
                    </div>
                    <div className="form-field-group">
                        <label htmlFor="password">Password</label>
                        <input placeholder="*******" type="password" name='password' id='password'/>
                    </div>
                    <button type="submit" onClick={this.BetaVersionPopUp}>SignIn</button>                    
                   </form> 
                                                 
            </div>
        )
    }
}
export default MyAccount;