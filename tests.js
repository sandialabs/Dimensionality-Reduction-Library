/**
 *  @fileoverview Dimensionality reduction library tests.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 *  Licensed under GPL-3.
 */

var test = require('tape');
MiniMat = require("minimat");
var DimRed = require("./dimred");

test( 'default inits test', function(t) {
    t.plan(1);

    t.doesNotThrow( function() {
        var boring = new DimRed( new MiniMat([1,2,3,4], 2, 2) );
    }, '*', "new MiniMat() construction");
});

test( 'filter tests', function(t) {
    t.plan(2);

    t.equal(new DimRed(MiniMat.Eye(3)).filter().Features.toString(),  [false,false,false].toString(), "variance filter test");
    var which_missing = new DimRed(new MiniMat([1,2,3,4,NaN,1,2,3,4,NaN,1,2,3,4,5],3,5)).filter(DimRed.missing, 0.1, DimRed.cgreat).Features.toString();
    t.equal(which_missing, [true, true, true, true, false].toString(), "Missing data filter test.")
});
