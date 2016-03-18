module.exports = function (grunt) {
  var config = {
    jshint: {
      options: {
        ignores: ['node_modules/**', 'public/vendor/**', '**/*.min.js'],
        jshintrc: '.jshintrc'
      },
      gruntfile: 'Gruntfile.js',
      server: ['controllers/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'app.js', 'config.js'],
      client: 'frontend/src/js/**/*.js'
    },
    copy: {
      toBuild: {
        files: [{
          cwd: 'frontend/src/',
          src: ['**'],
          dest: 'frontend/build/',
          expand: true
        }]
      },
      toDist: {
        files: [{
          cwd: 'frontend/build/',
          src: ['**'],
          dest: 'frontend/dist/',
          expand: true
        }]
      },
      vendorJS: {
        files: [{
          expand: true,
          src: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/react/dist/react.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
          ],
          dest: 'frontend/build/vendor/js/',
          flatten: true,
          filter: 'isFile'
        }]
      },
      vendorCSS: {
        files: [{
          expand: true,
          src: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
          ],
          dest: 'frontend/build/vendor/css/',
          flatten: true,
          filter: 'isFile'
        }]
      }
    },
    babel: {
      dist: {
        files: [{
          cwd: 'frontend/build/jsx/',
          src: ['**/*.jsx'],
          dest: 'frontend/build/js/',
          ext: '.js',
          expand: true
        }]
      }
    },
    concat: {
      css: {
        // add your css files over here to concatenate all css files
        // let's save our site users some bandwith
        files: {
          'frontend/build/css/app.styles.min.css': ['node_modules/bootstrap/dist/css/bootstrap.min.css', 'frontend/dist/css/styles.min.css'],
        }
      }
    },
    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        }
      },
      target: {
        // add your js files over here to minify them into one javascript source file
        'frontend/dist/js/app.min.js': ['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'public/js/main.js']
      }
    },
    less: {
      src: {
        files: [{
          expand: true,
          cwd: 'frontend/src/less',
          src: '**/*.less',
          dest: 'frontend/src/less/dist',
          ext: '.css'
        }]
      }
    },
    cssmin: {
      src: {
        files: [{
          expand: true,
          cwd: 'frontend/build/css',
          src: '**/*.css',
          dest: 'frontend/build/css',
          ext: '.min.css'
        }]
      }
    },
    watch: {
      all: {
        files: ['frontend/src/**/*', 'views/**', '!**/node_modules/**', '!frontend/dist/**/*', '!**/*.min.*'],
        options: {
          livereload: 3006
        }
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      scripts: {
        files: 'frontend/src/js/**/*.js',
        tasks: ['jshint:client']
      },
      server: {
        files: '<%= jshint.server %>',
        tasks: 'jshint:server'
      },
      less: {
        files: ['frontend/src/less/**/*.less'],
        tasks: ['less', 'cssmin', 'concat:css']
      }
    },
    concurrent: {
      tasks: ['watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  };

  grunt.initConfig(config);

  // Load the tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'copy:toBuild', 'copy:vendorJS', 'copy:vendorCSS', 'copy:toDist']);
  grunt.registerTask('production', ['jshint', 'uglify', 'less', 'cssmin', 'concat:css', 'concurrent']);
  // grunt.registerTask('copyToBuild', ['copyToBuild']);

};
