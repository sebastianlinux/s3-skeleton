module.exports = function (grunt) {
    // This banner gets inserted at the top of the generated files, such a minified CSS
    var bannerContent = '/*!\n' +
    ' * <%= pkg.name %>\n'+
    ' * Version: <%= pkg.version %>\n'+
    ' * Build date: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n'+
    ' */\n';
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      sass: {
        dist: {
          files: [{
            expand: true,
            cwd: 'resources/assets/sass',
            src: ['**/*.sass'],
            dest: 'public/assets/css',
            ext: '.min.css'
          }]
        }
      },
      cssmin: {
        options: {
          livereload: true,
          mergeIntoShorthands: false,
          roundingPrecision: -1,
          sourceMap: {
            includeSources: false
          },
        },
        target: {
          files: [{
            expand: true,
            cwd: 'resources',
            src: ['assets/css/**/*.css', 'assets/css/!**/*.min.css'],
            dest: 'public/',
            ext: '.min.css'
          }]
        }
      },
      uglify: {
        options: {
          banner: bannerContent,
          livereload: true,
          sourceMap: {
            includeSources: false
          },
        },
        build: {
          files: [{
            expand: true,
            cwd: 'resources',
            src: ['assets/js/**/*.js', 'assets/js/!**/*.min.js'],
            dest: 'public/',
            ext: '.min.js'
          }]
        }
      },
      watch: {
        options: {
          livereload: true,
        },
        sass: {
          files: ['resources/assets/sass/**/*.sass'],
          tasks: ['copy:dev', 'sass'],
        },
        css: {
          files: ['resources/assets/css/**/*.css'],
          tasks: ['copy:dev']
        },
        js: {
          files: ['resources/assets/js/**/*.js'],
          tasks: ['copy:dev']
        }
      },
      copy: {
        dev: {
          files: [
            {
              expand: true,
              cwd: 'resources',
              src: ['assets/js/**/*.js'],
              dest: 'public/',
              ext: '.min.js'
            },
            {
              expand: true,
              cwd: 'resources',
              src: ['assets/css/**/*.css'],
              dest: 'public/',
              ext: '.min.css'
            }
          ]
        },
      },
      clean: ['public/assets/**/*'],
    });
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('dev', ['clean', 'copy:dev', 'sass', 'watch']);
    grunt.registerTask('dist', ['clean', 'sass', 'cssmin', 'uglify']);
  };