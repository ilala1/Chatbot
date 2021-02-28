import {INPUT_SUCCESS, INPUT_FAIL, MESSAGE_SUCCESS, MESSAGE_FAIL, MESSAGE_LOADING} from './types';

// function that handles user message
export const userMessage = (message) => async (dispatch) => {
    try{
        dispatch({type:INPUT_SUCCESS, payload: message });
    } catch (err) {
        dispatch({type:INPUT_FAIL });
    }
};

// function that displays typing bubble
const loadingState = (dispatch) => {
    dispatch({ 
        type: MESSAGE_LOADING, 
        payload: 
            <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>})
}

const timeoutForResponse = (dispatch, type, payload) => {
    setTimeout(() => {
        dispatch({ type, payload})
      }, 2000);
}

// sends message to bot - local file
export const sendMessage = (message, script) => async (dispatch) => {
    const {greetings, industry} = script 
    try{
        let humanResponses = [];
        let count = 0;
        const body = {input: message};
        const input = body.input.toLowerCase()

        // loop through array of greetings
        for (let j of greetings.human) {
            humanResponses.push(j)
            if (input.includes(j)) {
                loadingState(dispatch);
                timeoutForResponse(dispatch, MESSAGE_SUCCESS, greetings.response)
            }
        }

        // loop through array of industries
        for (let i of industry) {
            humanResponses.push(i.name)
            if (input === i.name) {
                console.log('industry true')
                loadingState(dispatch);
                timeoutForResponse(dispatch, MESSAGE_SUCCESS, i.response)
            }
        }

        // handling for responses not in script
        for (let h of humanResponses) {
            if (input.indexOf(h) === -1 ) {
                console.log('fail')
                count = count + 1;
            }
        }

        if (input === script.contactHuman) {
            console.log('human response')
            humanResponses.push(input)
            loadingState(dispatch);
            timeoutForResponse(dispatch, MESSAGE_SUCCESS, script.humanAgent)
        } else if (input === script.dontContactHuman) {
            humanResponses.push(input)
            loadingState(dispatch);
            timeoutForResponse(dispatch, MESSAGE_FAIL, script.greetings.response)
        }

        if (humanResponses.length === count || input === '') {
            loadingState(dispatch);
            timeoutForResponse(dispatch, MESSAGE_FAIL, script.noResponse)
        }




    } catch (err) {
        dispatch({ type: MESSAGE_FAIL}) 
    }
}