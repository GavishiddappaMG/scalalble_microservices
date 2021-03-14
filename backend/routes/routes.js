
const express = require('express');
const serverlessController = require('../controllers/serverless.controller');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname  + '_' + Date.now());
    }
});
const upload = multer({storage: storage});

module.exports = (function () {
  var router = express.Router();

  router.get('/', serverlessController.index);
  
  router.post('/createFn', serverlessController.createFunction);
 
  router.get('/download/:codeFile', serverlessController.download);

  router.get('/download/sampleFile/:codeFile',serverlessController.downloadSampleFile);

  router.get('/checkFnNameExists/:functionName', serverlessController.checkFnNameExists);

  router.get('/checkFnUrlExists/:functionURL', serverlessController.checkFnUrlExists);

  router.get('/getFnData/:functionName', serverlessController.getFunctionData);

  router.get('/getAllFunctions', serverlessController.getAllFunctions);

  router.put('/updateFnData', serverlessController.updateFnData);

  return router;

})();
