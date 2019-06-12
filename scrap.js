// ellipsize-text **** SELECT TITLE

const title = document.querySelector('.ellipsize-text').innerText;
let section = 'search'
let type = 'tv'
let URL = new URL(`https://api.themoviedb.org/3/${section}/${type}`)
let params = {
    api_key:'295842393e648bbfdc4b797075d713f5',
    query: 
}

api_key=295842393e648bbfdc4b797075d713f5&language=en-US&query=the%20office&page=1'