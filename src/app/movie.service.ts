import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Movie } from './Movie'

@Injectable()
export class MovieService {


    private selectedMovie$:Subject<Movie> = new Subject<Movie>()
    private apiKey:string = "d7b23afee71f6dffd7d0f19f0c8b7b2e"
    private baseApiUrl = "https://api.themoviedb.org/3/search/movie"
    private baseConfigurationUrl:string = "https://api.themoviedb.org/3/configuration"
    private imageBaseUrl:string = ""
    private imageSize:{ backdrop?:string[], poster?:string[] } = {}

  constructor( private http:HttpClient ) {

    this.setImageConfiguration()
  }

    get currentMovie() {
        return this.selectedMovie$
    }

    searchMovie(query:string) {
        const params = new HttpParams().set('api_key', this.apiKey).set('query', query)
        return this.http.get<any>(this.baseApiUrl, { params })
            .map( res => res.results
                 .map((result:Movie) => {
                    return {
                        ...result,
                        backdropUrl:this.createPhotoUrl(result.backdrop_path, true),
                        posterUrl:this.createPhotoUrl(result.poster_path, false)
                    }
        }) )
    }

    changeSelectedMovie(movie:Movie) {
        this.selectedMovie$.next(movie)
    }

    setImageConfiguration() {

       const params = new HttpParams().set('api_key', this.apiKey)

       this.http.get<any>(this.baseConfigurationUrl, { params })
           .map( res => res)
            .subscribe((config) => {
                this.imageBaseUrl = config.images.base_url,
                this.imageSize = {
                backdrop: config.images.backdrop_sizes,
                poster: config.images.poster_sizes
           }
           console.log (this.imageBaseUrl)
           console.log (this.imageSize)
       })
    }

    createPhotoUrl(path:string, isBackdrop:boolean) {
        if(!path) {
            return ""
        }
        const { backdrop, poster } = this.imageSize

        const imageSize = isBackdrop ? backdrop[0] : poster[ poster.length - 1]
        return `${this.imageBaseUrl}${imageSize}${path}`

    }
}


















