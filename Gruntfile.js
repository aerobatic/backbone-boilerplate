module.exports = function(grunt) {
  //  Change this to the framework you want to use.
  var testFramework = "mocha";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        ignores: ['app/tmp/templates.js']
      },
      all: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
    },
    cssmin: {
      minify: {
        src: ['bower_components/pure/pure.css', 'app/styles/index.css'],
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
    aerobatic: {
      deploy: {
        cowboy: true,
        src: ['index.html', 'dist/**/*.*', 'app/img/*.*', 'favicon.ico']
      },
      sim: {
        port: 3000,
        livereload: true
      },
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
          "app/tmp/templates.js": ["app/templates/**/*.html"]
        }
      }
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
  grunt.registerTask('sim', ['jst', 'aerobatic:sim:sync', 'watch']);
  grunt.registerTask('deploy', ['build', 'aerobatic:deploy']);
  grunt.registerTask('test', ['jshint', 'karma']);

  grunt.registerTask('build', ['jshint', 'cssmin', 'jst', 'requirejs']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-karma');
};
