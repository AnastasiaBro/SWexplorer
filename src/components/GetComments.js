import React from 'react';
//import ReactDOM from 'react-dom';
import './App.css';
//import {render} from 'react-dom';
import UserForm from './UserForm.js';

localStorage.setItem('update', '0');
/*eslint no-useless-escape: 0*/

function getDate(date) {
    //var dateStr = "2014-02-26T05:39:27.885Z";
    const dateObj = new Date(date);
    const formattedDate = dateObj.toString("MMM - d mm:ss");
    return formattedDate;
}

function getToken(newURL, kind) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  const URL = 'http://192.168.148.30:9999/uaa/oauth/token';
  const body = '&grant_type=refresh_token&client_secret=swexplorer&client_id=swexplorer&refresh_token=' + document.cookie.replace(/(?:(?:^|.*;\s*)fresh\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
  xhr.open('POST', URL, true);

  
  xhr.setRequestHeader('Authorization', 'Basic c3dleHBsb3Jlcjpzd2V4cGxvcmVy');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  console.log(body);
  xhr.send(body);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      const token = xhr.response.access_token;
      const fresh = xhr.response.refresh_token;
      console.log('Новый токен получен ' + token);
      console.log('Новый фреш получен ' + fresh);

      document.cookie = "token=" + token + "; path=/; expires=;";
      document.cookie = "fresh=" + fresh + "; path=/; expires=;";
      

      const xhr1 = new XMLHttpRequest();
      //const URL = e.target.querySelector('.review__span').innerHTML;
      
      console.log('URL for delete ', newURL);

      xhr1.open(kind, newURL, true);

      console.log('new token =', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
      console.log('new fresh = ', document.cookie.replace(/(?:(?:^|.*;\s*)fresh\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
      xhr1.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

      xhr1.send();
    }
  }
}

let userLogin = JSON.parse(localStorage.getItem('user'));

class GetComments extends React.Component {
      
    constructor(props) {
      super(props)
      this.state = {
        data: [],
        isLoading: false,
        link: 0,
        URL: ((document.cookie === "" || document.cookie === "token=" || document.cookie === "token=undefined; fresh=undefined") || localStorage.getItem('user') === null || document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "") ? 'http://192.168.148.30:8554/api/v2/comments/search/removedIsFalse?page=0&size=5' : 'http://192.168.148.30:8554/api/v2/comments?page=0&size=5',
        update: 0,
        updateData: '',
        name: 'Бумеранг не запущен'
      }
    }

    updateData = (value) => {
      //this.setState({URL: value}, this.callthebase.bind(this));
      //console.log('первый стейт', this.state.URL);
      //console.log('последняя страница', this.state.data._links.last.href);
      
      //console.log(value);
      //if (this.state.data._links.last !== undefined) {
        
        
        
        //console.log('второй стейт - это уже ссылка на посл страницу', this.state.URL);
        //console.log('последняя страница', last);
        
      //} //else {
        //this.setState({URL: localStorage.getItem("lastPage")}, this.callthebase.bind(this));
        
        //console.log('другой стейт', this.state.URL);
        //console.log('последняя страница', this.state.data._links.last.href);
      //}

      if (this.state.data.page && this.state.data.page.totalElements % 5 === 0) {
        if (userLogin === null || userLogin.username !== "admin") {
          localStorage.setItem("lastPage", 'http://192.168.148.30:8554/api/v2/comments/search/removedIsFalse?page=' + (Number(this.state.data.page.totalPages) + '&size=5'));
          //console.log(localStorage.getItem("lastPage"));
          this.setState({URL: localStorage.getItem("lastPage")});

          //console.log('третий стейт - обычный', this.state.URL);
          //console.log('последняя страница', this.state.data._links.last.href);
        } else {
          localStorage.setItem("lastPage", 'http://192.168.148.30:8554/api/v2/comments?page=' + (Number(this.state.data.page.totalPages) + '&size=5'));
          //console.log(localStorage.getItem("lastPage"));
          this.setState({URL: localStorage.getItem("lastPage")});

          //console.log('третий стейт - админ', this.state.URL);
          //console.log('последняя страница', this.state.data._links.last.href);
        }

      } else {
        const last = this.state.data._links.last.href;
        //console.log('начальное значение', this.state.URL);
        
        this.setState({URL: last}, this.callthebase);
      }
      //this.callthebase();

      if (document.querySelector('.review__button--active')) {
        document.querySelector('.review__button--active').classList.remove('review__button--active');
        document.querySelectorAll('.review__button-admin')[1].classList.add('review__button--active');
      }
      
      //this.callthebase;
      //this.callthebase;
      const timeId = setInterval(this.callthebase, 1000);
      
      setTimeout(function() {
        clearInterval(timeId);
      }, 1100);
    }

    componentDidMount() {
      
      //console.log(this.state.URL);
      this.callthebase();
      
      
    }

    callthebase = () => {
      //console.log('стейт в ajax', this.state.URL);
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.state.URL, true);
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
            data: JSON.parse(xhr.responseText),
            isLoading: false,
          })
        }
      }
      
    }
    

    renderComments() {
        
        //const { data } = this.state
        //console.log(data);
        
            const comments = [];
            const buttons = [];
            //const users = [];
            let userLogin = JSON.parse(localStorage.getItem('user'));

            if (this.state.data._embedded !== undefined) {
              
              if (userLogin !== null && userLogin.username === "admin") {
              
                for (var i = 0; i < this.state.data._embedded.comments.length; i++) {
                    comments[i] = this.state.data._embedded.comments[i];
                    //users[i] = this.state.data._embedded.comments[i].user;
                    if (this.state.data._embedded.comments[i].removed === false) {
                      buttons[i] = <button className='review__delete-button' type="button" onClick={this.onDeleteButtonClick}><span className="review__span visually-hidden">{this.state.data._embedded.comments[i]._links.self.href}</span><span className="index visually-hidden">{i}</span></button>;
                    } else {
                      buttons[i] = <button className='review__delete-button visually-hidden' type="button" onClick={this.onDeleteButtonClick}><span className="review__span visually-hidden"></span><span className="index visually-hidden">{i}</span></button>;
                    }
                    //console.log(buttons);
                }

                //console.log('все комменты', comments);
                //console.log('----------------------');

                if (this.state.data._links.last) {
                  //this.setState({lastPage: this.state.data._links.last.href});
                  //this.setState({lastPage: this.state.data._links.last.href});
                  localStorage.setItem("lastPage", this.state.data._links.last.href);
                }
              

                const listComments = comments.map((comment, index) =>
                        <div className='review__block review__block--get' key={index}>
                            <div className='review__row'>
                                <p className='review__text'><span className='review__name'>{comment.user}</span></p>
                                <div className='review__row'>
                                  <p className='review__text'><span className='review__date'>{(getDate(comment.createdDate)).substring(4, 15)}</span></p>
                                  <p className='review__text'><span className='review__date'>{(getDate(comment.createdDate)).substring(16, 25)}</span></p>
                                </div>
                            </div>
                            <div className='review__row'>
                              <p className='review__text'><span className='review__comment'>{comment.comment}</span></p>
                              <div className='review__button-box' key={index}>{buttons[index]}</div>
                              
                            </div>
                        </div>
                );

                
                if (this.state.data._links.profile) {
                  return (
                    <div className='review__container'>
                      <div className='review__left-block'>
                        <div className='review__block review__text-title'>
                            <p className='review__text'><span className='review__title'>Post comment</span></p>
                        </div>
                        <div>
                            <UserForm updateData={this.updateData} />
                            <div className='review__disabled visually-hidden'>
                              <p className='review__text-disabled'>To post a comment please choose "All" in the field below</p>
                            </div>

                            <div className='review__block review__text-title'>
                              <p className='review__text'><span className='review__title'>Show comments</span></p>
                            </div>
                            <div className="review__button-container">
                              <button className="review__button review__button-admin" type="button" onClick={this.onReviewRemovedClick}>Deleted</button>

                              <button className="review__button review__button-admin review__button--active" type="button" onClick={this.onReviewAllClick}>All</button>
                            </div>

                            

                            {/*<div className='review__block review__text-title'>
                              <p className='review__text'><span className='review__title'>Search comments</span></p>
                            </div>
                            <div className="review__button-container review__search">
                              <input className="review__search-input" placeholder="Enter name" />
                            </div>*/}
                        </div>
                      </div>

                      <div className='review__right-block' id="reviews-comments">
                          
                          {listComments}
                          <div className="review__button-container">
                            <button className="review__button review__button-first" type="button" onClick={this.onReviewFirstClick}><span className="visually-hidden">First</span></button>
                            <button className="review__button review__button-prev" type="button" onClick={this.onReviewPrevClick}><span className="visually-hidden">Previous</span></button>
                            <div className="review__page-container">
                              <p className="review__page">{this.state.data.page.number + 1}</p>
                            </div>
                            <button className="review__button review__button-next" type="button" onClick={this.onReviewNextClick}><span className="visually-hidden">Next</span></button>
                            <button className="review__button review__button-last" type="button" onClick={this.onReviewLastClick}><span className="visually-hidden">Last</span></button>
                            <div className="review__page-total-container">
                              <p className="review__page-total">Total pages: <span className="review__page-total--yellow">{this.state.data.page.totalPages}</span></p>
                            </div>
                          </div>
                                          
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className='review__container'>
                      <div className='review__left-block'>
                        <div className='review__block review__text-title'>
                            <p className='review__text'><span className='review__title'>Post comment</span></p>
                        </div>
                        <div className="review__help-block">
                            <UserForm updateData={this.updateData} disabled/>
                            <div className='review__disabled'>
                              <p className='review__text-disabled'>To post a comment please choose "All" in the field below</p>
                            </div>

                            <div className='review__block review__text-title'>
                              <p className='review__text'><span className='review__title'>Show comments</span></p>
                            </div>
                            <div className="review__button-container">
                              <button className="review__button review__button-admin" type="button" onClick={this.onReviewRemovedClick}>Deleted</button>

                              <button className="review__button review__button-admin" type="button" onClick={this.onReviewAllClick}>All</button>
                            </div>
                            
                        </div>
                      </div>

                      <div className='review__right-block' id="reviews-comments">
                          {listComments}
                          <div className="review__button-container">
                            <button className="review__button review__button-first" type="button" onClick={this.onReviewFirstClick}><span className="visually-hidden">First</span></button>
                            <button className="review__button review__button-prev" type="button" onClick={this.onReviewPrevClick}><span className="visually-hidden">Previous</span></button>
                            <div className="review__page-container">
                              <p className="review__page">{this.state.data.page.number + 1}</p>
                            </div>
                            <button className="review__button review__button-next" type="button" onClick={this.onReviewNextClick}><span className="visually-hidden">Next</span></button>
                            <button className="review__button review__button-last" type="button" onClick={this.onReviewLastClick}><span className="visually-hidden">Last</span></button>
                            <div className="review__page-total-container">
                              <p className="review__page-total">Total pages: <span className="review__page-total--yellow">{this.state.data.page.totalPages}</span></p>
                            </div>
                          </div>
                                          
                      </div>
                    </div>
                  )
                }
              } else {
                
                for (var j = 0; j < this.state.data._embedded.comments.length; j++) {
                    
                    if (this.state.data._embedded.comments[j].removed === false) {
                      comments[j] = this.state.data._embedded.comments[j];
                    }
                    //console.log(buttons);
                }

              

                //console.log(comments);

                const listComments = comments.map((comment, index) =>
                        <div className='review__block review__block--get' key={index}>
                            <div className='review__row'>
                                <p className='review__text'><span className='review__name'>{comment.user}</span></p>
                                <div className='review__row'>
                                  <p className='review__text'><span className='review__date'>{(getDate(comment.createdDate)).substring(4, 15)}</span></p>
                                  <p className='review__text'><span className='review__date'>{(getDate(comment.createdDate)).substring(16, 25)}</span></p>
                                </div>
                            </div>
                            <div className='review__row'>
                              <p className='review__text'><span className='review__comment'>{comment.comment}</span></p>
                              
                              
                            </div>
                        </div>
                );

                return (
                  <div className='review__container'>
                    <div className='review__left-block'>
                      <div className='review__block review__text-title'>
                          <p className='review__text'><span className='review__title'>Comment area</span></p>
                      </div>
                      <div>
                          <UserForm updateData={this.updateData}/>
                      </div>
                    </div>

                    <div className='review__right-block' id="reviews-comments">
                          {listComments}
                          <div className="review__button-container">
                            <button className="review__button review__button-first" type="button" onClick={this.onReviewFirstClick}><span className="visually-hidden">First</span></button>
                            <button className="review__button review__button-prev" type="button" onClick={this.onReviewPrevClick}><span className="visually-hidden">Previous</span></button>
                            <div className="review__page-container">
                              <p className="review__page">{this.state.data.page.number + 1}</p>
                            </div>
                            <button className="review__button review__button-next" type="button" onClick={this.onReviewNextClick}><span className="visually-hidden">Next</span></button>
                            <button className="review__button review__button-last" type="button" onClick={this.onReviewLastClick}><span className="visually-hidden">Last</span></button>
                            <div className="review__page-total-container">
                              <p className="review__page-total">Total pages: <span className="review__page-total--yellow">{this.state.data.page.totalPages}</span></p>
                            </div>
                          </div>              
                    </div>
                  </div>
                )
                
              }
            }
    }

    

    onDeleteButtonClick = (e) => {
      const URL = e.target.querySelector('.review__span').innerHTML;
      let userLogin = JSON.parse(localStorage.getItem('user'));

      const xhr = new XMLHttpRequest();
      //const index  = Number(e.target.querySelector('.index').innerHTML);
      console.log("-------------------------------------"); 
      console.log('URL for delete ', URL);
      xhr.open('DELETE', URL, true);

      //console.log('token =', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
      //console.log('fresh = ', document.cookie.replace(/(?:(?:^|.*;\s*)fresh\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
      xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

      xhr.send();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          console.log(xhr.status);
          if (xhr.status === 401 && userLogin.username === "admin") {
            console.log("no auth");
            getToken(URL, 'DELETE');
                
          }
        }
      }

      const timeId = setInterval(this.callthebase, 1000);
  
      setTimeout(function() {
        clearInterval(timeId);
      }, 1100);
      
    }

    onReviewPrevClick = (e) => {
      if (this.state.data._links.prev) {
        this.setState({URL: this.state.data._links.prev.href}, this.callthebase.bind(this));
        //console.log(this.state.data._links.last.href);
        //console.log(this.state.URL);
      }
    }

    onReviewNextClick = (e) => {
      if (this.state.data._links.next) {
        this.setState({URL: this.state.data._links.next.href}, this.callthebase.bind(this));
        //console.log(this.state.data._links.next.href);
        //console.log(this.state.URL);
      }
    }

    onReviewFirstClick = (e) => {
      if (this.state.data._links.prev) {
        this.setState({URL: this.state.data._links.first.href}, this.callthebase.bind(this));
        //console.log(this.state.data._links.last.href);
        //console.log(this.state.URL);
      }
    }

    onReviewLastClick = (e) => {
      if (this.state.data._links.next) {
        this.setState({URL: this.state.data._links.last.href}, this.callthebase.bind(this));
        //console.log(this.state.data._links.next.href);
        //console.log(this.state.URL);
      }
    }

    onReviewRemovedClick = (e) => {
        this.setState({URL: 'http://192.168.148.30:8554/api/v2/comments/search/removedIsTrue?page=0&size=5'}, this.callthebase.bind(this));
        if (document.querySelector('.review__button--active')) {
          document.querySelector('.review__button--active').classList.remove('review__button--active');
          document.querySelectorAll('.review__button-admin')[0].classList.add('review__button--active');
        }
        
    }

    /*onReviewSavedClick = (e) => {
        this.setState({URL: 'http://192.168.148.30:8554/api/v2/comments/search/removedIsFalse'}, this.callthebase);
        if (document.querySelector('.review__button--active')) {
          document.querySelector('.review__button--active').classList.remove('review__button--active');
          document.querySelectorAll('.review__button-admin')[1].classList.add('review__button--active');
        }
        
    }*/

    onReviewAllClick = (e) => {
        this.setState({URL: 'http://192.168.148.30:8554/api/v2/comments?page=0&size=5'}, this.callthebase.bind(this));
        if (document.querySelector('.review__button--active')) {
          document.querySelector('.review__button--active').classList.remove('review__button--active');
          document.querySelectorAll('.review__button-admin')[1].classList.add('review__button--active');
        }
        
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

  /*window.onload = function() {
    const block = document.querySelector('.review__left-block');
    console.log(block);
    if (window.scrollY > 100) {
      block.style = 'position: fixed; top: 100px; width: 500px; display: flex; flex-direction: column;';
    }
  }*/

  window.onload = function() {
    
    window.onscroll = function() {
      const block = document.querySelector('.review__left-block');
      const rightBlock = document.querySelector('.review__right-block');
      //const search = document.querySelector('.review__search-box');
      //console.log(block);
      //const blockSourceBottom = block.getBoundingClientRect().bottom + window.pageYOffset;
      if (rightBlock !== null) {
        if (rightBlock.getBoundingClientRect().top >= 45) {
          block.style = 'width: 500px; display: flex; flex-direction: column;';
          rightBlock.style = 'width: 500px; display: flex; flex-direction: column;';
          //search.style = '';
        } else if (rightBlock.getBoundingClientRect().top < 45) {
          block.style = 'position: fixed; top: 45px; width: 500px; display: flex; flex-direction: column;';
          rightBlock.style = 'width: 500px; display: flex; flex-direction: column; margin-left: 650px;';
          //search.style = 'position: fixed; top: 605px; left:50%; margin-left: -575px;  width: 500px;';
        }
      }
    }
  };

  window.onunload = function () {
    //userLogin = null;
  }

  window.getToken = getToken;

export default GetComments;
