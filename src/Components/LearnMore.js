import React, {Component} from 'react';
import Nav from './Nav';
import ButtonRow from './BottonRow';

class LearnMore extends Component{
    render(){
      return(
          <div>
            <Nav pageType={'interior'}/>
              <main>
              <p>Learn More</p>
              <p>This will contain what AIP is and how to begin using the app</p>
              <ButtonRow
                links ={[{'/dashboard':'Home'},{'/dashboard':'My Posts'},{'/new-post':'New Post'},{'/my-account':'My Account'}]}/>
              </main>
          </div>
      )
   }
}
export default LearnMore;