import React, { Component } from 'react';
import Nav from './Nav.js';
import ResultList from './ResultList';
import FilterButtons from './FilterButtons';
import Context from '../Context';
import { faCalendarAlt, faPlusSquare, faIdCard  } from '@fortawesome/free-regular-svg-icons';
import { faUsers, faPodcast, faBookOpen, faHome, faUser, faSeedling, faHeartbeat } from '@fortawesome/free-solid-svg-icons';



class BookmarkPage extends Component{
    static contextType = Context;
    render(){
      return(
        <div className="bookmark-results">
           <header>
           <Nav pageType={'interior'}/>         
             <FilterButtons buttonInfo={[
               {ariaLabel:'all types of posts',icon_type:faHome, link:'/dashboard',
               display_change:'all', tooltipMessage:'view posts of all types',tooltipClass:'bottom-farright'},
               {aria_label:'recipe posts',icon_type:faSeedling, link:'/bookmarks', 
               display_change:'recipe', tooltipMessage:'view only recipe posts',tooltipClass:'bottom-right'},
               {aria_label:'book posts',icon_type:faBookOpen, link:'/bookmarks',
               display_change:'book', tooltipMessage:'view only book posts',tooltipClass:'bottom-right'},
               {aria_label:'podcast posts',icon_type:faPodcast, link:'/bookmarks',
               display_change:'podcast', tooltipMessage:'view only podcast posts',tooltipClass:'bottom-right'},
               {aria_label:'lifestyle posts',icon_type:faHeartbeat, link:'/bookmarks',
               display_change:'lifestyle', tooltipMessage:'view only lifestyle posts',tooltipClass:'bottom-right'},
               {aria_label:'event posts',icon_type:faCalendarAlt, link:'/bookmarks',
               display_change:'event', tooltipMessage:'view only event posts',tooltipClass:'bottom-right'}]}
               rowPosition={'row-top'}
               pageType={'bookmark_display'}/>
           </header>    
           <main>  
             <ResultList heading = {'Your Bookmarks'}
                       postsToDisplay = {'bookmarks'}
                       posts = {this.context.bookmarks}/>
            </main>            
            <FilterButtons
                        buttonInfo={[     
                        {ariaLabel:'all users',icon_type:faUsers, link:'/dashboard',display_change:'allUsers', tooltipMessage:'view posts of all users',tooltipClass:'top-farright'},                     
                        {aria_label:'my posts',icon_type:faUser, link:'/dashboard', display_change:'user', tooltipMessage:'view your posts',tooltipClass:'top-center'},
                        {aria_label:'my account',icon_type:faIdCard, link:'/my-account',display_change:'all', tooltipMessage:'update your account info',tooltipClass:'top-left' },
                        {aria_label:'add new post',icon_type:faPlusSquare, link:'/new-post', display_change:'all', tooltipMessage:'create a new post',tooltipClass:'top-farleft'}
                        ]}

                    />
          
        </div>
        )
    }
}

export default BookmarkPage;