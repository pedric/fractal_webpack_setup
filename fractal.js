const path = require('path');

const fractal = module.exports = require('@frctl/fractal').create();
const pkg = require(path.join(__dirname, 'package.json'));


/*-------------------------------------------------------*\
  Feel free to adapt Fractal config below to your needs
\*-------------------------------------------------------*/

/**
 * Metadata
 */
fractal.set('project.title', 'Common components');
fractal.set('project.author', 'Fredrik Larsson');
// Provide the package.json "version" to the templates
fractal.set('project.version', pkg.version);

/**
 * Custom settings
 */
const customisedTheme = require('@frctl/mandelbrot')({
   // panels: ['html', 'view', 'context', 'resources', 'info', 'notes'],
   skin: 'black'
});
// specify a directory to hold the theme override templates
customisedTheme.addLoadPath(__dirname + '/theme-overrides');
fractal.web.theme(customisedTheme);

/**
 * Files location
 */
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.docs.set('path', path.join(__dirname, 'docs'));
fractal.web.set('static.path', path.join(__dirname, 'public'));

/**
 * Build options
 */
// If you change the build destination, you should adapt webpack.common.js "output.path" too.
fractal.web.set('builder.dest', 'dist');

/**
 * Templating
 */
// Use Nunjucks as the template engine
fractal.components.engine('@frctl/nunjucks');
fractal.docs.engine('@frctl/nunjucks');
fractal.components.set('ext', '.nunj');

// Twig (node 10?)
// const twigAdapter = require('@frctl/twig')();
// fractal.components.engine(twigAdapter);
// fractal.docs.engine(twigAdapter);
// fractal.components.set('ext', '.twig');


/*----------------------------------------*\
  Change the following at your own risk
\*----------------------------------------*/

/**
 * Server configuration
 */
fractal.web.set('server.port', 4000);
fractal.web.set('server.sync', true);

/**
 * Prevent Bluebird warnings like "a promise was created in a handler but was not returned from it"
 * caused by Nunjucks from polluting the console
 */
const bluebird = require('bluebird');
bluebird.config({
  warnings: false
});
