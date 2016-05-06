import { jsdom } from 'jsdom'

global.expect = require('chai')
	.use(require('sinon-chai'))
	.expect

const exposedProperties = [
	'window',
	'navigator',
	'document'
];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};