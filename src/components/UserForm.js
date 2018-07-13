import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import './App.css';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: "", comment: "", update: "this.callthebase()", name: ''};

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeName(e) {
        var val = e.target.value;
        this.setState({user: val});
    }

    onChangeComment(e) {
        var val = e.target.value;
        this.setState({comment: val});
    }
   
    handleSubmit(e) {
        e.preventDefault();
        
        //alert("Name: " + this.state.user + " | " + "Comment: " + this.state.comment);
        //var formData = new FormData(document.querySelector('.forms'));
        const xhr = new XMLHttpRequest();
        const postURL = '';
        const body = JSON.stringify({
            user: this.state.user,
            comment: this.state.comment
          });
        xhr.open('POST', postURL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body);
        console.log('запощено!');
        this.props.updateData(this.state.name);
        console.log('----------------------------');

        this.setState({user: ''});
        this.setState({comment: ''});
        //window.location.reload(true);
        
        //localStorage.setItem('update', '0' + 1);
        //this.setState({update: localStorage.getItem('update')});
        //this.props.updateData(this.state.update);
        //this.props.handler(handler);
        
        
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='forms'>
                <div className='review__block'>
                    <div>
                        <label className='form__label'>
                            <input className='form__input form__input-name' placeholder="Darth Vader" type="text" value={this.state.user} onChange={this.onChangeName} required/>
                        </label>
                    </div>
                    <div>
                        <label className='form__label'>
                            <textarea className='form__input form__input-comment' placeholder="Luke, I'm your father!" type="text" value={this.state.comment} onChange={this.onChangeComment} required/>
                        </label>
                    </div>
                    
                </div>
                <button className='form__button' type="submit">Submit</button>
            </form>
        );
    }
}

export default UserForm;