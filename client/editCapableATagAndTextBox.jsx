import React from 'react';

export default class EditCapableSpanAndTextBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inputValue : 'Please type some info',
      showInput : false
    }
  };
  updateForm(evt){
    let updateFormObject = {};
    updateFormObject[evt.target.name] = evt.target.value;
    this.setState(updateFormObject);
    this.props.onUpdate(evt.target.value);
  }
  render(){
    let toggle = this.toggleElems.bind(this);
    let view = this.renderElems();
    let spanText = this.props.spanText;
    return (<div className='editSpanTitles'>
              <span onClick={toggle}>{spanText}: </span> {view}
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
    let aTag = (<a className={this.props.divClass} href={'https://'+ this.state.inputValue}>{this.state.inputValue}</a>);
    let inputBox = (<div className={this.props.divClass}><input value={this.state.inputValue} name="inputValue" onMouseLeave={toggle} onChange={updateFormHandler} placeholder={this.props.placeholder} className={this.props.inputClass}/></div>);
    let textAreaBox = (<div className={this.props.divClass}><textarea value={this.state.inputValue} name="inputValue" onMouseLeave={toggle} onChange={updateFormHandler} placeholder={this.props.placeholder} className={this.props.inputClass}></textarea></div>);
    if(this.state.showInput){
      return this.props.isInputBox ? inputBox : textAreaBox;
    } else  {
      return aTag;
    }
  }
};
