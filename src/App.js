import { Component } from 'react';
import './styles/App.scss';

import { Provider } from 'react-redux';


import store from './store';

import Chat from './components/chat/Chat'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            darkTheme: false
        };
    }

    handleThemeChange = () => {
        this.setState(prevState => ({
            darkTheme: !prevState.darkTheme
        }));
    }

    render() {
        return (
            <Provider store={store}>
                <div className={`container ${this.state.darkTheme ? 'dark' : 'light'}`}>
                    <div className='themeIcon'>
                        <p className="themeTitle">Click to change theme</p>
                        <input onClick={this.handleThemeChange} type='checkbox' id='time' />
                        <label htmlFor='time'>Night</label>
                    </div>
                    <Chat />
                </div>
            </Provider>
        )
    }
}

export default App;
