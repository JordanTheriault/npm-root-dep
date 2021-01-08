#!/usr/bin/env node

const { getDepTreeJSON, searchTree } = require('../lib/findDepRoot.js');
const depsToSearch = process.argv.slice(2);

(async() => {
  let depTree = await getDepTreeJSON();

  depsToSearch.forEach((dep) => {
    // Check root level dependencies
    if(dep in depTree) {
      console.log(`${depsToSearch[0]} is a root dependency.`);
    } else {
      let found = false;
      // If not in root, recursively search through all root dependencies tree
      for(const rootDependency in depTree) {
        if(!found && searchTree(dep, depTree[rootDependency])) {
          found = true;
          console.log(`${dep}'s root dependancy is ${rootDependency}.`);
        }
      }
      if(found === false) {
        console.log(`${dep} can't be found in your dependencies.`);
      }
    }
  });
})();
