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
      
      xhr.open('GET', URL, true);
      //xhr.setRequestHeader('Access-Control-Allow-Origin', '*://*/*');
      //xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET');
      //xhr.setRequestHeader('Content-Type', 'application/json');
      //xhr.withCredentials = true;
      xhr.send();
      this.setState({ isLoading: true })
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return false
        }
  
        if (xhr.status !== 200) {
          console.log(xhr.status + ': ' + xhr.statusText)
        } else {
          this.setState({
            //data: JSON.parse(xhr.responseText),
            isLoading: false,
          })
        }
      }
    }

    renderComments() {
        const { data } = this.state
        console.log(data);
        
            const comments = [];
            const buttons = [];
            
            for (var i = 0; i < this.state.data.length; i++) {
                comments[i] = this.state.data[i];
                if (this.state.data[i]._links) {
                  buttons[i] = <button className='review__delete-button' type="button" onClick={this.onDeleteButtonClick}>x<span className="review__span visually-hidden">{this.state.data[i]._links.delete.href}</span><span className="index visually-hidden">{i}</span></button>;
                } else {
                  buttons[i] = <button className='review__delete-button visually-hidden' type="button" onClick={this.onDeleteButtonClick}>x<span className="review__span visually-hidden"></span><span className="index visually-hidden">{i}</span></button>;
                }
                console.log(buttons);
            }

            console.log(comments);

            const listComments = comments.map((comment, index) =>
                    <div className='review__block review__block--get' key={index}>
                        <div className='review__row'>
                            <p className='review__text'><span className='review__name'>{comment.user}</span></p>
                            <div className='review__row'>
                              <p className='review__text'><span className='review__date'>{(getDate(comment.createDate)).substring(4, 15)}</span></p>
                              <p className='review__text'><span className='review__date'>{(getDate(comment.createDate)).substring(16, 25)}</span></p>
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
                  <div className='review__block review__block--get'>
                        <div className='review__row'>
                            <p className='review__text'><span className='review__name'>Luke Skywalker</span></p>
                            <div className='review__row'>
                              <p className='review__text'><span className='review__date'>16 Jun 2018</span></p>
                              <p className='review__text'><span className='review__date'>12:25:07</span></p>
                            </div>
                        </div>
                        <div className='review__row'>
                          <p className='review__text'><span className='review__comment'>I’ll never turn to the dark side. You’ve failed, your highness. I am a Jedi, like my father before me.</span></p>
                          <div className='review__button-box'></div>
                          
                        </div>
                    </div>
                    <div className='review__block review__block--get'>
                        <div className='review__row'>
                            <p className='review__text'><span className='review__name'>Qui-Gon Jinn</span></p>
                            <div className='review__row'>
                              <p className='review__text'><span className='review__date'>20 Jun 2018</span></p>
                              <p className='review__text'><span className='review__date'>15:07:43</span></p>
                            </div>
                        </div>
                        <div className='review__row'>
                          <p className='review__text'><span className='review__comment'>Your focus determines your reality.</span></p>
                          <div className='review__button-box'></div>
                          
                        </div>
                    </div>
                    {listComments}                    
                </div>
            )
        
    }

    onDeleteButtonClick = (e) => {
      const xhr = new XMLHttpRequest();
      const URL = e.target.querySelector('.review__span').innerHTML;
      const index  = Number(e.target.querySelector('.index').innerHTML);
      console.log(URL);
      document.querySelectorAll('.review__block--get')[index].classList.add('visually-hidden');
      xhr.open('DELETE', URL, true);
      //xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      //xhr.setRequestHeader('Access-Control-Allow-Origin', '*://*/*');
      xhr.send();
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
