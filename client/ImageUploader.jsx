
import React from 'react';
import Util from './Util';

var special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelvth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
var deca = ['twent', 'thirt', 'fourt', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

export default class ImageUploader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      indexOfCurrentImage : 0,
      imageDataUrls : this.props.images.length > 0 ? this.props.images  : ['/static/website_frontpage.jpg']
    }
  };
  componentWillMount(){
    this.setState({
      indexOfCurrentImage : 0,
      imageDataUrls : this.props.images.length > 0 ? this.props.images : ['/static/website_frontpage.jpg']
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      indexOfCurrentImage : 0,
      imageDataUrls : nextProps.images.length > 0 ? nextProps.images : ['/static/website_frontpage.jpg']
    });
  }
  renderImg(){
    let currentIndex = this.state.indexOfCurrentImage;
    let image = this.state.imageDataUrls[currentIndex];
    let onImageClickHandler = this.onImageClick.bind(this);
    return <img className='projectImg' key='uploadedImage' src={image} onClick={onImageClickHandler}/>;
  };
  render(){
    let onFileUploadHandler =  this.onFileUpload.bind(this);
    let image = this.renderImg();
    let strinfydNumber = this.stringifyNumber(this.state.indexOfCurrentImage + 1);
    let setPrimaryImage = this.setPrimaryImage.bind(this);
    let imageElems = this.props.lock ? (<div className='projectImgContainer'>{image}</div>) : (<div className='projectImgContainer'>
              {image}
              <h2>{strinfydNumber} image displayed</h2>
              <input type="file" onChange={onFileUploadHandler}  multiple accept="image/*" />
              <button className='inputTitleEditBtn' onClick={setPrimaryImage}>Set Primary image</button></div>);
    return imageElems;
  };
  componentDidMount(){
    // Materialize.toast('Project Created!', 3000);
  };
  onImageClick(){
    let incrementedIndex = this.state.indexOfCurrentImage + 1;
    if(incrementedIndex > this.state.imageDataUrls.length - 1){
      incrementedIndex = 0;
    };
    this.setState({
      indexOfCurrentImage : incrementedIndex
    });
  };
  setPrimaryImage(){
    let images = Util().copyObj(this.state.imageDataUrls);
    //remove image
    let primaryImage = images.splice(this.state.indexOfCurrentImage, 1);
    //add to front
    images.unshift(primaryImage[0]);

    // this.setState({
    //   indexOfCurrentImage : 0,
    //   imageDataUrls : images
    // });
    this.props.onUpdate(images);
  }
  onFileUpload(evt){
    let that = this;
    let imageDataUrls = [];
    let files = evt.target.files;
    let imageCount = evt.target.files.length;
    let elem = evt.target;
    for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        let file = files[i];
        (function (imageFile){
          reader.onload = (e) => {
            imageDataUrls.push(e.target.result);
            
            if(imageDataUrls.length === imageCount){
              console.log(imageDataUrls[0]);
              that.props.onUpdate(imageDataUrls);
            }
          }            
        })(file);
        reader.readAsDataURL(file);
    }

  }
  stringifyNumber(n){
    if (n < 20) return special[n];
    if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
    return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
  }
};

