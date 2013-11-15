/*
 * Gruntfile for Taaspace
 *
 * Copyright (c) 2013 Akseli Palen
 * Licensed under the MIT license.
 *
 * Installation
 *   npm install
 *   npm install -g grunt-cli   # may require sudo
 */

'use strict';

module.exports = function(grunt) {
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // Meta options for conveniency
    meta: {
      banner: '\
/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n\
 * <%= pkg.homepage %>\n\
 *\n\
 * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.email %>>;\n\
 * Licensed under the <%= pkg.license.type %> license */\n\n'
    },
    
    // Merge source files
    concat: {
      options: {
        separator: '\n\n'
      },
      dist: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          'src/taaspace/js/index.js',
          'src/taaspace/js/element.js',
          'src/taaspace/js/viewport.js',
          'src/taaspace/js/text.js',
          'src/taaspace/js/image.js',
          'src/taaspace/js/group.js',
          'src/taaspace/js/network.js',
          'src/taaspace/js/custom.js',
          'src/taaspace/js/keyboardmanager.js'
        ],
        dest: 'taaspace.js'
      }
    },
    
    // Minify the source code
    uglify: {
      options: {
        report: 'gzip',
        sourceMap: 'taaspace.min.map',
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          'taaspace.min.js': ['taaspace.js'],
        }
      }
    },
    
    // Check for optimisations and errors
    jshint: {
      options: {
        curly: true,
        expr: true,
        newcap: true,
        quotmark: 'single',
        regexdash: true,
        trailing: true,
        undef: true,
        unused: true,
        maxerr: 100,
        eqnull: true,
        sub: false,
        browser: true,
        node: true,
        strict: true,
        laxcomma: true,
        globals: {
          define: false
        }
      },
      dist: {
        src: ['taaspace.js']
      }
    }
    
  });
  
  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['concat', 'uglify', 'test']);
  grunt.registerTask('test', ['jshint']);
  
};
