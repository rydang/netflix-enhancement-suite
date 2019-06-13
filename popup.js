chrome.storage.sync.get(['mdb_details'], (result) => {
  let text = document.createElement('h3');
  text.innerText = result['mdb_details']['name'];
  document.body.appendChild(text);
})

chrome.storage.sync.get(['mdb_cast'], (result) => {
  let heading = document.createElement('h4');
  heading.innerText = 'Actors:';
  document.body.appendChild(heading);
  
  result['mdb_cast'].forEach(castMember => {
    let text = document.createElement('p');
    text.innerText = castMember;
    document.body.appendChild(text);
  })
})
