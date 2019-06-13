// whenever a picture is clicked
// obtain roles from local storage
// create text elements on popup
function getRoles(actorId) {
  // actor roles
  chrome.storage.local.get([actorId], (result) => {
    const roles = result[actorId];
    const textContainer = document.querySelector('#roles');
    textContainer.innerText = "";
    
    document.querySelector('#roleHeading').innerText = 'Roles from other media:';

    console.log(roles);

    roles.forEach(roleInfo => {
      const roleText = document.createElement('div');
      let character = roleInfo['character'];
      let title = roleInfo['title'];
      if(character === "" || character === undefined) {
        character = 'Extra';
      }
      if(title === "" || title === undefined) {
        title = roleInfo['name'];
      }
      if(title === "" || title === undefined) {
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

// obtain details from local storage
// obtain title
// obtain actors
// obtain roles
// create text elements on popup

function defaultPopup() {
  // movie details
  chrome.storage.local.get(['mdb_details'], (result) => {
    let title = result['mdb_details']['name'] || result['mdb_details']['title'];
    document.querySelector('#showTitle').innerText = title;
  })

  // movie actors
  chrome.storage.local.get(['mdb_cast'], (result) => {
    result['mdb_cast'].forEach(castMember => {
      let div = document.createElement('div');
      div.classList.add('person')
      div.id = castMember['id'];
      let character = (castMember.character !== "") ? castMember.character : 'Extra';
      let picturePath = (castMember['profile_path'] !== null) ? 'http://image.tmdb.org/t/p/w185'+castMember['profile_path'] : 'default.jpg';
      div.innerHTML = `<h4 id='${castMember['id']}'>${castMember.name} as ${character}</h4><img id='${castMember['id']}' src='${picturePath}'>`
      div.addEventListener('click', function(event) {
        getRoles(event.target.id);
      })
      document.querySelector('#actors').appendChild(div);
    });
  })
}

defaultPopup();
