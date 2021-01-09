import React, {Component} from 'react';
import Nav from './Nav';
import ResultList from './ResultList';
import Context from '../Context';

class Dashboard extends Component{
    static contextType = Context;
    render(){
      return(
        <div>
          <header>
            <Nav pageType={'interior'}/>                     
          </header>
          <main>          
            <ResultList
            heading = {'Posts'}
            postsToDisplay = {'posts'}
            posts = {this.context.posts}/>
          </main>
          <footer className="copyright">
          
          </footer>
        </div>
      )
    }
}
export default Dashboard;