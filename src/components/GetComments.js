import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {render} from 'react-dom';

function getDate(date) {
    //var dateStr = "2014-02-26T05:39:27.885Z";
    const dateObj = new Date(date);
    const formattedDate = dateObj.toString("MMM - d mm:ss");
    return formattedDate;
}


class GetComments extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: [],
        isLoading: false,
        link: 0
      }
    }
    componentDidMount() {
      const xhr = new XMLHttpRequest();
      
      //xhr.open('GET', URL, true);
      //xhr.setRequestHeader('Access-Control-Allow-Origin', '*://*/*');
      //xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET');
      //xhr.setRequestHeader('Content-Type', 'application/json');
      //xhr.withCredentials = true;
      //xhr.send();
      this.setState({ isLoading: true })
  
      //xhr.onreadystatechange = () => {
        //if (xhr.readyState !== 4) {
          //return false
        //}
  
        //if (xhr.status !== 200) {
          //console.log(xhr.status + ': ' + xhr.statusText)
        //} else {
          //this.setState({
            //data: JSON.parse(xhr.responseText),
            //isLoading: false,
          //})
        //}
      //}
    }

    renderComments() {
        const { data } = this.state
        //console.log(data);
        
        const comments = [{user: "Luke Skywalker", createDate: "16 Jun 2018 12:25:07", comment: "I’ll never turn to the dark side. You’ve failed, your highness. I am a Jedi, like my father before me."}, {user: "Qui-Gon Jinn", createDate: "20 Jun 2018 15:07:43", comment: "Your focus determines your reality."}];
            const buttons = [];
            
            for (var i = 0; i < this.state.data.length; i++) {
                comments[i] = this.state.data[i];
                if (this.state.data[i]._links) {
                  buttons[i] = <button className='review__delete-button' type="button" onClick={this.onDeleteButtonClick}><span className="review__span visually-hidden">{this.state.data[i]._links.delete.href}</span><span className="index visually-hidden">{i}</span></button>;
                } else {
                  buttons[i] = <button className='review__delete-button visually-hidden' type="button" onClick={this.onDeleteButtonClick}><span className="review__span visually-hidden"></span><span className="index visually-hidden">{i}</span></button>;
                }
                //console.log(buttons);
            }

            //console.log(comments);

            const listComments = comments.map((comment, index) =>
                    <div className='review__block review__block--get' key={index}>
                        <div className='review__row'>
                            <p className='review__text'><span className='review__name'>{comment.user}</span></p>
                            <div className='review__row'>
                              <p className='review__text'><span className='review__date'>{(comment.createDate).substring(0, 11)}</span></p>
                              <p className='review__text'><span className='review__date'>{(comment.createDate).substring(12, 20)}</span></p>
                            </div>
                        </div>
                        <div className='review__row'>
                          <p className='review__text'><span className='review__comment'>{comment.comment}</span></p>
                          <div className='review__button-box' key={index}>{buttons[index]}</div>
                          
                        </div>
                    </div>
            );

            return (
                <div>
                    {listComments}                    
                </div>
            )
        
    }

    render() {
        return (
            <div className='comments'>
              {this.renderComments()}
              <div id={this.props.link}></div>
            </div>
        )
    }

  }

export default GetComments;
