Create Angular Project
--------------------------------------------------------------------------------------------------------
ionic start mobileclient --routing=false --style=css
cd mobileclient

IONIC Libraries
--------------------------------------------------------------------------------------------------------
npm install @ionic-native/in-app-browser --save
npm install @ionic-native/splash-screen --save
npm install @ionic-native/status-bar --save
npm install @angular/service-worker --save

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