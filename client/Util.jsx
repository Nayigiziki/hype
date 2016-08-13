function copyObj(obj){
   let output = JSON.parse(JSON.stringify(obj));
   return output;
}

export default function(){
  return {
    copyObj: copyObj
  }
};