function extractRequire(text) {
   let result = [];
   let arrRequire = text.split('require');
   for(let len = arrRequire.length; len--;) {
       let strRequire = arrRequire[len];
       if(len == 0) break;
       result.push({
           replacePath: strRequire.slice( 2, strRequire.indexOf(',') - 1),
           targetPath: strRequire.slice( 1, strRequire.indexOf(')'))
       })
   }
   return result;
}

module.exports = extractRequire;