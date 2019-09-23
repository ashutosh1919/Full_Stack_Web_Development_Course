"use strict";

module.exports = function(grunt) {
  require("time-grunt")(grunt);
  require("jit-grunt")(grunt);
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          "css/styles.css": "css/styles.scss"
        }
      }
    },
    watch: {
      files: "css/*.scss",
      tasks: ["sass"]
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ["css/*.css", "*.html", "js/*.js"]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./"
          }
        }
      }
    }
  });
  grunt.registerTask("css", ["sass"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
};
