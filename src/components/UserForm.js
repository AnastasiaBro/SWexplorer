import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import './App.css';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "", comment: ""};

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeName(e) {
        var val = e.target.value;
        this.setState({name: val});
    }

    onChangeComment(e) {
        var val = e.target.value;
        this.setState({comment: val});
    }
   
    handleSubmit(e) {
        e.preventDefault();
        alert("Name: " + this.state.name + " | " + "Comment: " + this.state.comment);
        const xhr = new XMLHttpRequest();
        const URL = 'api/comments';
        xhr.open('POST', URL, true);
        xhr.send({ name: this.state.name, comment: this.state.comment });
        this.setState({name: ''});
        this.setState({comment: ''});
    }

    render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <div>
                <label className='form__label'>
                    <input className='form__input form__input-name' placeholder="Darth Vader" type="text" value={this.state.name} onChange={this.onChangeName} required/>
                </label>
            </div>
            <div>
                <label className='form__label'>
                    <textarea className='form__input form__input-comment' placeholder="Luke, I'm your father!" type="text" value={this.state.comment} onChange={this.onChangeComment} required/>
                </label>
            </div>
            <button className='form__button' type="submit">Submit</button>
        </form>
    );
    }
}

export default UserForm;