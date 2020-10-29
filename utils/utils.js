const fse = require('fs-extra')
 function copyAdminFolder (srcPath, distPath) {
    'use strict'
    fse.copy(`${srcPath}/admin`, `${distPath}/admin`, handleError(null, 'admin'))
  }

  function handleError (err, name) {
    if (err) throw err
    console.log(`Successfully copied ${name} folder!`)
  }

module.exports = {
    copyAdminFolder : copyAdminFolder
}