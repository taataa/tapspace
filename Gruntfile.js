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
          'src/taaspace/js/intro.js',
          'src/taaspace/js/space.js',
          'src/taaspace/js/element.js',
          'src/taaspace/js/viewport.js',
          'src/taaspace/js/text.js',
          'src/taaspace/js/image.js',
          'src/taaspace/js/group.js',
          'src/taaspace/js/network.js',
          'src/taaspace/js/custom.js',
          'src/taaspace/js/keyboardmanager.js',
          'src/taaspace/js/outro.js'
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
    // http://www.jshint.com/docs/options/
    jshint: {
      options: {
        // Enforcing options
        camelcase: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        freeze: true,
        immed: true,
        //indent: 2,
        maxlen: 80,
        newcap: false,
        noarg: true,
        //noempty: true,
        nonew: true,
        plusplus: true,
        quotmark: 'single',
        undef: true,
        //unused: true, // warn about unused variables
        strict: true,
        trailing: true,
        
        // Relaxing options, supresses warnings
        //asi: true, missing semicolons
        //boss: true, assignments in weird places
        //eqnull: true,
        //evil: true,
        //expr: true, // expressions in weird places
        
        // Environment options
        browser: true,
        jquery: true,
        node: true,
        
        globals: {
          '_': false,
          'jwerty': false,
          'Hammer': true,
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
