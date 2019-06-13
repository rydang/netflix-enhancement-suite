// ellipsize-text **** SELECT TITLE

function getAuthors(showDetails, type, api_key) {
  fetch(`https://api.themoviedb.org/3/${type}/${showDetails['id']}/credits?api_key=${api_key}`)
  .then(response => response.json())
  .then(parsedJson => {
    const cast = [];
    for(let i = 0; i < parsedJson.cast.length; i += 1) {
      cast.push(parsedJson.cast[i]['name']);
    }
    chrome.storage.sync.set({mdb_cast: cast}, () => {
      console.log('cast set: ', cast);
    })
  })
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
    // store in local storage
    chrome.storage.sync.set({mdb_details: parsedJson.results[0]}, () => {
      console.log('details set :', parsedJson.results[0]);
    });

    getAuthors(showDetails, type, api_key);

    return (parsedJson.results[0]);
  })
}

fetch(`https://www.netflix.com/api/shakti/vc1c06d28/metadata?movieid=${window.location.pathname.match(/(?<=watch\/)(.*)/g)[0]}`, {
  credentials: 'include'
})
.then((resp)=>{
    return resp.json();
})
.then((jsonObj)=>{
      sendMDBRequest(jsonObj.video.title,  jsonObj.video.type === 'movie' ? 'movie' : 'tv');
});



