import React from "react";

class CreateButton extends React.Component {
  render() {
    let buttonClass, buttonGlyph, buttonSuffix, submitAction;

    switch(this.props.status) {
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
        break;
      case 'success':
        buttonClass = 'btn-success';
        buttonGlyph = 'glyphicon-thumbs-up';
        submitAction = '';
        buttonSuffix = 'd';
        break;
      default: 
        buttonClass = 'btn-default';
        buttonGlyph = 'glyphicon-ok';
        submitAction = this.props.onSubmit;
    }

    return  <button type="submit" 
              onClick={submitAction} 
              className={'btn ' + buttonClass}>
              <span className={'glyphicon ' + buttonGlyph}></span> 
              <span> Create{buttonSuffix}</span>
            </button>;
  }
}

export default CreateButton;
