import React from 'react';
import Context from '../Context';
import config from '../config';
import Tooltip from './Tooltip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare } from '@fortawesome/free-regular-svg-icons';
import { faBookmark} from '@fortawesome/free-solid-svg-icons';

function deleteBookmarkRequest(bookmarkId, callback){
    let url = `${config.API_ENDPOINT}/bookmarks/${bookmarkId}`;
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
        return 
    })
    .then(() => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
       callback(bookmarkId)
    })
    .catch(error => {
        console.log(`there was an error`)
        console.log(error)
    })
}

export default function DeleteBookmark(props){
 //change the icon depending if on the dashboard or bookmark page
 let icon=faBookmark
 if(props.displayType==='bookmarks'){
     icon=faMinusSquare
 }    
    return(
        <Context.Consumer>
            {(context)=>(
                <button className="bookmark-button post-icon delete-icon"
                    onClick={()=>{
                        deleteBookmarkRequest(props.bookmarkId,
                            context.deleteBookmark);
                    }}>
                   <FontAwesomeIcon icon={icon} />
                   <Tooltip message={'Remove this post from your bookmarks'} positionClass={'top-farright'}/>
                </button>
            )}
        </Context.Consumer>
    )
}