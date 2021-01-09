import React from 'react';
import ReactDOM from 'react-dom'
import AddBookmark from '../AddBookmark'
import { BrowserRouter as Router, Link } from 'react-router-dom';



describe(`AddBookmark component`, () => {
    
    it('renders without crashing', () => {

        //pass in any props
        const post_id = 1;
        const allPostInfo = {
            "post_id":1,
            "user_id":1,
            "username":"divya",
            "title":"Great food, all day long",
            "link":"",
            "event_dates":"",
            "by":"Maya Angelou",
            "content":"Cook Spledidly, Eat Smart",
            "type":"recipe",
            "date_created":"June 7th 2020",
            "image_path":'',        
         };
        const currentUserId = 1;

        const div = document.createElement('div');
        ReactDOM.render(<Router><AddBookmark 
            postId={post_id}
            allPostInfo={allPostInfo}
            currentUserId ={currentUserId}/></Router>, div);
        ReactDOM.unmountComponentAtNode(div);
      });

})