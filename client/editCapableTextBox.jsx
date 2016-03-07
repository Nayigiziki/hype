import React from 'react';

export default class EditCapableTextBox extends React.Component{
  constructor(props){
    super(props);
    let defaultProjectDescriptionString = 'My name is Shakeil. I am a designer, artist, activist, and visual problem solver. Above all, I am a curious individual who is always looking for new ways of using visual media to make the world more beautiful, thoughtful, and engaging. \n\nSince I started using new media tools at age 12, I have created posters for world famous musicians, founded a design and research project about police brutality, won best senior thesis in the Visual Studies program at UPenn, got trapped in the internet, and even worked at the first social impact focused accelerator in the country. \nIn the coming years, I hope to continue to put out content that pushes our current understanding of the visual world, and work on projects that challenge assumptions an alter perceptions.';
    this.state = {
      inputValue : this.props.editProjectDescriptionText ? defaultProjectDescriptionString : 'Please type some info',
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
    let view = this.renderElems();
    return (<div>
              {view}
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
    let div = (<div onClick={toggle} className={this.props.divClass}>{this.state.inputValue}</div>);
    let inputBox = (<div className={this.props.divClass}><input value={this.state.inputValue} name="inputValue" onMouseLeave={toggle} onChange={updateFormHandler} placeholder={this.props.placeholder} className={this.props.inputClass}/></div>);
    let textAreaBox = (<div className={this.props.divClass}><textarea value={this.state.inputValue} name="inputValue" onMouseLeave={toggle} onChange={updateFormHandler} placeholder={this.props.placeholder} className={this.props.inputClass}></textarea></div>);

    if(this.state.showInput){
      return this.props.isInputBox ? inputBox : textAreaBox;
    } else  {
      return div;
    }
  }
};
