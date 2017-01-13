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
    t.plan(1);

    t.equal(new DimRed(MiniMat.Eye(3)).filter().Features.toString(),  [false,false,false].toString(), "variance filter test");
});
