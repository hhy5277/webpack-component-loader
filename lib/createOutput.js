const fs = require('fs');
const path = require('path');

module.exports = function createOutput(components, buildOption) {
  let output = '';
  if (!Array.isArray(components))
    throw '[webpack-component-loader]: the component is not an array';

  components.forEach((component)=>{
    let compoPath;

    if(component.pageFlag) {
      compoPath = path.resolve(buildOption.srcPath, component.dir, component.name);
    } else {
      compoPath = path.resolve(buildOption.srcPath, component.dir, component.name, component.name);
    }

    output += `require('babel-loader!${compoPath}.js');\n`;
    output += `require('css-loader!${compoPath}.css');\n`;
  });

  return output;
}