import React from 'react'
import { TextArea } from './FormComponents'

var Instruction = React.createClass({
  getInitialState: function() {
    return { instruction: ''};
  },
  update: function(name, value) {
    this.setState({ [name]: value });
  },
  componentWillUpdate: function(nextProps, nextState) {
    if (nextProps.change) {
      nextProps.change(nextProps.id, nextState.instruction);
    }
  },
  render: function () {
    return (
      <div className="instruction" key={this.props.id}>
        <label className="col-xs-1">Step&nbsp;{ parseInt(this.props.id) + 1 }:</label>
        <TextArea name="instruction" type="text" placeholder="Instruction" size="col-xs-11" change={this.update}/>
      </div>
    )
  }
});

export default React.createClass({
  getInitialState: function () {
    return { instructions: [<Instruction key="0" id="0" change={this.updateData}/>], data: [] };
  },
  addInstruction: function (e) {
    e.preventDefault();
    var instructions = this.state.instructions;
    instructions.push(<Instruction key={instructions.length} id={instructions.length} change={this.updateData} />);
    this.setState({ instructions: instructions });
  },
  updateData: function (id, data) {
    var tmp = {};
    tmp['title'] = data;
    tmp['step'] = id;
    var instructions = this.state.data;
    instructions[id] = tmp;
    this.setState({data: instructions});
    if (this.props.change) {
      this.props.change(this.props.name, instructions);
    }
  },
  render: function () {
    return (
      <div className="row">
        {this.props.label ? <label className="col-xs-12">{this.props.label}</label> : null}
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-body">
              {this.state.instructions}
              <a href="#" onClick={this.addInstruction} className="btn btn-success add-ing">Next Instruction</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
