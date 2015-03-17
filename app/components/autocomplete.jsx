/** @jsx React.DOM */

var React = require('react');
var fuzzySet = require('fuzzyset.js');
var _ = require('lodash');

var lastKeyDown;

module.exports = React.createClass({
  getInitialState: function() {
    var initialValue = this.props.value 
      ? this.props.value[this.props.valueLabel] : '';

    var fauxBest = {};
    fauxBest[this.props.valueLabel] = '';
    return { 
      bestMatch: fauxBest,
      value: initialValue,
      fuzz: []
    }
  },

  setOption: function(option) {
    var bestMatch = this.getBestMatch(option[this.props.valueLabel]);
    if(bestMatch)
      this.setState({ 
        value: bestMatch[this.props.valueLabel], 
        bestMatch: bestMatch
      });
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.value != nextState.bestMatch.id || this.state != nextState;
  },

  componentDidUpdate: function(nextProps, nextState) {
    var isMatched = _.find(this.props.options, function(option) {
      return option[this.props.valueLabel] == this.state.value;
    }, this);
    if(isMatched && typeof this.props.onSelect === 'function')
      this.props.onSelect(this.state.bestMatch);
  },

  handleBlur: function() {
    var DOMVal = this.refs.field.getDOMNode().value;
    this.setState({ value: DOMVal });
  },

  handleKeyDown: function(e) {
    var node = this.refs.field.getDOMNode();
    var value = node.value;
    if(e.keyCode === 8) {
      lastKeyDown = 8;
      var best = {};
      best[this.props.valueLabel] =  this.state.value
      this.setState({ bestMatch: best });
      return;
    }
    if(e.keyCode === 13) {
      node.blur();
      e.preventDefault();
    }

  },

  handleChange: function(e) {
    var node = this.refs.field.getDOMNode();
    var value = node.value;
    value = value.slice(0, node.selectionStart);

    var bestMatch = {};
    bestMatch[this.props.valueLabel] = value;
    if(lastKeyDown === 8)
      lastKeyDown = undefined;
    else 
      bestMatch = this.getBestMatch(value);

    this.getFuzzyMatches(value);

    this.setState(
      { value: value, bestMatch: bestMatch },
      function() {
        this.refs.field.getDOMNode().setSelectionRange(value.length, bestMatch[this.props.valueLabel].length);
        if(typeof this.props.onChange == 'function')
          this.props.onChange(value);
      }
    );
  },

  getFuzzyMatches: function(value) {
    var set = fuzzySet(_.pluck(this.props.options, this.props.valueLabel), true, 1, 2);
    var best = (set.get(value) || []).map(function(a) { return a[1] });
    this.setState({ fuzz: best });
  },

  getBestMatch: function(value) {
    var bestMatch = {};
    bestMatch[this.props.valueLabel] = value;
    
    return _.find(this.props.options, function(option) { 
      if(option[this.props.valueLabel])
        return option[this.props.valueLabel].lastIndexOf(value, 0) === 0;
    }, this) || bestMatch;
  },

  render: function() {
    return <div>
        <input ref='field'
            onBlur={this.handleBlur}
            type="text"
            className="form-control" id="newOrderAdvertiser" 
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange} value={this.state.bestMatch.advertiserName} />
          <span style={{ position: 'absolute', bottom: -14, left: 20, fontSize: 9 }} > { this.state.fuzz.join(', ') }</span>
        </div>
  }

});
