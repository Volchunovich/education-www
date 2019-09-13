import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import RootRouting from './modules/RootRouting';

ReactDOM.render(
  <BrowserRouter>
    <RootRouting />
  </BrowserRouter>,
  document.getElementById('root')
);
