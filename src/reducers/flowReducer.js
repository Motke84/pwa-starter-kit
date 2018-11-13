/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {
    GET_FLOW_ITEMS,

  } from '../actions/flowActions';
  import { createSelector } from 'reselect';
  
  const INITIAL_STATE = {
    flowItems: {},
    error: ''
  };
  
  const flowReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_FLOW_ITEMS:
        console.log('flowReducer');
        
        return {
          ...state,
          flowItems: action.flowItems
        };
      default:
        return state;
    }
  };

  export default flowReducer;
  
  // Per Redux best practices, the shop data in our store is structured
  // for efficiency (small size and fast updates).
  //
  // The _selectors_ below transform store data into specific forms that
  // are tailored for presentation. Putting this logic here keeps the
  // layers of our app loosely coupled and easier to maintain, since
  // views don't need to know about the store's internal data structures.
  //
  // We use a tiny library called `reselect` to create efficient
  // selectors. More info: https://github.com/reduxjs/reselect.
  
 
