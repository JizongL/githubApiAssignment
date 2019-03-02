'use strict';

const store = {
  repos:[]
};

function getResponse(username){
  console.log('`getResponse()` ran');
  return fetch(`https://api.github.com/users/${username}/repos`);
}

function makingResultString(){
  let htmlArray = [];
  for(let i = 0;i < store.repos.length;i++ ){
    htmlArray.push(`<li> <a href=${store.repos[i].url}>${store.repos[i].repo}</a> </li>`);
    
  
  }
  return htmlArray;
}

function render(){
  console.log(makingResultString());
  $('#results-list').empty();
  $('#js-error-message').empty();
  $('#results-list').html(makingResultString());
}



function formListenerHandle(){
  console.log('listening to form');
  $('form').on('submit',function(event){
    event.preventDefault();
    let username = $('#js-search-term').val();
    getResponse(username)
      .then(response => {if(response.ok){
        return response.json();}
      throw new Error(response.statusText);

      })
      .then(repos => repos.forEach(repo => store.repos.push({repo:repo.name,url:repo.html_url})))
      .catch(err => {
        $('#results-list').empty();
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
    render();
  });
}

$(formListenerHandle);