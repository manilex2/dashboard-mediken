import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from 'src/app/admin/models/user.model';
import { UserService } from 'src/app/admin/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: '../views/menu.component.html',
  styleUrls: ['../styles/menu.component.scss']
})
export class MenuComponent implements OnInit {
  profile?: User;
  profilePic?: SafeResourceUrl;

  constructor(
    private userService: UserService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.getProfilePic();
  }

  getProfile() {
    this.userService.getUserProfile().subscribe(profileInfo => {
      this.profile = profileInfo;
    });
  }

  getProfilePic() {
    this.userService.getUserProfilePic().subscribe(response => {
      var urlCreator = window.URL || window.webkitURL;
      this.profilePic = this.domSanitizer.bypassSecurityTrustResourceUrl(urlCreator.createObjectURL(response));
    })
  }

}
