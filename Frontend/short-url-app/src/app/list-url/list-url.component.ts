import { Component, OnInit } from '@angular/core';
import { UrlService } from '../url.service';

@Component({
  selector: 'list-url',
  templateUrl: './list-url.component.html',
  styleUrls: ['./list-url.component.scss']
})
export class ListUrlComponent implements OnInit {
  urls: any;
  constructor(private urlService: UrlService) { }

  ngOnInit(): void {
    this.urlService.getUrls().subscribe((result) => {
      this.urls = result;
    })
    this.urlService.currentMessage.subscribe((result) => {
      if (result != null) {
        this.urls.push(result)
      }
    })

  }

  delete(id: String, index: Number) {
    this.urlService.deleteUrl(id).subscribe((result) => {
      if (result) {
        this.urls.splice(index, 1)
      }

    })
  }

}
