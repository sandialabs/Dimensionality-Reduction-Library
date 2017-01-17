/**
 *  @fileoverview Dimensionality reduction library for javascript.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 *  Licensed under GPL-3.
 */

MiniMat = require("minimat");




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

    // some functions we want to use with arrays
    static radd(x,y){
        return x+y;
    }
    static mean(arr){
      return arr.reduce(DimRed.radd,0)/ arr.length;
    }

    // comparision functions

    static cless(x,y){
      // if less than
      return x < y;
    }

    static cgreat(x,y){
      // if greater than
      return x > y;
    }

    // some filter functions
    // for low variance filter
    static variance(arr){
      // takes in an array (or MiniMat.data) of data to get variance of.
      return DimRed.mean(arr.map(function(val){
        return Math.pow(val-DimRed.mean(arr),2);
      }));
    };

    static missing(arr){
        // takes in an array (or MiniMat.data) of data to get missing data ratio of.
        var nancount = arr.reduce(function(n, val) {
          return n + (isNaN(val));
        }, 0);
        return nancount/arr.length
    };

    // filter application with adjustable paramater
    // this is an in place filter
    filter(fil_fcn=DimRed.variance, paramater=1, comparison=DimRed.cless){
      for (var x=0; x< this.numFeature; x++){
        var feature = this.Mat.col(x).data;
        this.Features[x] = comparison(paramater, fil_fcn(feature));
      }
      return this;
    }
    // pca
    // backward feature elim
    // forward feature construction
}

module.exports = DimRed;
