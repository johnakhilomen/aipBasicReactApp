import React from 'react';
import ReactDOM from 'react-dom'
import DeleteBookmark from '../DeleteBookmark'
import { BrowserRouter as Router, Link} from 'react-router-dom';



describe(`Delete Bookmark component`, () => {
    
    it('renders without crashing', () => {

        //pass in any props
        const post_id = 2;
        const currentUserId = 1;
    
        const div = document.createElement('div');
        ReactDOM.render(<Router><DeleteBookmark 
            postId={post_id}
            currentUserId ={currentUserId}
            /></Router>, div);
        ReactDOM.unmountComponentAtNode(div);
      });

})