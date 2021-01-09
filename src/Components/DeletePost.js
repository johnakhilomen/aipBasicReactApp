import React, {Component} from 'react';
import Context from '../Context.js';
import config from '../config';

function deletePostRequest(postId, callback){
    
    let url = `${config.API_ENDPOINT}/posts/${postId}`;
    console.log(url)
    fetch(url,{
        method: 'DELETE',
        headers: {
        'content-type': 'application/json',
        // 'Authorization': `Bearer ${config.API_KEY}`
        },
    })
   .then(res=>{
        if(!res.ok){
        throw new Error('Something went wrong, please try again')
        }
        return res.json()
    })
    .then(() => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state   
       callback(postId)    
    })
    .catch(error => {
       callback(postId, error)
    })  
}
class DeletePost extends Component{
    state = {
        isBoxVisible:false,
    }
    static contextType= Context;

    showAreYouSurePopUp=()=>{
        this.setState(prevState => ({ isBoxVisible: true }));
    }

    cancelDeleteRequest=()=>{
        this.setState(prevState => ({ isBoxVisible: false }));
    }

    render(){
        const { isBoxVisible } = this.state;
        return(
            <div className="delete-post-area">
                <button className="delete-button" onClick={this.showAreYouSurePopUp}>
                    Delete Post
                </button>
                <div className={`box are-you-sure-box ${isBoxVisible ? "" : "hidden"}`}>
                    <p>Are you sure you want to delete this post? This action can not be undone.</p>
                     <button className="button" onClick={()=>{
                             deletePostRequest(this.props.postId,
                            this.context.deletePost);
                            }}>
                            Delete Post
                    </button>
                    <button className="button" onClick = {this.cancelDeleteRequest}>Whoops-nevermind</button>
                </div> 
            </div>            
        )
    }
}
export default DeletePost;
