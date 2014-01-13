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
      basic: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          'src/intro.js',
          'src/space.js',
          'src/element.js',
          'src/viewport.js',
          'src/text.js',
          'src/image.js',
          'src/group.js',
          'src/network.js',
          'src/custom.js',
          'src/keyboardmanager.js',
          'src/grid.js',
          'src/graph.js',
          'src/util.js',
          'src/settings.js',
          'src/outro.js'
        ],
        dest: 'taaspace.js'
      },
      standalone: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          'includes/jquery/jquery-1.10.2.js',
          'includes/jquery/jquery.mousewheel-3.1.4.js',
          'includes/move/move-0.3.2.js',
          'includes/underscore/underscore-1.5.2.js',
          'includes/hammer/hammer-1.0.5.js',
          'includes/jwerty/jwerty-0.3.2.js',
          'src/intro.js',
          'src/space.js',
          'src/element.js',
          'src/viewport.js',
          'src/text.js',
          'src/image.js',
          'src/group.js',
          'src/network.js',
          'src/custom.js',
          'src/keyboardmanager.js',
          'src/grid.js',
          'src/graph.js',
          'src/util.js',
          'src/settings.js',
          'src/outro.js'
        ],
        dest: 'taaspace-standalone.js'
      }
    },
    
    // Minify the source code
    uglify: {
      options: {
        report: 'gzip',
        banner: '<%= meta.banner %>'
      },
      basic: {
        options: {
          sourceMap: 'taaspace.min.map'
        },
        files: {
          'taaspace.min.js': ['taaspace.js'],
        }
      },
      standalone: {
        options: {
          sourceMap: 'taaspace-standalone.min.map'
        },
        files: {
          'taaspace-standalone.min.js': ['taaspace-standalone.js'],
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
          'move': true, // any effect being true or false?
          define: false
        }
      },
      basic: {
        src: ['taaspace.js']
      },
      standalone: {
        src: ['taaspace-standalone.js']
      }
    },
    
    // Update version in the sources
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /Taaspace\.version\s=\s'\d\.\d\.\d'/,
              replacement: "Taaspace.version = '<%= pkg.version %>'",
              expression: true // use RegExp
            }
          ]
        },
        files: [
          {
            src: ['src/outro.js'],
            dest: 'src/outro.js'
          }
        ]
      }
    }
    
  });
  
  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify'); // For minifying
  grunt.loadNpmTasks('grunt-contrib-jshint'); // For testing
  grunt.loadNpmTasks('grunt-replace'); // For adding versions
  
  // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['build-basic', 'build-standalone']);
  grunt.registerTask('build-basic', ['replace', 'concat:basic', 'uglify:basic', 'jshint:basic']);
  grunt.registerTask('test', ['jshint:basic', 'jshint:standalone']);
  grunt.registerTask('build-standalone', ['replace', 'concat:standalone', 'uglify:standalone']);
  
};
