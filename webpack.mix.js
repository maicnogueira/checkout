const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .sass('resources/views/scss/style.scss', 'public/dist/css/style.css')
    .scripts('node_modules/jquery/dist/jquery.min.js', 'public/dist/js/jquery/jquery.min.js')
    .scripts('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'public/dist/js/bootstrap/bootstrap.bundle.min.js')
    .scripts('node_modules/sweetalert2/dist/sweetalert2.all.min.js', 'public/dist/js/sweetalert2/sweetalert2.min.js')
