// Generated on 2014-05-05 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-include-source');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        options: {
          livereload: true
        }
      },
      // jsTest: {
      //    files: ['test/spec/{,*/}*.js', '<%= yeoman.app %>/scripts/{,*/}*.js'],
      //    tasks: ['karma']
      // },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '<%= yeoman.app %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg,css}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        //hostname: 'localhost',
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Automatically inject Bower components into the app
    bowerInstall: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: '<%= yeoman.app %>/'
      }
    },

    // include source file
    includeSource: {
      options: {
        basePath: 'app',
        baseUrl: 'scripts/',
        templates: {
          html: {
            js: '<script src="{filePath}"></script>'
          },
        },
      }
    },


    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }

  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'bowerInstall',
      'includeSource',
      'connect:livereload',
      'watch'
    ]);
  });

  // grunt.registerTask('test', [
  //   'clean:server',
  //   'concurrent:test',
  //   'autoprefixer',
  //   'connect:test',
  //   'karma:unit'
  // ]);

  // grunt.registerTask('build', [
  //   'clean:dist',
  //   'bowerInstall',
  //   'useminPrepare',
  //   'concurrent:dist',
  //   'autoprefixer',
  //   'concat',
  //   'ngmin',
  //   'copy:dist',
  //   'cdnify',
  //   'cssmin',
  //   'uglify',
  //   'rev',
  //   'usemin',
  //   'htmlmin'
  // ]);

  // grunt.registerTask('default', [
  //   'test',
  //   'build'
  // ]);
};
