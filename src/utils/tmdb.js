import config from "./global/config"
const {url,apiKey} = config
export async function getTrendingMovies(time){
  const getData = await fetch(`${url}/3/trending/all/${time}?api_key=${apiKey}`)
  const data = await getData.json()
  return data.results
}
export async function getNewMovies(status){
  const getData = await fetch(`${url}/3/movie/${status}?api_key=${apiKey}&page=2`)
  const data = await getData.json()
  return data.results
}
export async function getPopularMovies(status){
  const getData = await fetch(`${url}/3/movie/${status}?api_key=${apiKey}`)
  const data = await getData.json()
  return data.results
}
export async function getDetailMovies(id,media){
  const getData = await fetch(`${url}/3/${media}/${id}?api_key=${apiKey}`)
  const data = await getData.json()
  return data
}
export async function searchMovie(query){
  const getData = await fetch(`${url}/3/search/multi?api_key=${apiKey}&query=${query}&include_adult=false`)
  const data = await getData.json()
  return data.results
}
export async function discover(media,userScore,genre){
  const getData = await fetch(`${url}/3/discover/${media}?api_key=${apiKey}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=${userScore}&with_genres=${genre.map(el=>el.id)}&page=1`)
  const data = await getData.json()
  return data.results
}
export async function getGenre(media){
 const getData =  await fetch(`${url}/3/genre/${media}/list?api_key=${apiKey}`)
 const data = await getData.json()
 return data.genres
}