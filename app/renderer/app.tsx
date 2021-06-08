import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Title from "./components/Title";

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/'>
                    <Title text="electron" styles={{fontSize: '24px'}} />
                    <div>hellow world</div>
                </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
