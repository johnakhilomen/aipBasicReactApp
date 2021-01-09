import React from 'react';
import Context from '../Context';
import config from '../config.js';
import Tooltip from './Tooltip'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBookmark} from '@fortawesome/free-solid-svg-icons';

function addBookmarkRequest(allPostInfo, currentUserId, callback){
    let newBookmarkPost = allPostInfo;
    let newBookmark = {
        user_id:currentUserId,
        post_id:allPostInfo.post_id,
    }
    
   // let url = `${config.API_DEV_ENDPOINT}/bookmarks`;
    let url = `${config.API_ENDPOINT}/bookmarks`;
    fetch(url,{
        method: 'POST',
        body:JSON.stringify(newBookmark),
        headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
        },
    })
   .then(res=>{
        if(!res.ok){
        throw new Error('Something went wrong, please try again')
        }
        return res.json()
    })
    .then((bookmark) => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state 
      
      newBookmarkPost = {...newBookmarkPost, bookmark_id:bookmark.id}
     
      callback(newBookmarkPost);
       //go to bookmark
    })
    .catch(error => {
        console.log(`there was an error`)
        console.log(error)
    })
}

export default function AddBookmark(props){
    return(
        <Context.Consumer>
            {(context)=>(
                <button className="bookmark-button post-icon"
                    onClick={()=>{
                        addBookmarkRequest(props.allPostInfo, props.currentUserId,
                            context.addBookmark);
                    }}>
                   <FontAwesomeIcon icon={faBookmark} />
                   <Tooltip message={'Add this post to your bookmarks'} positionClass={'top-farright'}/>
                </button>
            )}

        </Context.Consumer>
    )
}