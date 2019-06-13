
function getRoles(actorIds, actorNames, api_key) {
  for(let i = 0; i < actorIds.length; i++) {
    const person_id = actorIds[i];
    fetch(`https://api.themoviedb.org/3/person/${person_id}/combined_credits?api_key=${api_key}`)
    .then(response => response.json())
    .then(parsedJson => {
      // chrome.storage.sync.set({`${cast}_roles`: parsedJson.cast})
      console.log(parsedJson.cast);
    });
  }
}

function getActors(showDetails, type, api_key) {
  fetch(`https://api.themoviedb.org/3/${type}/${showDetails['id']}/credits?api_key=${api_key}`)
  .then(response => response.json())
  .then(parsedJson => {
    const cast = [];
    const castIds = [];
    for(let i = 0; i < parsedJson.cast.length; i += 1) {
      cast.push(parsedJson.cast[i]['name']);
      castIds.push(parsedJson.cast[i]['id']);
      let div = document.createElement('div');
      div.classList.add('person')
      div.innerHTML = `<h4>${parsedJson.cast[i].name} as ${parsedJson.cast[i].character}</h4><img src='${'http://image.tmdb.org/t/p/w185'+parsedJson.cast[i]['profile_path']}'>`
      // img.src = 'http://image.tmdb.org/t/p/w185'+parsedJson.cast[i]['profile_path']
      document.querySelector('#actors').appendChild(div);

    }
    getRoles(castIds, cast, api_key);
  });
}

function sendMDBRequest(title, type) {
  let section = 'search'
  let api_key = '295842393e648bbfdc4b797075d713f5';
  let URL = `https://api.themoviedb.org/3/${section}/${type}?api_key=${api_key}&query=${title}`
  
  return fetch(URL).then((response)=>{
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
