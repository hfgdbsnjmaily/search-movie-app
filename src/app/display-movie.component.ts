import { Component, OnInit, Input } from '@angular/core';
import{ Movie } from './Movie'

@Component({
  selector: 'display-movie',
  templateUrl: './display-movie.component.html',
  styleUrls: ['./display-movie.component.css']
})
export class DisplayMovieComponent implements OnInit {
    @Input() movie:Movie
  constructor() { }

  ngOnInit() {
  }
}
