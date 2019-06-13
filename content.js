const sendRequestToMDB = () => {
  let section = 'search'
  let type = 'tv' 
  let api_key = '295842393e648bbfdc4b797075d713f5';
  let URL = `https://api.themoviedb.org/3/${section}/${type}?api_key=${api_key}&query=${title}`
  let params = {
      api_key:'295842393e648bbfdc4b797075d713f5',
      query: title,
      page: 1
  };
  URL.search = new URLSearchParams(params);

  fetch(URL).then((response)=>{
      console.log(response.json());
  });
}

// movie db = 295842393e648bbfdc4b797075d713f5
console.log('activated')
console.log(title);

sendRequestToMDB();