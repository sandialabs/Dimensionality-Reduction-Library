var test = require('tape');
var DimRed = require("./dimred");

test( 'default inits test', function(t) {
    t.plan(1);

    t.doesNotThrow( function() {
        boring = new DimRed(MiniMat([1,2,3,4], 2, 2));
    }, '*', "new MiniMat() construction");
}
