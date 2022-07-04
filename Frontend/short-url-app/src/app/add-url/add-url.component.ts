import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UrlService } from '../url.service';

@Component({
  selector: 'add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.scss']
})
export class AddUrlComponent implements OnInit {
  @ViewChild('longUrl') longUrl!:ElementRef;
  shortUrl:String="";
  errMsg!:String;

  constructor(private urlService:UrlService) { }

  ngOnInit(): void {
  }

  shortLink(){
    const url = this.longUrl.nativeElement.value
    this.urlService.shortLink(url).subscribe((result)=>{
      if(result.converted)
      {
        this.shortUrl = result.url.shortUrl;
        this.longUrl.nativeElement.value=""
        this.newLink(result.url)
      }
      else{
        this.errMsg = result.errMsg;
      }
     
    })
    

  }

  newLink(link:any) {
    this.urlService.changeMessage(link)
  }

}
