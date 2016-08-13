import React from 'react';

export default class EditCapableSpanAndTextBox extends React.Component{
  constructor(props){
    super(props);
  };
  updateForm(evt){
    let updateFormObject = {};
    updateFormObject[evt.target.name] = evt.target.value;
    this.setState(updateFormObject);
    this.props.onUpdate(evt.target.value);
  }
  componentWillMount(){
    this.setState({
      inputValue : this.props.content ? this.props.content : 'Please type some info',
      showInput : false
    })
  };
  componentWillReceiveProps(nextProps){
    this.setState({
      inputValue : nextProps.content ? nextProps.content : 'Please type some info'
    })
  }
  render(){
    let view = this.renderElems();
    let spanText = this.props.spanText;
    let classes = this.props.lock ? '' : 'pointer';
    return (<div className={classes}>
              <span>{spanText}: {view} </span> 
            </div>);
  };
  toggleElems(){
    let input = this.state.showInput;
    this.setState({
      showInput : !input
    });
  }
  renderElems(){
    let updateFormHandler = this.updateForm.bind(this);
    let toggle = this.toggleElems.bind(this);
    let span = this.props.lock ? (<span className={this.props.divClass}>{this.state.inputValue}</span>) : (<span onClick={toggle} className={this.props.divClass}>{this.state.inputValue}</span>);
    let inputBox = (<div className={this.props.divClass}><input value={this.state.inputValue} name="inputValue" onMouseLeave={toggle} onChange={updateFormHandler} placeholder={this.props.placeholder} className={this.props.inputClass}/></div>);
    let textAreaBox = (<div className={this.props.divClass}><textarea value={this.state.inputValue} name="inputValue" onMouseLeave={toggle} onChange={updateFormHandler} placeholder={this.props.placeholder} className={this.props.inputClass}></textarea></div>);

    if(this.state.showInput){
      return this.props.isInputBox ? inputBox : textAreaBox;
    } else  {
      return span;
    }
  }
};
