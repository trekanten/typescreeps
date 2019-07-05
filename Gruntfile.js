require('dotenv').config()

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.initConfig({

    copy: {
      screeps: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: '**',
          dest: 'temp/',
          filter: 'isFile',
          rename: function (dest, src) {
            return dest + src.replace(/\//g, '_');
          }
        }],
      }
    },

    'string-replace': {
      dist: {
        files: [{
          expand: true,
          cwd: 'temp/',
          src: '**',
          dest: 'dist/',
          filter: 'isFile',
        }],
        options: {
          replacements: [
            {
              pattern: /\.\//g,
              replacement: ''
            },
            {
              pattern: /@\//g,
              replacement: ''
            },
            {
              pattern: /\//g,
              replacement: '_'
            }
          ]
        }
      }
    },

    screeps: {
      options: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
        branch: process.env.BRANCH,
        ptr: false
      },
      dist: {
        src: ['dist/*.js']
      }
    },

    clean: {
      dist: ['dist'],
      temp: ['temp']
    },

  })

  grunt.registerTask('clean-dist', ['clean:dist']);

  grunt.registerTask('screepify-files', ['copy:screeps', 'clean:dist', 'string-replace', 'clean:temp']);

  grunt.registerTask('deploy', ['screeps']);

}