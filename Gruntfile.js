module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    open : {
      webserver : {
        path: 'http://localhost:8888/'
      }
    },

    shell: {
      options: {
        stdout: true
      },
      npm_install: {
        command: 'npm install'
      },
      fonts: {
        command: 'cp -R app/lib/open-sans-fontface/fonts app/assets'
      }
    },

    connect: {
      options: {
        base: 'app/'
      },
      webserver: {
        options: {
          port: 8888,
          keepalive: true
        }
      },
      devserver: {
        options: {
          port: 8888
        }
      },
      testserver: {
        options: {
          port: 9999
        }
      }
    },

    karma: {
      unit: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: false,
        singleRun: true
      },
      unit_auto: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: true,
        singleRun: false
      }
    }
  });

  //single run tests
  grunt.registerTask('test', ['test:unit']);
  grunt.registerTask('test:unit', ['karma:unit']);

  //autotest and watch tests
  grunt.registerTask('autotest', ['karma:unit_auto']);
  grunt.registerTask('autotest:unit', ['karma:unit_auto']);

  //installation-related
  grunt.registerTask('install', ['update']);
  grunt.registerTask('update', ['shell:npm_install']);

  //defaults
  grunt.registerTask('default', ['open:webserver', 'dev']);

  //development
  grunt.registerTask('dev', ['serve']);

  //server daemon
  grunt.registerTask('serve', ['connect:webserver']);
};
