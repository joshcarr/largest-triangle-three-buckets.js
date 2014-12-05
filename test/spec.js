/*global test:false, ok:false */

(function () {
  'use strict';

  test('Library reduces length of data array to within threshold', function () {

    var data = [];
    var d = Date.now();
    for( var i=1; i < 200000; i++ ){
      data.push({
        date: d - i,
        value: i + Math.random()
      });
      // data.push([d - i, Math.random() + i ]);
    }

    ok( largestTriangleThreeBuckets( data, 1440, 'date', 'value' ).length <= 1440, 'Returned data is <= threshold' );
  });

}());
