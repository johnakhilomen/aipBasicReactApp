import React, { Component } from 'react';
import '../_styles/Form.css';
import Context from '../Context';
import config from '../config.js';

class UpdateBookmark extends Component{
    static contextType = Context;
    constructor(props){
        super(props);
        this.state={
            error:null,
            submitDisabled:true,
            bookmarkContent:{value:"",touched:false}
        }//end of state
    }

    componentDidMount(){
       let {bookmarkContent} = this.state;
       bookmarkContent.value=this.props.bookmark_content || ''
       this.setState({bookmarkContent:bookmarkContent})
    }

    updateChange=(inputContent)=>{
       let {bookmarkContent} = this.state;
       bookmarkContent={value:inputContent,touched:true}
       this.setState({bookmarkContent:bookmarkContent})
    }

    updateTouched=()=>{
       let {bookmarkContent} = this.state;
       bookmarkContent={touched:false}
       this.setState({bookmarkContent:bookmarkContent})
    }

    handleClickCancel=()=>{
       //resets the state of the form to the bookmark's current state and not the form's state
       let {bookmarkContent} = this.state;
       bookmarkContent.value=this.props.bookmark_content || ''
       this.setState({bookmarkContent:bookmarkContent})
    }

    handleSubmit=(e, bookmark_id)=>{
       e.preventDefault();
       const {bookmarkContent}=this.state;
       let updatedBookmark = {
        content:bookmarkContent.value
       }

       let url = `${config.API_ENDPOINT}/bookmarks/${bookmark_id}`
       console.log(url)

       fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(updatedBookmark),
            headers: {
              'content-type': 'application/json',
             // 'authorization': `Bearer ${config.API_KEY}`
            }
          })
            .then(res => {
              if (!res.ok) {
                // get the error message from the response,
                return res.json().then(error => {
                 // then throw it
                 throw error
                })
              }
              return 
            })
            .then(resData => {
              this.context.updateBookmark(bookmark_id, bookmarkContent.value)
              this.updateTouched()
            })
            .catch(error => {
              this.setState({ error })
            })
       }

    render(){             
        return(
            <form className="update-bookmark-form" 
                onSubmit={e=>this.handleSubmit(e, this.props.bookmark_id)}
                ref="form">
              <div className="form-intro">
               <p>Be sure to save any changes you make to this note.</p>
               </div>
                  <div>
                     <div className="form-field-group field-description">
                        <label htmlFor="bookmark-content">Content*</label>
                        <textarea 
                            type="textarea" name="bookmark-content"
                            id="bookmark-content"
                            value={this.state.bookmarkContent.value}
                            onChange={e => this.updateChange(e.target.value)}
                            className={`${this.state.bookmarkContent.touched ? "red-font" : ""} `}/>
                     </div>                     
                  </div>
                  <div className="form-buttons button-row">    
                    <button type="submit" disabled={
                        (!this.state.bookmarkContent.touched)}>Save</button>
                    <button type="reset" onClick={this.handleClickCancel}>Cancel</button>
                  </div>
                </form>
        )
    }
}

export default UpdateBookmark;
