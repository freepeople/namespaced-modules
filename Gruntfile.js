module.exports = function (grunt) {
	'use strict';
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
			dist: {
				options: {
					sassDir: 'src/sass',
					cssDir: 'src/css'
				}
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded'
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
		cssmin: {
			css: {
				src: 'assets/combined_styles.min.css',
				dest: 'assets/combined_styles.min.css'
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
			tasks: ['compass','sass', 'concat', 'cssmin']
		}
	});

	grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'sass', 'uglify:js', 'watch']);
};