module.exports = function (grunt) {
	'use strict';
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					style: 'compact'
				},
				files: {
					'src/css/main.css': 'src/sass/main.scss'
				}
			}
		},
		concat: {
			css: {
				src: [
					'src/css/*'
				],
				dest: 'assets/combined_styles.min.css'
			},
			js: {
				src: [
					'src/js/*'
				],
				dest: 'assets/combined_js.min.js'
			}
		},
		uglify: {
			js: {
				files: {
					'assets/combined_js.min.js': ['assets/combined_js.min.js']
				}
			}
		},
		watch: {
			files: ['src/sass/*', 'src/css/*', 'src/js/*'],
			tasks: ['sass', 'concat']
		}
	});

	grunt.registerTask('default', ['concat:css', 'concat:js', 'sass', 'uglify:js', 'watch']);
};