var marty = require('marty')
var orderConstants = require('../constants/orderConstants.js');

var orderSourceActionCreators = marty.createActionCreators({
  receiveOrders: orderConstants.RECEIVE_ORDERS(function(orders) {
    this.dispatch(orders);
  }),

  receiveFlights: orderConstants.RECEIVE_FLIGHTS(function(flights, orderId) {
    this.dispatch(flights, orderId);
  })
});

module.exports = orderSourceActionCreators;
