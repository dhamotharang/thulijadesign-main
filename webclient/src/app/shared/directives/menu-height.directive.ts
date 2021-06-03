import { Directive, ElementRef, AfterViewChecked, HostListener } from '@angular/core';

@Directive({
	selector: '[menuHeight]'
})
export class MenuHeightDirective implements AfterViewChecked {

	constructor(private el: ElementRef) { }

	ngAfterViewChecked() {
		this.matchHeight(this.el.nativeElement);
	}

	@HostListener('window:resize') 
	onResize() {
		this.matchHeight(this.el.nativeElement);
	}

	matchHeight(parent: HTMLElement) {
		if (!parent) return;
		const children = parent.getElementsByClassName('container');
		if (!children) return;
		Array.from(children).forEach((x: HTMLElement) => {
			x.style.height = 'initial';
		})
		const itemHeights = Array.from(children)
			.map(x => x.getBoundingClientRect().height);
		const maxHeight = itemHeights.reduce((prev, curr) => {
			return curr > prev ? curr : prev;
		}, 0);
		if (maxHeight > 500) {
			parent.style.height = `${maxHeight + 90}px`;
		} else {
			parent.style.height = '100%';
		}
	}

}
