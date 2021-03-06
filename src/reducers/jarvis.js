import { INPUT_SUCCESS, INPUT_FAIL, MESSAGE_SUCCESS, MESSAGE_FAIL, MESSAGE_LOADING  } from '../actions/types';

// set initial state
const initialState = {
    messages: []
}

const getRidofLoading = (messages) => {
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].type === 'internal') {
            const test = messages.indexOf(messages[i]);
            messages.splice(test, 1);
        }                
    }
}

//switch  statement - update state
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    const { type, payload } = action;
    let { messages } = state;
    switch (type) {
        case INPUT_SUCCESS:
            messages = [...messages, {message: payload, type: "user" }]
            return {
                ...state,
                messages
            }
        case INPUT_FAIL:
            return {
                ...state
            };
        case MESSAGE_LOADING:
            messages = [...messages, {message: payload, type: "internal"}]
            return {
                ...state,
                messages
            };
        case MESSAGE_SUCCESS:
            console.log(messages);
            getRidofLoading(messages);
            messages = [...messages, {message: payload, type: "bot"}]
            return {
                ...state,
                messages
            };
        case MESSAGE_FAIL:
            getRidofLoading(messages);
            messages = [...messages, {message: payload, type: "bot"}]
            return {
                ...state,
                messages
            };
        default:
            return {
                ...state
            }
    }
}