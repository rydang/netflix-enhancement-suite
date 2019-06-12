// ellipsize-text **** SELECT TITLE
console.log('testing');
const title = document.querySelector('.ellipsize-text').innerText;
let section = 'search'
let type = 'tv' 
let URL = new URL(`https://api.themoviedb.org/3/${section}/${type}`)
let params = {
    api_key:'295842393e648bbfdc4b797075d713f5',
    query: title,
    page: 1
};
URL.search = new URLSearchParams(params);

fetch(URL).then((response)=>{
    console.log(response.json());
});

