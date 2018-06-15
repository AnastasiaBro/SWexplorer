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
      }
    }
    /*componentDidMount() {
      const xhr = new XMLHttpRequest();
      //const URL = 'http://8554/api/v1/comments';
      xhr.open('GET', URL, true);
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
    }*/

    renderComments() {
        const { data } = this.state
        console.log(data);
        
            const comments = [];
            
            for (var i = 0; i < this.state.data.length; i++) {
                comments[i] = this.state.data[i];
            }

            const listComments = comments.map((comment, index) =>
                    <div className='review__block' key={index}>
                        <p className='review__text'><span className='review__name'>{comment.user}</span></p>
                        <p className='review__text'><span className='review__name'>{getDate(comment.createDate)}</span></p>
                        <p className='review__text'><span className='review__name'>{comment.createDate.substring(11, 19)}</span></p>
                        <p className='review__text'><span className='review__comment'>{comment.comment}</span></p>
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
            </div>
        )
      }

    }

export default GetComments;
