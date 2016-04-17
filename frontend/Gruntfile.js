module.exports = function (grunt) {
  var config = {
    clean: {
      build: ['build/', 'dist/']
    },
    copy: {
      toBuild: {
        files: [{
          cwd: 'src/',
          src: ['**'],
          dest: 'build/',
          expand: true
        }]
      },
      toDist: {
        files: [{
          cwd: 'build/',
          src: ['css/*', 'css/**/*', 'img/*', 'img/**/*', 'vendor/*', 'vendor/**/*'],
          dest: 'dist/',
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
          dest: 'build/vendor/js/',
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
          dest: 'build/vendor/css/',
          flatten: true,
          filter: 'isFile'
        }]
      }
    },
    babel: {
      dist: {
        files: [{
          cwd: 'build/jsx/',
          src: ['**/*.jsx'],
          dest: 'build/js/',
          ext: '.js',
          expand: true
        }]
      }
    },
    browserify: {
      vendor: {
        src: [],
        dest: 'dist/vendor/js/vendor.js',
        options: {
          require: ['jquery']
        }
      },
      client: {
        src: ['build/**/*.jsx'],
        dest: 'dist/js/app.js',
        options: {
          transform: ['babelify'],
          external: ['jquery']
        }
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
  };

  grunt.initConfig(config);

  // Load the tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['clean:build', 'copy:toBuild', /*'babel',*/ 'browserify', 'copy:toDist']);
  grunt.registerTask('production', ['uglify', 'less', 'cssmin', 'concat:css', 'concurrent']);

};
