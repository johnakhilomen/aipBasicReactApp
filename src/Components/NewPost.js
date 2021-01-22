import React, { Component } from 'react';
import Nav from './Nav';
import FilterButtons from './FilterButtons';
import FilterButtonsForm from './FilterButtonsForm';
import Context from '../Context'
import '../_styles/Form.css';
import config from '../config'
import ValidationError from './ValidationError'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faIdCard, faSmile  } from '@fortawesome/free-regular-svg-icons';
import { faPodcast, faSeedling, faBookOpen,faUser, faHeartbeat} from '@fortawesome/free-solid-svg-icons';
import {BASE_URL} from "../../src/config";
import {BASE_URL_FRONTEND} from "../../src/config";

class NewPost extends Component{
  static contextType = Context;
  constructor(props){
    super(props);
    this.state={
      error:null,
      submitDisabled:true,
      fieldType:'recipe',
      areTypeSpecificFieldsVisible:{'title':false, 'author':false, 'by':false,'link':false,'content':true},
      inputs:{
      title:{value:"",touched:false},
      author:{value:"",touched:false},
      by:{value:"",touched:false},
      link:{value:"",touched:false},
      content:{value:"",touched:false},
      post_image:{value:"",touched:false, file:""}},
      user: this.props.match.params.username
    }//end of state
  }
  //updates the fields displayed depending on the type of post
  updateFields=(fieldTypeSelected)=>{
    const {areTypeSpecificFieldsVisible} = this.state;
    const {inputs} = this.state
   //first resetting fields to not display
    Object.keys(areTypeSpecificFieldsVisible).forEach(key => {
       areTypeSpecificFieldsVisible[key]=false
    });
  //resetting any touched input values to false
    Object.keys(inputs).forEach(key => {
     inputs[key].touched=false;
    });
  //clear values
    Object.keys(inputs).forEach(key => {
     inputs[key].value="";
    });
    inputs.post_image.file="";
        if(fieldTypeSelected==='book'){
            areTypeSpecificFieldsVisible['title']=true;
            areTypeSpecificFieldsVisible['by']=true;
            areTypeSpecificFieldsVisible['content']=true;
            areTypeSpecificFieldsVisible['link']=true;
        }
        else if(fieldTypeSelected==='lifestyle'){
            areTypeSpecificFieldsVisible['title']=true;
            areTypeSpecificFieldsVisible['by']=true;
            areTypeSpecificFieldsVisible['content']=true;
        }
        else if(fieldTypeSelected==='podcast'){
            areTypeSpecificFieldsVisible['content']=true;
            areTypeSpecificFieldsVisible['link']=true;
            areTypeSpecificFieldsVisible['by']=true;
            areTypeSpecificFieldsVisible['title']=true;
        }
        else if(fieldTypeSelected==='event'){
            areTypeSpecificFieldsVisible['content']=true;
            areTypeSpecificFieldsVisible['link']=true;
            areTypeSpecificFieldsVisible['title']=true;        
        }
        else if(fieldTypeSelected==='recipe'){
           areTypeSpecificFieldsVisible['title']=true;
            areTypeSpecificFieldsVisible['by']=true;
            areTypeSpecificFieldsVisible['content']=true;
        }

        //clear all form fields 
         this.refs.form.reset();

        this.setState({
            fieldType:fieldTypeSelected,
            inputs:inputs,
            submitDisabled:true,
            areTypeSpecificFieldsVisible:areTypeSpecificFieldsVisible})
    }

  updateChange=(inputValue, id)=>{
    const {inputs} = this.state;
    //console.log(inputs)
    
    if(id!=='post_image'){
        inputs[id]={value:inputValue,touched:true}
     }
     else if(id==='post_image'){
         console.log(inputValue[0])
         inputs[id]={file:inputValue[0],touched:true}
     }
    this.setState({inputs:inputs})
    this.checkDisableSubmit();
  }

  checkDisableSubmit(){
    console.log(`cDS ${this.state.fieldType} ${this.state.inputs.title.touched} ${this.state.inputs.author.touched} ${this.state.submitDisabled}`)
    if(this.state.inputs.post_image.touched){
        this.setState({submitDisabled:false})
    }
    else{
        if(this.state.fieldType === 'lifestyle' || this.state.fieldType === 'event' || this.state.fieldType === 'podcast') {
        if( this.state.inputs.title.touched && this.state.inputs.link.touched && this.state.submitDisabled)
        {this.setState({submitDisabled:false})}
        }
        else if(this.state.fieldType==='recipe' && this.state.inputs.content.touched && this.state.submitDisabled){
        console.log(`this recipe if ran `)
        this.setState({submitDisabled:false})  
        }
        else if(this.state.fieldType==='book' && this.state.inputs.title.touched && this.state.inputs.author.touched && this.state.submitDisabled){
            console.log(`this book if ran `)
            this.setState({submitDisabled:false})  
        }  
    }
}

validateContent(){
    const content = this.state.inputs.content.value.trim();
    if (content.length>800){
        return 'Please keep posts under 800 characters.'
    } 
}

validateLink(){
    const link = this.state.inputs.link.value;
    let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    if (!regexp.test(link))
    {
        return 'Please enter a valid url'
    }
}

handleSubmit=(e)=>{
    e.preventDefault();
    const {inputs, fieldType}=this.state;     
    
    let newPostWithImage = {
        user_id:1,
        post_type:fieldType,
        title:inputs.title.value,
        link:inputs.link.value,
        content:inputs.content.value,
        by:inputs.by.value,
        image_path:''
    }
    let url = `${config.API_ENDPOINT}/posts`
    if(inputs.post_image.file){
        let formData = new FormData();
        const fileField = inputs.post_image.file;        
        formData.append('image', fileField);        

        let image_url = `${config.API_ENDPOINT}/upload`;
        
        fetch(image_url, {
            method: 'POST',
            body: formData,
            })
        .then(res => {
           return res.json()
        })
        .then(res => {
            newPostWithImage.image_path = res.data.image;
            console.log(newPostWithImage)
           return  fetch(url, {
                method: 'POST',
                body: JSON.stringify(newPostWithImage),
                headers: {
                  'content-type': 'application/json',
                 // 'authorization': `Bearer ${config.API_KEY}`
                }
              })
        })
       .then(resp => {
          if (!resp.ok) {
          // get the error message from the response,
            return resp.json().then(error => {
            // then throw it
            throw error
            })
          }
           return resp.json()
        })
        .then(post => {
            this.props.history.push('/dashboard')
            this.context.addPost(newPostWithImage)       
        })
        .catch(error => {
            this.setState({ error })
        })    
    }    
else if(!inputs.post_image.file){  
  let newPost = {
    user_id:1,
    post_type:fieldType,
    title:inputs.title.value,
    link:inputs.link.value,
    content:inputs.content.value,
    by:inputs.by.value,
    image_path:''
}
fetch(url, {
    method: 'POST',
    body: JSON.stringify(newPost),
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
    return res.json()
    })
    .then(post => {
      this.props.history.push('/dashboard')
      this.context.addPost(newPost)    
    })
    .catch(error => {
      this.setState({ error })
    })
  }
}      

postData()
{
    console.log("Clicked!")
    const user = this.props.match.params.username;
    console.log(user);
    const {inputs, fieldType}=this.state; 
    //user_id, title, link, start_date,by,content, post_type
    console.log(BASE_URL+'/posts/'+user);
    fetch(BASE_URL+'/posts/'+user, {
      method:'post',
      headers:{'Content-Type' : 'application/json'},
      body:JSON.stringify({
        post_type:fieldType,
        title:inputs.title.value,
        link:inputs.link.value,
        content:inputs.content.value,
        by:inputs.by.value,
        image_path:'' 
      })
    })
    .then(response=> response.json())
    .then(response=>{
        console.log(response)
      alert("Thank you for your post!");
      //window.location.href = BASE_URL_FRONTEND+"/my-account";
    })
    .catch(err => alert(err))
}
render(){
    const { areTypeSpecificFieldsVisible } = this.state;
    const contentError = this.validateContent();
    const linkError = this.validateLink();

    return(
        <div className="new-post form-page">
            <header>
                <Nav pageType={'interior'} user={this.state.user}/>
                <FilterButtons
                    buttonInfo={[                    
                    {aria_label:'my posts',icon_type:faUser, link:`/${this.state.user}/dashboard`, display_change:'user', tooltipMessage:'view all your posts',tooltipClass:'bottom-farright'},
                    ]}                
                />
            </header>
            <main>
            <FilterButtonsForm
                    updateFields = {this.updateFields}
                    buttonInfo={[
                    {aria_label:'fields to create new recipe post',icon_type:faSeedling,field_type:'recipe', tooltipMessage:'create a recipe post',tooltipClass:'bottom-farright'},
                    {ariaLabel:'fields to create new book post',icon_type:faBookOpen, field_type:'book', tooltipMessage:'create a book post',tooltipClass:'bottom-right'},
                    {aria_label:'fields to create new podcast post',icon_type:faPodcast,field_type:'podcast', tooltipMessage:'create a podcast post',tooltipClass:'bottom-center'},
                    {aria_label:'lifestyle posts',icon_type:faHeartbeat, field_type:'lifestyle',tooltipMessage:'create a lifestyle post',tooltipClass:'bottom-left'},
                    {aria_label:'event posts',icon_type:faCalendarAlt,field_type:'event', tooltipMessage:'create an event post',tooltipClass:'bottom-farleft'}]}
                />

                <form className="new-post-form" 
                    onSubmit={e=>this.handleSubmit(e)}
                    ref="form">
                    <div className="form-intro">
                        <p>Please use the buttons above to select the type of post you want to create and the form below to share some positivity with others.<FontAwesomeIcon className="filter-icon inline-block-icon" icon={faSmile} /></p>
                        <h2>Create a new {this.state.fieldType} post</h2>
                    </div>
                    <div>
                        <div className={`form-field-group field-title ${areTypeSpecificFieldsVisible['title'] ? "" : " hidden"}`}>
                            <label htmlFor="title">Title*</label>
                            <input 
                                type="text" name="title" id="title" placeholder="A New Beginning"
                                onChange={e => this.updateChange(e.target.value, e.target.id)}/>
                        </div>
                        <div 
                             className={`form-field-group field-author ${areTypeSpecificFieldsVisible['author'] ? "" : " hidden"}`}>
                            <label htmlFor="by">Author</label>
                            <input 
                                type="text" name="by" id="by" placeholder="Maya Angelou"
                                onChange={e => this.updateChange(e.target.value, e.target.id)}/>
                        </div>
                        <div className={`form-field-group field-doctor ${areTypeSpecificFieldsVisible['doctor'] ? "" : " hidden"}`}>
                            <label htmlFor="by">Nutritionist</label>
                            <input 
                                type="text" name="by" id="by" placeholder="Kimberly Snyder"
                                onChange={e => this.updateChange(e.target.value, e.target.id)}/>
                        </div>
                        
                        <div className={`form-field-group field-link ${areTypeSpecificFieldsVisible['link'] ? "" : " hidden"} `}>
                            <label htmlFor="link">Link*</label>
                            <input 
                                type="url" name="link" id="link" placeholder="http://someamazingsite.com"
                                onChange={e => this.updateChange(e.target.value, e.target.id)}/>
                        </div>
                        {this.state.inputs.link.touched  && (<ValidationError message={linkError}/>)}
                        <div className={`form-field-group field-content ${areTypeSpecificFieldsVisible['content'] ? "" : " hidden"} `}>
                            <label htmlFor="content">Content*</label>
                            <textarea
                                type="textarea" name="content"
                                id="content"
                                onChange={e => this.updateChange(e.target.value, e.target.id)}
                                />
                        </div>
                        {this.state.inputs.content.touched  && (<ValidationError message={contentError}/>)}                        
                        <div className="form-field-group field-img">
                            <label htmlFor="post-image">Upload Screenshot</label>
                            <input
                                type="file" name="post_image"
                                accept=".png,.jpg,.gif.bmp, .jpeg"
                                id="post_image"
                                alt="user-uploaded-image"
                                onChange={e => this.updateChange(e.target.files, e.target.id)}
                                />
                        </div>
                    </div>
                        
                    <div className="form-buttons button-row">    
                        <button 
                            type="button"
                            onClick={()=>this.postData()}
                        >
                            Post</button>
                        <button type="reset">Cancel</button>
                    </div>
                  
                </form>
                
            </main>
        </div>
    )
}
}

export default NewPost;