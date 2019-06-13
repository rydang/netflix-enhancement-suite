
function getRoles(actorId, api_key) {
    fetch(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${api_key}`)
    .then(response => response.json())
    .then(parsedJson => {
      // chrome.storage.sync.set({`${cast}_roles`: parsedJson.cast})
      parsedJson.cast.forEach((ele)=>{
        console.log(ele)
      })
      console.log(parsedJson.cast);
    });
  }

function getActors(showDetails, type, api_key) {
  fetch(`https://api.themoviedb.org/3/${type}/${showDetails['id']}/credits?api_key=${api_key}`)
  .then(response => response.json())
  .then(parsedJson => {
    // const cast = [];
    // const castIds = [];
    for(let i = 0; i < parsedJson.cast.length; i += 1) {
      // cast.push(parsedJson.cast[i]['name']);
      // castIds.push(parsedJson.cast[i]['id']);
      let div = document.createElement('div');
      div.classList.add('person')
      div.id = parsedJson.cast[i]['id'];
      div.innerHTML = `<h4 id='${parsedJson.cast[i]['id']}'>${parsedJson.cast[i].name} as ${parsedJson.cast[i].character}</h4><img id='${parsedJson.cast[i]['id']}' src='${'http://image.tmdb.org/t/p/w185'+parsedJson.cast[i]['profile_path']}'>`
      // img.src = 'http://image.tmdb.org/t/p/w185'+parsedJson.cast[i]['profile_path']
      div.addEventListener('click', function(event) {
        //console.log(event.target.id);
        getRoles(event.target.id, api_key);
      })
      document.querySelector('#actors').appendChild(div);

    }
  });
}

function sendMDBRequest(title, type) {
  let section = 'search'
  let api_key = '295842393e648bbfdc4b797075d713f5';
  let URL = `https://api.themoviedb.org/3/${section}/${type}?api_key=${api_key}&query=${title}`
  
  fetch(URL).then((response)=>{
      return response.json();
  })
  .then((parsedJson)=>{
    let showDetails = parsedJson.results[0];
    getActors(showDetails, type, api_key);

    return (parsedJson.results[0]);
  })
}

function populate (){
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    
    chrome.tabs.sendMessage(tabs[0].id, {"message": "getID"}, function(response){ 
      fetch(`https://www.netflix.com/api/shakti/vc1c06d28/metadata?movieid=${response.movieID}`, {
        credentials: 'include'
      })
      .then((resp)=>{
          return resp.json();
      })
      .then((jsonObj)=>{
        console.log(jsonObj);
          sendMDBRequest(jsonObj.video.title,  jsonObj.video.type === 'movie' ? 'movie' : 'tv');
      });
    });
   });
}

document.addEventListener("DOMContentLoaded", populate);
