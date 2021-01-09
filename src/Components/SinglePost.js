import React, { Component } from 'react';
import '../libraries/fontawesome.js';
import '../_styles/posts.css';
import DeletePost from'./DeletePost';
import AddBookmark from './AddBookmark'
import UpdateBookmark from './UpdateBookmark'
import Context from '../Context';
import { isCurrentlyBookmarked } from '../Functions/FilterResults'
import DeleteBookmark from './DeleteBookmark';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import {faHeartbeat, faPodcast, faBookOpen, faSeedling } from '@fortawesome/free-solid-svg-icons';

class SinglePost extends Component{
    static contextType=Context;
    static defaultProps = {
        history: {
          goBack: () => { }
        },
        match: {
          params: {}
        }
      }
    render(){
        const{post_id, post_type, title, by, link, content, username, bookmark_content, bookmark_id, image_path} = this.props;
        const currentUserId = this.context.currentUserInfo.user_id;
        //const allPostInfo = this.props.postInfo;
        let listItem ='';
        let button ='';
        let form ='';
        let uploadedImage ='';
        let bookmarkButton ='';
        let icon ='';
        let bookmarked = false;

        if(post_type==='lifestyle'){
            icon = faHeartbeat
        }
        else if(post_type==='event'){
            icon = faCalendarAlt
        }
        else if(post_type==='recipe'){
            icon = faSeedling
        }
        else if(post_type==='podcast'){
            icon = faPodcast
        }
        else if(post_type==='book'){
            icon = faBookOpen
        }
        let currentUser = this.context.currentUserInfo.username;
        bookmarked = isCurrentlyBookmarked(post_id, this.context.bookmarks);
        //let currentDisplay= this.context.currentDisplay;   
        if(this.props.postsToDisplay ==='bookmarks' ){
            bookmarkButton = 
                <DeleteBookmark
                    bookmarkId={bookmark_id}
                    postId={post_id}
                    currentUserId ={currentUserId}
                    push={this.props.history.push}
                    displayType = {this.props.postsToDisplay}/>                                        
        } 
        else if(this.props.postsToDisplay ==='posts' && bookmarked){
            bookmarkButton = 
                <DeleteBookmark
                    bookmarkId={bookmarked}
                    postId={post_id}
                    currentUserId ={currentUserId}
                    push={this.props.history.push}
                    displayType = {this.props.postsToDisplay}/>  
        }
        else{
            bookmarkButton = 
                <AddBookmark
                    postId={post_id}
                    //allPostInfo={allPostInfo}
                    currentUserId ={currentUserId}
                    push={this.props.history.push}/>
        }
        if(username===currentUser){
            button = <DeletePost
                        postId={post_id}/>
        }
        if(image_path){
            uploadedImage = <span className="post-span post-image"><img src={image_path} alt={content}/></span>
        }          

        if(this.props.postsToDisplay ==='bookmarks'){
            bookmarkButton = 
                <DeleteBookmark
                    bookmarkId={bookmark_id}
                    postId={post_id}
                    currentUserId ={currentUserId}
                    push={this.props.history.push}
                />  
                                       
        }
        else{
            bookmarkButton = 
                <AddBookmark
                    postId={post_id}
                    //allPostInfo={allPostInfo}
                    currentUserId ={currentUserId}
                    push={this.props.history.push}
                />
        }
        if(username===currentUser){
            button = <DeletePost
                        postId={post_id}/>
        }
        if(this.props.postsToDisplay==='bookmarks'){
            form = <UpdateBookmark 
                        bookmark_content={bookmark_content}
                        bookmark_id={bookmark_id}/>
        }
        if(image_path){
          uploadedImage = <span className="post-span post-image"><img src={image_path} alt={content}/></span>
        }
        listItem = (<li className={`single-post ${post_type}-post ${bookmarked ? "bookmarked" : "not-bookmarked"}`} key={this.props.post_id}>
               <div className="post-info">
                    <span className="post-span post-icon"><FontAwesomeIcon icon={icon} /></span>
                    <div className="user-info">
                    <span className="post-span post-username">{username}</span> 
                    </div> 
                    {uploadedImage}  
                    {title ? <span className="post-span post-title">{title}</span> :""}
                    {by ? <span className="post-span post-artist">{by}</span> :""}
                    {content ? <span className="post-span post-content">{content}</span> :""}
                    {link ? <span className="post-span post-link"><a href={link}>Link to listen or learn more</a></span> : ""}
                    
                </div>
                <div className="post-icons-buttons">
                {bookmarkButton}
                </div>
                {button}
                {form}
            </li>)
    
        return(listItem)    
}
}
export default SinglePost;