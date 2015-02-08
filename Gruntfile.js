module.exports = function(grunt) {
  //  Change this to the framework you want to use.
  var testFramework = "mocha";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        ignores: ['app/js/tmp/*.js']
      },
      all: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
    },
    cssmin: {
      minify: {
        src: ['bower_components/pure/pure.css', 'app/styles/index.css'],
        dest: 'dist/styles.min.css'
      }
    },
    copy: {
      dist: {
        files: [
          {src: 'app/index.html', dest: 'dist/index.html'},
          {src: 'app/favicon.ico', dest: 'dist/favicon.ico'},
          {expand: true, cwd:'app', src: ['img/**'], dest: 'dist/'}
        ]
      }
    },
    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      html: {
        files: ['index.html']
      },
      templates: {
        files: ['app/templates/**/*.html'],
        tasks: ['jst']
      },
      js: {
        files: ['app/**/*.js'],
        tasks: ['jshint']
      },
      css: {
        files: ['app/styles/*.css']
      }
    },
    jst: {
      compile: {
        options: {
          templateSettings: {
            interpolate : /\{\{(.+?)\}\}/g
          },
          namespace: 'templates',
          amd: true
        },
        files: {
          "app/js/tmp/templates.js": ["app/templates/**/*.html"]
        }
      }
    },
    requirejs: {
      release: {
        options: {
          mainConfigFile: "app/js/config.js",
          generateSourceMaps: true,
          include: ["main"],
          out: "dist/source.min.js",
          optimize: "uglify2",
          baseUrl: "app/js",
          
          // Include a minimal AMD implementation shim.
          name: "almond",

          // Wrap everything in an IIFE.
          wrap: true,

          // Do not preserve any license comments when working with source maps.
          // These options are incompatible.
          preserveLicenseComments: false
        }
      }
    },
    karma: {
      options: {
        files: [
          "bower_components/assert/assert.js",
          "bower_components/requirejs/require.js",
          "test/runner.js",
          { pattern: "app/**/*.*", included: false },
          {
            pattern: "test/mocha/**/*.spec.js",
            included: false
          },
          { pattern: "bower_components/**/*.js", included: false }
        ],
        // Choose between mocha, jasmine, or qunit
        frameworks: ['mocha'],
        browsers: ["PhantomJS"],
        logLevel: 'INFO',
        // Take your pick of test frameworks
        plugins: [
          "karma-jasmine",
          "karma-mocha",
          "karma-qunit",
          "karma-phantomjs-launcher",
          "karma-coverage"
        ],
        reporters: 'dots'
      },
      unit: {
        singleRun: true
      }
    }
  });

  // Specify the sync arg to avoid blocking the watch
  grunt.registerTask('test', ['jshint', 'karma']);

  grunt.registerTask('build', ['jshint', 'cssmin', 'jst', 'copy:dist', 'requirejs:release']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-karma');
};
