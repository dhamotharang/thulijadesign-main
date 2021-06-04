import { Component, OnInit } from '@angular/core';

import { Group } from '../../../shared/models/core/group';
import { GroupService } from '../../../shared/services/core/group.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
	selector: 'app-group-manager-menu',
	templateUrl: './group-manager-menu.component.html',
	styleUrls: ['./group-manager-menu.component.css']
})
export class GroupManagerMenuComponent implements OnInit {

	public group:Group;
	public groupId:number;

	constructor(private router:Router, private route: ActivatedRoute, 
		private groupService:GroupService) {
	}

	ngOnInit() {
		this.route.paramMap.subscribe((params:ParamMap) => {
			this.groupId = +params.get('id');
			this.groupService.findById(this.groupId).subscribe((group:Group) => {
				this.group = group;
			})
		});
	}

	back() {
		this.router.navigate(['/masterdetail/groups']);
	}

}
