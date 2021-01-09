import React from 'react';
import ReactDOM from 'react-dom'
import ResultList from '../ResultList'
import { BrowserRouter as Router } from 'react-router-dom';



describe(`ResultList component`, () => {    
    it('renders without crashing', () => {

   const posts=[ {
    "post_id":2,
    "user_id":2,
    "username":"divyanat",
    "title":"The Autoimmune Solution",
    "content":"Considered the definitive guide to reversing autoimmunity, The Autoimmune Solution lays out a revolutionary, step-by-step approach that restores the body to its natural healthy state in 30 days by eliminating toxic foods, introducing restorative ingredients, and identifying environmental toxins.",
    "by":"Amy Myers",
    "link":"https://www.amymyersmd.com/autoimmunesolution/",
    "type":"book",
    "event_dates":"",
    "date_created":"December 30th 2020",
    "image_path":''             
 },{
    "post_id":3,
    "user_id":3,
    "username":"natarajan",
    "title":"The Rheumatoid Solutions Podcast",
    "content":"The Rheumatoid Arthritis show that provides help and inspiration for inflammatory arthritis patients to reduce symptoms and leave healthier, happier lives. Hosted by Clint Paddison, creator of the Paddison Program for Rheumatoid Arthritis.",
    "by":"Clint Paddison",
    "type":"podcast",
    "link":"https://paddisonprogram.podbean.com/",
    "event_dates":"",
    "date_created":"December 29th 2020",
    "image_path":''             
 }
];
const postsToDisplay='posts';
        

    
        const div = document.createElement('div');
        ReactDOM.render(<Router><ResultList 
            heading = {'Posts'}
            postsToDisplay = {postsToDisplay}
            posts = {posts}
            /></Router>, div);
        ReactDOM.unmountComponentAtNode(div);
      });

})