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

                setTimeout(() => {
                    dispatch({ type: MESSAGE_SUCCESS, payload: greetings.response})
                  }, 2000);
            }
        }

        // loop through array of industries
        for (let i of industry) {
            humanResponses.push(i.name)
            if (input === i.name) {
                console.log('industry true')
                loadingState(dispatch);
                setTimeout(() => {
                    dispatch({ type: MESSAGE_SUCCESS, payload: i.response})
                }, 2000);
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
            setTimeout(() => {
                dispatch({ type: MESSAGE_SUCCESS, payload: script.humanAgent})
            }, 2000);
        } else if (input === script.dontContactHuman) {
            humanResponses.push(input)
            loadingState(dispatch);
            setTimeout(() => {
                dispatch({ type: MESSAGE_FAIL, payload: script.greetings.response})
            }, 2000);
        }

        if (humanResponses.length === count || input === '') {
            loadingState(dispatch);

            setTimeout(() => {
                dispatch({ type: MESSAGE_FAIL, payload: script.noResponse})
            }, 2000);
        }




    } catch (err) {
        dispatch({ type: MESSAGE_FAIL}) 
    }
}