module.exports = function(grunt) {
  //  Change this to the framework you want to use.
  var testFramework = "mocha";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js']
    },
    cssmin: {
      minify: {
        src: ['app/styles/index.css'],
        dest: 'dist/styles.min.css'
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
      js: {
        files: ['js/**/*.js'],
        tasks: ['jshint']
      },
      css: {
        files: ['css/*.css']
      }
    },
    aerobatic: {
      deploy: {
        src: ['index.html', 'dist/**/*.*', 'app/img/*.*', 'favicon.ico']
      },
      sim: {
        index: 'index.html',
        port: 3000,
        livereload: true
      },
    },
    requirejs: {
      release: {
        options: {
          mainConfigFile: "app/config.js",
          generateSourceMaps: true,
          include: ["main"],
          out: "dist/source.min.js",
          optimize: "uglify2",
          baseUrl: "app",
          paths: {
            almond: '../bower_components/almond/almond'
          },

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
  grunt.registerTask('sim', ['aerobatic:sim:sync', 'watch']);
  grunt.registerTask('deploy', ['build', 'aerobatic:deploy']);
  grunt.registerTask('test', ['jshint', 'karma']);

  grunt.registerTask('build', ['jshint', 'cssmin', 'requirejs']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-karma');
};
