import React, {Component} from 'react';
import Nav from './Nav';
import ResultList from './ResultList';
import Context from '../Context';
import {BASE_URL} from "../../src/config";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Dashboard extends Component{
  state = {
    posts: [],
    user: ""
  }
  componentDidMount() {
    const user = this.props.match.params.username;
    this.setState({
      user : user
    })
    console.log(user);
    console.log(cookies.get('token'))
    fetch(BASE_URL+'/posts/'+user, {
      method:'get',
      headers:{
          'Content-Type' : 'application/json',
          "Authorization": cookies.get('token')
        }
      })
    .then(response=> response.json())
    .then(response=>{
      console.log(response)
      this.setState({
        posts: response
      })
    })
    .catch(err=> alert(err))

  }

    static contextType = Context;
    render(){
      return(
        <div>
          <header>
            <Nav pageType={'interior'} user={this.state.user}/>                     
          </header>
          <main>          
            <ResultList
            heading = {'Posts'}
            postsToDisplay = {this.state.posts}
            posts = {this.state.posts}/>
          </main>
          <footer className="copyright">
          </footer>
        </div>
      )
    }
}
export default Dashboard;