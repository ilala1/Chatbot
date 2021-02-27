import {INPUT_SUCCESS, INPUT_FAIL, MESSAGE_SUCCESS, MESSAGE_FAIL, MESSAGE_LOADING} from './types';
import typing from '../images/typing.png';

// function that handles user message
export const userMessage = (message) => async (dispatch) => {
    try{
        dispatch({type:INPUT_SUCCESS, payload: message });
    } catch (err) {
        dispatch({type:INPUT_FAIL });
    }
};

// sends message to bot - local file
export const sendMessage = (message, script) => async (dispatch) => {
    const {greetings, industry} = script 
    try{
        const body = {input: message};

        const input = body.input.toLowerCase()


        // loop through array of greetings
        for (let i = 0; i < greetings.human.length; i++) {
            if (input.includes(greetings.human[i])) {
                dispatch({ type: MESSAGE_LOADING, payload: <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>})
                setTimeout(() => {
                    dispatch({ type: MESSAGE_SUCCESS, payload: greetings.response})
                  }, 2000000);
            }
        }
        for (let i of industry) {
            if (i.name === input) {
                dispatch({ type: MESSAGE_LOADING, payload: 'bot is typing'})
                setTimeout(() => {
                    dispatch({ type: MESSAGE_SUCCESS, payload: i.response})
                }, 2000);
            }
        }


    } catch (err) {
        dispatch({ type: MESSAGE_FAIL}) 
    }
}