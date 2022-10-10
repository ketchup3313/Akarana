import React, { Component } from "react";

class Dropdown extends Component {

  render() {
    
    return (
      <div>
        <select onChange={this.props.handleChange}>
          {/* the passing of props adds additional flexibility (we can pass different option items for example) */}
          {<option value="">{this.props.title}</option>}
          {this.props.optionItems}
        </select>
      </div>
    );
  }


}

export default Dropdown;
