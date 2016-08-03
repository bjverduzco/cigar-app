module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: ['Gruntfile.js', 'public/scripts/*.js', 'routes/*.js', 'models/*.js']
    },
    watch: {
      files: ['public/scripts/*.js', 'routes/*.js'],
      tasks: ['jshint', 'uglify']
    },
    copy: {
      main: {
        files: [
          // makes all src relative to cwd
          {expand: true, cwd: 'node_modules', src: ['angular/**', 'bootstrap/**'], dest: 'public/vendor'},
        ],
      },
    },
    uglify: {
     my_target: {
      //  options: {
      //    mangle: false
      //  },
       files: {
         'public/assets/client.min.js': ['public/scripts/cigarApp.module.js', 'public/scripts/cigarApp.config.js', 'public/scripts/*.js']
       }
     }
   }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);

};
