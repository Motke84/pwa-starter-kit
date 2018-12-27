


export const GET_FLOW_ITEMS = 'GET_FLOW_ITEMS';
export const SAVE_FLOW_ITEMS = 'SAVE_FLOW_ITEMS';


export const getAllFlowItems = (date) => (dispatch) => {
    // Here you would normally get the data from the server. We're simulating
    // that by dispatching an async action (that you would dispatch when you
    // succesfully got the data back)

    // You could reformat the data in the right format as well:
    let flowItems;
    //https://moti-m-weather-api.herokuapp.com/getFlow
    //http://localhost/SD.ICE.Admin.Dashboard/Flow/GetFlow
    axios({
            url: `http://localhost/SD.ICE.Admin.Dashboard/Flow/GetFlow/${date}`,
            method: 'GET',
            data: date,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                // "Content-Type": "application/json",
                // "Accept": "application/json"
            },
            body: date,
            compress: false
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

