/** @jsx React.DOM */

var React = require('react');

var Link = require('react-router').Link;
var RouteHandler = require('react-router').RouteHandler;

module.exports = {
  master: React.createClass({
    render: function() {
      return (
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="campaigns" className="navbar-brand">Campaigns</Link>
              </div>

              <Link className="btn btn-primary navbar-btn pull-right" to="create-campaign">
                <span className="glyphicon glyphicon glyphicon-plus"></span> Create Campaign
              </Link>
            </div>
          </nav>
          <div className="container-fluid">
            <RouteHandler />
          </div>
        </div>
      )
    }
  }),

  index: React.createClass({
    render: function() {
      var IndexItem = module.exports.indexItem;
      return <div className="row">
          <table className="table table-hover table-condensed">
            <thead>
              <th>Remaining Flights</th>
              <th>Status</th>
              <th>Name</th>
              <th></th>
            </thead>
            <tbody>
              <IndexItem />
              <IndexItem />
              <IndexItem />
              <IndexItem />
              <IndexItem />
            </tbody>
          </table>
        </div>
    }
  }),

  indexItem: React.createClass({
    render: function() {
      return <tr>
          <td>4</td>
          <td><strong>Active</strong></td>
          <td><Link to="campaign">[N]_Tribal Fusion_5.0</Link></td>
          <td>
            <span className="glyphicon glyphicon-edit pull-right"></span>
          </td>
        </tr>  
    }
  }),

  create: React.createClass({
    render: function() {
      return <div className="row">
          <form className="form-horizontal col-sm-12">
            <div className="row">
              <h3 className="col-sm-offset-2 col-sm-6">Add new campaign</h3>
            </div>
            <div className="form-group">
              <label form="newCampaignBasics" className="control-label col-sm-2">Name</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="newCampaignName" placeholder="New Campaign Name" />
              </div>
              <p className="col-sm-4">
                This is some tip that helps with the stuff. I don't know how long it'll be really. We'll see.
              </p>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-6">
                <div className="btn-group">
                  <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-ok"></span> Create
                  </button>
                  <button type="button" className="btn btn-info">
                    <span className="glyphicon glyphicon-plus"></span> Flights
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
    }
  }),


  campaign: React.createClass({
    render: function() {
      return <div className="row">
        <div className="page-header">
          <h1>Campaign 15 <small>Its details and flights should be below</small></h1>
        </div>
      </div>
    }
  })

};

