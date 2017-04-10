(function(global) {
  
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'rxjs':                       'node_modules/rxjs',
    'ng2-tag-input':              '/node_modules/ng2-tag-input',
    '@angular/animations':        '/node_modules/@angular/animations/bundles/animations.umd.js',
    '@angular/animations/browser': '/node_modules/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations': '/node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'ng2-tag-input':              { main: 'dist/ng2-tag-input.bundle.js', defaultExtension: 'js' },
    'ng2-material-dropdown':      { defaultExtension: 'js', main: 'dist/ng2-dropdown.bundle.js'},
    'ng2-tag-input/modules/components/tag-input.template.html': { defaultJSExtension: false }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);