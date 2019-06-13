// get request to obtain other roles
// store roles in local storage
function getRoles(actors, api_key) {
  for(let i = 0; i < actors.length; i++) {
    const person_id = actors[i]['id'];

    fetch(`https://api.themoviedb.org/3/person/${person_id}/combined_credits?api_key=${api_key}`)
    .then(response => response.json())
    .then(parsedJson => {
      const key = {};
      key[person_id] = parsedJson.cast;
      
      chrome.storage.local.set(key, () => {});
    });
  }
}

// get request to obtain list of actors and their ids
// store information in local storage
function getActors(showDetails, type, api_key) {
  fetch(`https://api.themoviedb.org/3/${type}/${showDetails['id']}/credits?api_key=${api_key}`)
  .then(response => response.json())
  .then(parsedJson => {

    chrome.storage.local.set({mdb_cast: parsedJson.cast}, () => {
      console.log('cast set: ', parsedJson.cast);
    });

    getRoles(parsedJson.cast, api_key);
  });
}

// send request to mdb to obtain movie title and type
function sendMDBRequest(title, type) {
  const section = 'search'
  const api_key = '295842393e648bbfdc4b797075d713f5';
  const URL = `https://api.themoviedb.org/3/${section}/${type}?api_key=${api_key}&query=${title}`
  
  // search for movie id
  fetch(URL).then((response)=>{
      return response.json();
  })
  .then((parsedJson)=>{
    const showDetails = parsedJson.results[0];
    // store in local storage
    chrome.storage.local.set({mdb_details: parsedJson.results[0]}, () => {
      console.log('details set :', parsedJson.results[0]);
    });

    getActors(showDetails, type, api_key);
  })
}

// first fetch request that latchs onto netflix api request
function start() {
  let id = window.location.pathname.match(/(?<=watch\/)(.*)/g);
  if(id === null) return;
  fetch(`https://www.netflix.com/api/shakti/vc1c06d28/metadata?movieid=${id[0]}`, {
    credentials: 'include'
  })
  .then((resp)=>{
    return resp.json();
  })
  .then((jsonObj)=>{
    sendMDBRequest(jsonObj.video.title,  jsonObj.video.type === 'movie' ? 'movie' : 'tv');
  });
}

start();




