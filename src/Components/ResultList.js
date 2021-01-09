import React, { Component } from 'react';
import SinglePost from './SinglePost.js';
import {FilterPosts} from '../Functions/FilterResults';
import Context from '../Context';


class ResultList extends Component{
  static contextType= Context;
    render(){
      let posts=this.props.posts;    
      let filteredResults = posts;      
      let currentDisplay= this.context.currentDisplay;
      let typeOfPost = '';

        if(this.props.postsToDisplay==='posts'){
          typeOfPost = this.context.currentDisplay.dashboard.current_post_type
        }
        else if(this.props.postsToDisplay==='bookmarks'){
          typeOfPost = this.context.currentDisplay.bookmark_display.current_post_type;
        }
      filteredResults = FilterPosts(posts, currentDisplay)
      
    return(
      <section className="results-list">   
        {this.props.postsToDisplay==='posts'? <h2>You are viewing {typeOfPost} posts {this.context.currentDisplay.user_posts_displayed} </h2> : <h2>Your Bookmarks</h2>}           
        <ul className="result-list">
          {filteredResults.map((post, i) => 
          <SinglePost 
          key={i}{...post}
          postInfo = {post}
          postsToDisplay={this.props.postsToDisplay}/>)}
        </ul>
      </section>
    )
  }
}

export default ResultList; 