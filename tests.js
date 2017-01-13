var test = require('tape');
MiniMat = require("minimat.js");
var DimRed = require("./dimred");

test( 'default inits test', function(t) {
    t.plan(1);

    t.doesNotThrow( function() {
        var boring = new DimRed( new MiniMat([1,2,3,4], 2, 2) );
    }, '*', "new MiniMat() construction");
});
