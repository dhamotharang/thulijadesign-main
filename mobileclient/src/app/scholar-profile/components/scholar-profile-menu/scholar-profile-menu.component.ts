import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
	selector: 'app-scholar-profile-menu',
	templateUrl: './scholar-profile-menu.component.html',
	styleUrls: ['./scholar-profile-menu.component.scss']
})
export class ScholarProfileMenuComponent implements OnInit {

	constructor(private router:Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
	}

	back() {
		this.router.navigate(['/masterdetail/programs']);
	}

}
