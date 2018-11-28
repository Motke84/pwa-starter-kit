/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const GET_FLOW_ITEMS = 'GET_FLOW_ITEMS';
export const SAVE_FLOW_ITEMS = 'SAVE_FLOW_ITEMS';


export const getAllFlowItems = () => (dispatch) => {
    // Here you would normally get the data from the server. We're simulating
    // that by dispatching an async action (that you would dispatch when you
    // succesfully got the data back)

    // You could reformat the data in the right format as well:
    let flowItems;
//https://moti-m-weather-api.herokuapp.com/getFlow
//http://localhost/SD.ICE.Admin.Dashboard/Flow/GetFlow
    axios.get('http://localhost/SD.ICE.Admin.Dashboard/Flow/GetFlow', {
        params: {
            
        }
      })
      .then(function (response) {
        console.log(response.data);
        flowItems = response.data;

        dispatch({
            type: GET_FLOW_ITEMS,
            flowItems
        });
      })
      .catch(function (error) {
        console.log(error);
      });
 
};


export const saveFlowItems = (flowItems) => (dispatch) => {
    // Here you would normally get the data from the server. We're simulating
    // that by dispatching an async action (that you would dispatch when you
    // succesfully got the data back)
    console.log(flowItems);
    
    // You could reformat the data in the right format as well:

//https://moti-m-weather-api.herokuapp.com/saveFlow
//https://moti-m-weather-api.herokuapp.com/saveFlow

      axios({
        url: 'http://localhost/SD.ICE.Admin.Dashboard/Flow/SaveFlow',
        method: 'POST',
        items: flowItems,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
      .then(function (response) {
 
        console.log(response.data);

        dispatch({
            type: SAVE_FLOW_ITEMS,
            flowItems
        });
      })
      .catch(function (error) {
        console.log(error);
      });
 
};

