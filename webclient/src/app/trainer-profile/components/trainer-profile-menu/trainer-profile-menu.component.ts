import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
	selector: 'app-trainer-profile-menu',
	templateUrl: './trainer-profile-menu.component.html',
	styleUrls: ['./trainer-profile-menu.component.css']
})
export class TrainerProfileMenuComponent implements OnInit {

	constructor(private router:Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
	}

	back() {
		this.router.navigate(['/masterdetail/programs']);
	}

}
