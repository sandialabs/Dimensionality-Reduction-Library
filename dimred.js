/**
 *  @fileoverview Dimensionality reduction library for javascript.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 *  Licensed under GPL-3.
 */

MiniMat = require("minimat");

// some functions we want to use with arrays
function radd(x,y){
    return x+y;
}
function mean(arr){
  return arr.reduce(radd,0)/ arr.length;
}

// comparision functions

function cless(x,y){
  // if less than
  return x < y;
}

function cgreat(x,y){
  // if greater than
  return x > y;
}

// some filter functions
// for low variance filter
var variance = function(arr){
  // takes in an array (or MiniMat.data) of data to get variance of.
  return mean(arr.map(function(val){
    return Math.pow(val-mean(arr),2);
  }));
}

class DimRed {
    constructor(Mat) {
        this.Mat=Mat;
        // each matrix column should be an entity
        this.numEntity = parseInt(Mat.x_len);
        // each row should be a feature
        this.numFeature = parseInt(Mat.y_len);
        // a bool of which features to "keep"
        this.Features = new Array(this.numFeature);
        this.Features.fill(true);
    }

    // filter application with adjustable paramater
    // this is an in place filter
    filter(fil_fcn=variance, paramater=1, comparison=cless){
      for (var x=0; x< this.numFeature; x++){
        var feature = this.Mat.row(x).data;
        this.Features[x] = comparison(paramater, fil_fcn(feature));
      }
      return this;
    }
    // pca
    // backward feature elim
    // forward feature construction
}

module.exports = DimRed;
