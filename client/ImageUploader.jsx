
import React from 'react';

var special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelvth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
var deca = ['twent', 'thirt', 'fourt', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

export default class ImageUploader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      indexOfCurrentImage : 0,
      imageDataUrls : [{
        url : '/static/website_frontpage.jpg',
        file: null
      }]
    }
  };
  renderImg(){
    let currentIndex = this.state.indexOfCurrentImage;
    let image = this.state.imageDataUrls[currentIndex];
    let onImageClickHandler = this.onImageClick.bind(this);
    return <img className='projectImg' key='uploadedImage' src={image.url} onClick={onImageClickHandler}/>;
  };
  render(){
    let onFileUploadHandler =  this.onFileUpload.bind(this);
    let image = this.renderImg();
    let strinfydNumber = this.stringifyNumber(this.state.indexOfCurrentImage + 1);
    let setPrimaryImage = this.setPrimaryImage.bind(this);
    return (<div className='projectImgContainer'>
              {image}
              <h2>{strinfydNumber} image displayed</h2>
              <input type="file" onChange={onFileUploadHandler}  multiple accept="image/*" />
              <button className='inputTitleEditBtn' onClick={setPrimaryImage}>Set Primary image</button>
            </div>);
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
    let images = JSON.parse(JSON.stringify(this.state.imageDataUrls));
    //remove image
    let primaryImage = images.splice(this.state.indexOfCurrentImage, 1);
    //add to front
    images.unshift(primaryImage[0]);

    this.setState({
      indexOfCurrentImage : 0,
      imageDataUrls : images
    });
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
            imageDataUrls.push({
              file: imageFile,
              url : e.target.result
            });
            
            if(imageDataUrls.length === imageCount){
              that.setState({
                imageDataUrls : imageDataUrls
              });
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

