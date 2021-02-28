import { Component } from 'react';
import './styles/App.scss';

import { Provider } from 'react-redux';


import store from './store';

import Chat from './components/chat/Chat'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            darkTheme: true
        };
    }

    handleThemeChange = () => {
        console.log('pre ' + this.state.darkTheme)
        this.setState(prevState => ({
            darkTheme: !prevState.darkTheme
        }));
        console.log(this.state.darkTheme)
    }

    render() {
        return (
            <Provider store={store}>
                <div className={`container ${this.state.darkTheme ? 'dark' : 'light'}`}>
                    <div className='themeIcon' onClick={this.handleThemeChange}>
                        <p className="themeTitle">Click to change theme</p>
                        {this.state.darkTheme ? <i class="fas fa-sun"></i> : <i class="fas fa-moon"></i>}
                        {this.state.darkTheme ? <p>Dark Theme</p> : <p>Light Theme</p>}
                    </div>
                    <Chat />
                </div>
            </Provider>
        )
    }
}

// const App = () => {
//   const changeTheme = () => {

//   }
//   return (
//     <Provider store={store}>
//       <div className="container">
//           <button onClick={changeTheme}>Change theme</button>
//           <Chat />
//       </div>
//     </Provider>
//   );
// }

export default App;
