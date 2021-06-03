Create Angular Project
--------------------------------------------------------------------------------------------------------
ng new webclient --routing=false --style=css
cd webclient

Add material design
--------------------------------------------------------------------------------------------------------
ng add @angular/material
npm install moment --save
npm install @angular/material-moment-adapter --save

Add Libraries
--------------------------------------------------------------------------------------------------------
npm install ng2-charts@2.4.0 --save
npm install chart.js --save
npm install ts-md5 --save
npm install @tinymce/tinymce-angular --save
npm install tinymce --save
npm install ngx-material-timepicker --save
npm install ngx-extended-pdf-viewer --save
npm install @angular/flex-layout --save

Add the following in angular.json
--------------------------------------------------------------------------------------------------------
"assets": [
	{ "glob": "**/*", "input": "node_modules/ngx-extended-pdf-viewer/assets/", "output": "/assets/" },
	{ "glob": "**/*", "input": "node_modules/tinymce/skins", "output": "/tinymce/skins/" },
	{ "glob": "**/*", "input": "node_modules/tinymce/themes", "output": "/tinymce/themes/" },
	{ "glob": "**/*", "input": "node_modules/tinymce/plugins", "output": "/tinymce/plugins/" },
	{ "glob": "**/*", "input": "node_modules/tinymce/icons", "output": "/tinymce/icons/" }
]

"scripts": [ "node_modules/tinymce/tinymce.min.js" ]

Copy the generated code
-------------------------------------------------------------------------------------------------------- 
copy app and assets folder
copy style.css