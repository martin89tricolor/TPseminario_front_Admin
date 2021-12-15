import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import ScrollToTop from './ScrollToTop';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

ReactDOM.render((
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
