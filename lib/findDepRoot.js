const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

module.exports.getDepTreeJSON = async () => {
    const depTree = await exec('npm ls --json', {maxBuffer: 1024 * 500});
    return JSON.parse(depTree.stdout).dependencies;
};

module.exports.searchTree = (dep, depTree) => {
  if(!depTree) {
    return false;
  }
  else if(depTree.dependencies && dep in depTree.dependencies) {
    return true
  } 
  else {
    return this.searchTree(dep, depTree.dependencies);
  }
};
