/*global test:false, ok:false, largestTriangleThreeBuckets */

( function() {
  'use strict';

  var sampleObjectData = [],
    sampleArrayData = [],
    d = Date.now(),
    i = 0;

  for ( i = 1; i < 2000; i++ ) {
    sampleObjectData.push({
      date: d - i,
      value: i + Math.random()
    });
    sampleArrayData.push( [ d - i, Math.random() + i ] );
  }

  test( 'Library reduces length of data array to within threshold', function() {
    ok( largestTriangleThreeBuckets( sampleObjectData, 1440, 'date', 'value' ).length <= 1440, 'Returned data is <= threshold' );
  });

  test( 'Library can use array-based Data', function() {
    ok( largestTriangleThreeBuckets( sampleArrayData, 1440, 0, 1 ).length <= 1440, 'Returned data is <= threshold' );
  });

  test( 'Library does not downsample if the passed threshold is zero', function() {
    ok( largestTriangleThreeBuckets( sampleArrayData, 0, 0, 1 ).length === sampleArrayData.length, 'Returned data is the same length as original data' );
  });

}() );
