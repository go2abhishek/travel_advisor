import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App />);

//var express = require('express');
//const path = require('path');

//ReactDOM.render(<App/>, document.getElementById('root'));

//App.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)
//App.get("/*", function(req, res) {
//  res.sendFile(path.join(__dirname, "index.html"));
//});