/** @jsx React.DOM */

var React = require('react');

var orderActionCreators = require('../actions/orderActionCreators');
var orderStore = require('../stores/orderStore');


module.exports = React.createClass({
  getInitialState: function() {
    return { name: '' };
  },

  submitOrder: function() {
    orderActionCreators.createOrder(
      this.state, 
      { 
        pending: function() { this.setState({ status: 'pending' }); }.bind(this),
        error: function() { this.setState({ status: 'error' }); }.bind(this),
        success: function() { 
          this.setState({ status: 'success', saved: true }); 
        }.bind(this)
      }
    );
  },

  onChangeName: function(e) {
    this.setState({ name: e.target.value });
  },

  render: function() {
    var buttonClass, buttonGlyph, submitAction, buttonSuffix, addFlights;

    switch(this.state.status) {
      case 'pending':
        buttonClass = 'btn-warning';
        buttonGlyph = 'glyphicon-refresh';
        submitAction = '';
        buttonSuffix = 'ing';
        break;
      case 'error':
        buttonClass = 'btn-danger';
        buttonGlyph = 'glyphicon-flash';
        submitAction = '';
        buttonSuffix = '';
      case 'success':
        buttonClass = 'btn-success';
        buttonGlyph = 'glyphicon-thumbs-up';
        submitAction = '';
        buttonSuffix = 'd';
        addFlights = (
          <button type="button" className="btn btn-info">
            <span className="glyphicon glyphicon-plus"></span> Flights
          </button>);
        break;
      default: 
        buttonClass = 'btn-default';
        buttonGlyph = 'glyphicon-ok';
        submitAction = this.submitOrder;
    }

    return <div className="row">
        <form className="form-horizontal col-sm-12">
          <div className="row">
            <h3 className="col-sm-offset-2 col-sm-6">Add new order</h3>
          </div>
          <div className="form-group">
            <label form="newOrderBasics" className="control-label col-sm-2">Name</label>
            <div className="col-sm-6">
              <input type="text" 
                className="form-control" id="newOrderName" 
                placeholder="New Order Name" 
                value={this.state.name} onChange={this.onChangeName} />
            </div>
            <p className="col-sm-4">
              This is some tip that helps with the stuff. I don't know how long it'll be really. We'll see.
            </p>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-6">
              <div className="btn-group">
                <button type="button" onClick={submitAction} className={'btn ' + buttonClass}>
                  <span className={'glyphicon ' + buttonGlyph}></span> Create{buttonSuffix}
                </button>
                {addFlights}
              </div>
            </div>
          </div>
        </form>
      </div>
  }
});
