require('dotenv').config()

module.exports = function (grunt) {

  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.initConfig({

    ts: {
      default: {
        tsconfig: './tsconfig.json'
      }
    },

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
        branch: 'default2',
        ptr: false
      },
      dist: {
        src: ['dist/*.js']
      }
    },

    clean: {
      pre: ['dist'],
      post: ['temp']
    },

  })

  grunt.registerTask('convert-files', ['copy:screeps', 'clean:pre', 'string-replace', 'clean:post']);

  grunt.registerTask('build', ['clean:pre', 'ts', 'convert-files']);

  grunt.registerTask('default', ['build', 'screeps']);

}