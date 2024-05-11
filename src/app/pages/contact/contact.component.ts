import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  imageUrl?: Observable<string>;
  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
    const ref = this.storage.ref('images/contact.jpg');
    this.imageUrl = ref.getDownloadURL();
  }

}
