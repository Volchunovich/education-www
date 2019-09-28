import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import RootRouting from './core/RootRouting';

ReactDOM.render(
  <BrowserRouter>
    <RootRouting />
  </BrowserRouter>,
  document.getElementById('root')
);
