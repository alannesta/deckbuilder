module.exports = function(config) {
    config.set({
        basePath: './',
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-aria/angular-aria.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-material/angular-material.js',
            'app/bower_components/firebase/firebase.js',
            'app/bower_components/angularfire/dist/angularfire.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/underscore/underscore.js',
            'app/scripts/app.js',       //!important have to explicitly load the module dependencies before all other files
            'app/scripts/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        //karma-coverage configuration

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app/scripts/**/*.js': ['coverage']
        },
        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        }

    });
};
