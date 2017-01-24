/**
 *  @fileoverview Dimensionality reduction library for javascript.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 *  Licensed under GPL-3.
 */

MiniMat = require("minimat");

/**An object to track data and changes for dimensionality reduction
* @constructor
* @param {MiniMat} Mat - The data matrix to operate on
*/
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

    /** a static add function for array arithmetic, returns sum
    * @param {float} x - a number to add
    * @param {float} y - a number to add
    */
    static radd(x,y){
        return x+y;
    }

    /** a static mean function for array arithmetic, returns mean
    * @param {Object[]} arr - an array of floats to find mean
    */
    static mean(arr){
      return arr.reduce(DimRed.radd,0)/ arr.length;
    }

    // comparision functions

    /** a static comparison function for array arithmetic, returns true if first param is less than the second
    * @param {float} x - a number to compare
    * @param {float} y - a number to compare
    */
    static cless(x,y){
      // if less than
      return x < y;
    }
    /** a static comparison function for array arithmetic, returns true if first param is greater than the second
    * @param {float} x - a number to compare
    * @param {float} y - a number to compare
    */
    static cgreat(x,y){
      // if greater than
      return x > y;
    }

    // some filter functions

    /** Determine variance of an array for low variance filter
    * @param {Object[]} arr - an array of floats to find variance of
    */
    static variance(arr){
      // takes in an array (or MiniMat.data) of data to get variance of.
      return DimRed.mean(arr.map(function(val){
        return Math.pow(val-DimRed.mean(arr),2);
      }));
    };

    /** Determine missing data ratio of an array for missing data filter
    * @param {Object[]} arr - an array of floats to find missing data ratio of
    */
    static missing(arr){
        // takes in an array (or MiniMat.data) of data to get missing data ratio of.
        var nancount = arr.reduce(function(n, val) {
          return n + (isNaN(val));
        }, 0);
        return nancount/arr.length
    };

    /** in place filter method with adjustable parameter
    * @param {function} [fil_fcn] - a function to filter upon
    * @param {parameter} [parameter] - a paramater to compare the filter against
    * @param {function} [comparison] - a function which returns true when data is desired to be kept, given filter(col) and the paramater
    */
    filter(fil_fcn=DimRed.variance, parameter=1, comparison=DimRed.cless){
      for (var x=0; x< this.numFeature; x++){
        var feature = this.Mat.col(x).data;
        this.Features[x] = comparison(parameter, fil_fcn(feature));
      }
      return this;
    }
    // pca
    // backward feature elim
    // forward feature construction
}

module.exports = DimRed;
