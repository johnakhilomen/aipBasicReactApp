import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import UserSignUp from './Components/UserSignUp';
import NewPost from './Components/NewPost';
import BookmarkPage from './Components/BookmarkPage';
import MyAccount from './Components/MyAccount';
import Context from './Context';
import config from './config';
import './_styles/App.css';
import data from './data';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      currentUserInfo:{ "user_id":1,
                        "username":"divyanat",  
                        "fullname":"Divya Natarajan"},
      posts:data.posts,
      bookmarks:data.bookmarks,
      users:data.users,            
      currentDisplay:{
        type_posts_displayed:'all',
        dashboard:{ current_post_type:'all'},
        bookmark_display:{current_post_type:'all'}
      }
    }//end of state

  }
  //filter buttons function to update type of post displayed
  updatePostType=(displayChange)=>{
    const {currentDisplay,currentUserInfo} = this.state;
    let currentUserId = currentUserInfo.user_id;
    //change the posts displayed depending on type of user selected
    if(displayChange ==='allUsers' || displayChange ==='byUser' || displayChange ==='user'){
      currentDisplay.dashboard.current_user=displayChange;
      this.getPostsByUser(displayChange,currentUserId)
    }
    //changes the display for type of post
    if(displayChange ==='all' || displayChange ==='book' || displayChange === 'lifestyle' || displayChange ===
      'podcast' || displayChange === 'event' || displayChange === 'recipe'){
      currentDisplay.dashboard.current_post_type=displayChange;
  }  
      
  this.setState({
    currentDisplay:currentDisplay})
  }
  updateBookmark=(bookmarkId, updatedContent)=>{  
    const { bookmarks } = this.state;
    bookmarks.map(bookmark=>{
      if(bookmark.bookmark_id===bookmarkId) 
      { bookmark.bookmark_content=updatedContent
         return bookmark}
        else {return bookmark}}
    )  
   // this.setState({bookmarks:newBookmarks})
  }
  updateUsernameToDisplay=(name)=>{
    const {currentDisplay} = this.state;
    if(name==='allUsers'){
      currentDisplay.user_posts_displayed="all users"
    }
    else if(name==='user'){
      currentDisplay.user_posts_displayed="your own"
    }
    this.setState({
      currentDisplay:currentDisplay})
  }
  addPost=(newPost)=>{
    this.setState({
    posts:[...this.state.posts, newPost]
    })  
  }
  getBookmarkPostIds=(bookmarks)=>{
    let currentUserBookmarkedPostIds = bookmarks.map(bookmark=>bookmark.post_id);
    return currentUserBookmarkedPostIds;
  }
  updatePostsDisplayed=(posts)=>{
    this.setState({
      posts:posts
    })
  }
  deletePost=(postId)=>{
    const newPosts = this.state.posts.filter(post=>
      post.post_id !== postId)  
      this.setState({
      posts:newPosts
    })
  }
  deleteBookmark=(bookmarkId)=>{
    const newBookmarkPosts = this.state.bookmarks.filter(bookmark=>
      bookmark.bookmark_id !== bookmarkId)    
      this.setState({
      bookmarks:newBookmarkPosts
    })    
  }

  addBookmark=(newBookmarkPost)=>{    
    this.setState({
      bookmarks:[...this.state.bookmarks, newBookmarkPost]
    })
  }
  getPostsByUser=(userToDisplay,currentUserId)=>{    
    let url = `${config.API_ENDPOINT}/posts`
    currentUserId = this.state.currentUserInfo.user_id

    if(userToDisplay==='allUsers'){
      url = `${config.API_ENDPOINT}/posts`    
    }
    else if(userToDisplay==='user'){
      url = `${config.API_ENDPOINT}/posts?userid=${currentUserId}`      
    }
    else {
      url = `${config.API_ENDPOINT}/posts?userid=${userToDisplay}`      
    }

    fetch(url,{
        method:'GET',
        header:{
        'content-type':'application/json',
        // 'Authorization':`Bearer ${config.API_KEY}`
        },
    })
    .then(res=>{
        if(!res.ok){
        throw new Error('Something went wrong, please try again')
        }
        return res.json()
    })
    .then(postdata=>{      
      this.updatePostType('all');
      this.updatePostsDisplayed(postdata)
    })
    .catch(err=>{
      this.setState({
        error:err.message
      });
    })
}

getUsers=()=>{
  fetch(`${config.API_ENDPOINT}/users`,{
    method:'GET',
    header:{
      'content-type':'application/json',
     // 'Authorization':`Bearer ${config.API_KEY}`
    },
  })
  .then(res=>{
    if(!res.ok){
      throw new Error('Something went wrong, please try again')
    }
    return res.json()
  })
  .then(userdata=>{   
    this.setState({
      users:userdata
    })
  })
  .catch(err=>{
    this.setState({
      error:err.message
    })
  })
}
componentDidMount(){
  this.setState({error:null})
  //getting users
  this.getUsers();
}


  render () {
    const contextValue={
      currentUserInfo:this.state.currentUserInfo,
      posts:this.state.posts,
      bookmarks:this.state.bookmarks,
      users:this.state.users,
      currentDisplay:this.state.currentDisplay,
      updatePostType:this.updatePostType,
      updatePostsDisplayed:this.updatePostsDisplayed,
      addPost:this.addPost,
      getPostsByUser:this.getPostsByUser,
      updateUsernameToDisplay:this.updateUsernameToDisplay,
      deletePost:this.deletePost,
      addBookmark:this.addBookmark,
      updateBookmark:this.updateBookmark,
      deleteBookmark:this.deleteBookmark,
    }
    return (
      <div className="App">
        <Context.Provider value={contextValue}>
          <Route exact path="/" component={Home}/>
          <Route exact path="/:username/dashboard" component={Dashboard}/>
          <Route exact path="/bookmarks" component={BookmarkPage}/>
          <Route exact path="/user-signup" component={UserSignUp}/>
          <Route exact path="/:username/new-post" component={NewPost}/>
          <Route exact path="/my-account" component={MyAccount}/>        
        </Context.Provider>
      </div>
    );
  }
}      
export default App;
