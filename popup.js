// whenever a picture is clicked
function getRoles(actorId) {
  // actor roles
  chrome.storage.local.get([actorId], (result) => {
    const roles = result[actorId];
    const textContainer = document.querySelector('#roles');
    textContainer.innerText = "";
    
    document.querySelector('#roleHeading').innerText = 'Roles from other media:';

    roles.forEach(roleInfo => {
      const roleText = document.createElement('div');
      const character = roleInfo['character'];
      const title = roleInfo['title'];
      if(title === "" || title === undefined || character === "" || character === undefined) {
        return;
      }
      roleText.innerHTML =`${character} from <b style='color: black'>${title}</b>`;
      roleText.style.color = 'white';
      roleText.style.fontSize = "17px";
      textContainer.appendChild(roleText);
    });

    document.body.appendChild(textContainer);
  });
}

function defaultPopup() {
  // movie details
  chrome.storage.local.get(['mdb_details'], (result) => {
    document.querySelector('#showTitle').innerText = result['mdb_details']['name'];
  })

  // movie actors
  chrome.storage.local.get(['mdb_cast'], (result) => {
    result['mdb_cast'].forEach(castMember => {
      let div = document.createElement('div');
      div.classList.add('person')
      div.id = castMember['id'];
      div.innerHTML = `<h4 id='${castMember['id']}'>${castMember.name} as ${castMember.character}</h4><img id='${castMember['id']}' src='${'http://image.tmdb.org/t/p/w185'+castMember['profile_path']}'>`
      // img.src = 'http://image.tmdb.org/t/p/w185'+parsedJson.cast[i]['profile_path']
      div.addEventListener('click', function(event) {
        getRoles(event.target.id);
      })
      document.querySelector('#actors').appendChild(div);
    });
  })
}

defaultPopup();
