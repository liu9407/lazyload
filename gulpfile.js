'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var fs = require('fs');
var markJSON = require('markit-json');
var docUtil = require('amazeui-doc-util');

gulp.task('docs', function(){
  return gulp.src(['README.md', 'docs/*.md'])
    .pipe(markJSON(docUtil.markedOptions))
    .pipe(docUtil.applyTemplate(null, {
      pluginTitle: 'Lazy Load',
      pluginDesc: '基于 jQuery 的图片懒加载插件。'
    }))
    .pipe($.rename(function(file) {
      file.basename = file.basename.toLowerCase();
      if (file.basename === 'readme') {
        file.basename = 'index';
      }
      file.extname = '.html';
    }))
    .pipe(gulp.dest(function(file) {
      if (file.relative === 'index.html') {
        return './'
      }

      return './dist';
    }));
});

gulp.task('watch', function() {
  gulp.watch('./**/*.md', ['docs']);
});

gulp.task('default', ['docs', 'watch']);
