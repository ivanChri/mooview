import { getNewMovies,getTrendingMovies,getPopularMovies } from "../../../utils/tmdb"
import ContentParent from "../homeContent/contentParent/contentParent"
export function TrendingSection(){
    return(
      <ContentParent
      class='trending-section'
      fetch={getTrendingMovies}
      title='Trending'
      keyword={[
       {
         name:'Today',
         param:'day'
       },
       {
         name:'This Week',
         param:'week'
       },
   ]}
     classNext='trending-next-class'
     classPrev='trending-prev-class'
      classDrag='trending-drag-class'
     classScroll='trending-scroll-class'
      />
    )
}
export  function NewMovieSection(){
   return (
    <ContentParent
     class='new-movie-section'
     fetch={getNewMovies}
     title="what's New"
     keyword={[
      {
        name:'Upcoming',
        param:'upcoming'
      },
      {
        name:'Now playing',
        param:'now_playing'
      },
  ]}
  classNext='newMovie-next-class'
  classPrev='newMovie-prev-class'
  classDrag='newMovie-drag-class'
  classScroll='newMovie-scroll-class'
     />
   )
}
export function RecomendMovieSection(){
    return(
        <ContentParent
         class='recomend-movie-section'
          title="Recomend"
          fetch={getPopularMovies}
          keyword={[
              {
                name:'Popular',
                param:'popular'
              },
              {
                name:'Top Rated',
                param:'top_rated'
              },
          ]}
          classNext='popularMovie-next-class'
          classPrev='popularMovie-prev-class'
          classDrag='popularMovie-drag-class'
          classScroll='popularMovie-scroll-class'
          />
    )
  }