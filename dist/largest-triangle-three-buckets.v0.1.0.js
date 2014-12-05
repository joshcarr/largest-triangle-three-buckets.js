/*! largest-triangle-three-buckets - v0.1.0 - 2014-12-04
* Copyright (c) 2014 Josh Carr; Licensed MIT */
// Uses AMD or browser globals to create a module.

// Grabbed from https://github.com/umdjs/umd/blob/master/amdWeb.js.
// Check out https://github.com/umdjs/umd for more patterns.

// Defines a module "largest-triangle-three-buckets".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.largestTriangleThreeBuckets = factory();
  }
}(this, function () {
  'use strict';

  /*** YOUR LIBRARY CODE GOES HERE! ***/

  function largestTriangleThreeBuckets(data, threshold, xAccessor, yAccessor) {

    var floor = Math.floor,
      abs = Math.abs;

    var data_length = data.length;
    if (threshold >= data_length || threshold === 0) {
      return data; // Nothing to do
    }

    var sampled = [],
      sampled_index = 0;

    // Bucket size. Leave room for start and end data points
    var every = (data_length - 2) / (threshold - 2);

    var a = 0,  // Initially a is the first point in the triangle
      max_area_point,
      max_area,
      area,
      next_a;

    sampled[ sampled_index++ ] = data[ a ]; // Always add the first point

    for (var i = 0; i < threshold - 2; i++) {

      // Calculate point average for next bucket (containing c)
      var avg_x = 0,
        avg_y = 0,
        avg_range_start  = floor( ( i + 1 ) * every ) + 1,
        avg_range_end    = floor( ( i + 2 ) * every ) + 1;
      avg_range_end = avg_range_end < data_length ? avg_range_end : data_length;

      var avg_range_length = avg_range_end - avg_range_start;

      for ( ; avg_range_start<avg_range_end; avg_range_start++ ) {
        avg_x += data[ avg_range_start ][ xAccessor ] * 1; // * 1 enforces Number (value may be Date)
        avg_y += data[ avg_range_start ][ yAccessor ] * 1;
      }
      avg_x /= avg_range_length;
      avg_y /= avg_range_length;

      // Get the range for this bucket
      var range_offs = floor( (i + 0) * every ) + 1,
        range_to   = floor( (i + 1) * every ) + 1;

      // Point a
      var point_a_x = data[ a ][ xAccessor ] * 1, // enforce Number (value may be Date)
        point_a_y = data[ a ][ yAccessor ] * 1;

      max_area = area = -1;

      for ( ; range_offs < range_to; range_offs++ ) {
        // Calculate triangle area over three buckets
        area = abs( ( point_a_x - avg_x ) * ( data[ range_offs ][ yAccessor ] - point_a_y ) -
              ( point_a_x - data[ range_offs ][ xAccessor ] ) * ( avg_y - point_a_y )
              ) * 0.5;
        if ( area > max_area ) {
          max_area = area;
          max_area_point = data[ range_offs ];
          next_a = range_offs; // Next a is this b
        }
      }

      sampled[ sampled_index++ ] = max_area_point; // Pick this point from the bucket
      a = next_a; // This a is the next a (chosen b)
    }

    sampled[ sampled_index++ ] = data[ data_length - 1 ]; // Always add last

    return sampled;
  }

  // Return a value to define the module export.
  // This example returns a functions, but the module
  // can return an object as the exported value.
  return largestTriangleThreeBuckets;
}));
