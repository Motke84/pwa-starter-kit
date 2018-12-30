


export const GET_FLOW_ITEMS = 'GET_FLOW_ITEMS';
export const SAVE_FLOW_ITEMS = 'SAVE_FLOW_ITEMS';
export const GOT_FLOW_ITEMS = 'GOT_FLOW_ITEMS';
export const FLOW_ERROR = 'FLOW_ERROR';

import {
    showSnackbar
} from '../actions/app.js';

export const getAllFlowItems = (date) => (dispatch) => {


    dispatch({
        type: GET_FLOW_ITEMS,
        date
    });

    let flowItems;
    //https://moti-m-weather-api.herokuapp.com/getFlow
    axios({
        url: `http://localhost/SD.ICE.Admin.Dashboard/Flow/GetFlow/${date}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            // "Content-Type": "application/json",
            // "Accept": "application/json"
        },
        compress: false
    })
        .then(function (response) {
            console.log(response);

            let flowItems;
            let action = GOT_FLOW_ITEMS;

            if (response.data == "An unexpected error has occurred."){
                dispatch(showSnackbar("Error In Server", true));
                action = FLOW_ERROR;
            }
            else {
                dispatch(showSnackbar("Success", false));
                flowItems = response.data;
            }

            dispatch({
                type: action,
                flowItems
            });
        })
        .catch(function (error) {
            console.log(error);
            dispatch(showSnackbar("Error In Server", true));

            dispatch({
                type: GOT_FLOW_ITEMS,
                flowItems
            });
        });

};


export const saveFlowItems = (flowItems) => (dispatch) => {
    // Here you would normally get the data from the server. We're simulating
    // that by dispatching an async action (that you would dispatch when you
    // succesfully got the data back)
    //console.log(flowItems);

    // You could reformat the data in the right format as well:

    //https://moti-m-weather-api.herokuapp.com/saveFlow
    //https://moti-m-weather-api.herokuapp.com/saveFlow

    axios({
        url: 'http://localhost/SD.ICE.Admin.Dashboard/Flow/SaveFlow',
        method: 'POST',
        data: flowItems,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            // "Content-Type": "application/json",
            // "Accept": "application/json"
        },
        body: flowItems,
        compress: false
    }).then(function (response) {

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

