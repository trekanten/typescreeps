require('dotenv').config()

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-contrib-clean')

  grunt.initConfig({

    screeps: {
      options: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
        branch: process.env.BRANCH,
        ptr: false
      },
      dist: {
        src: ['dist/*.js', 'dist/*.js.map']
      }
    },

    clean: {
      dist: ['dist'],
      temp: ['temp']
    },

  })

  grunt.registerTask('clean-dist', ['clean:dist']);

  grunt.registerTask('deploy', ['screeps']);

}
