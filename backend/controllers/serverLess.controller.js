const fs = require('fs');
const fsExtra = require('fs-extra');
const async = require('async');
const mkdirp = require('mkdirp');
const scp2Client = require('scp2');
const ssh2Client = require('ssh2').Client;
const formidable = require('formidable');
const FuncDataModel = require('../models/function-data.model');

exports.index = async (req, res) => {
	res.status(200).json({
    message: "Welcome to Serverless Service API"
  });
}

exports.createFunction = async (req, res) => {
  
  let serverOptions = {
    user: 'root',
    host: 'localhost',
    password: 'root@123',
    port: 32768
  };

  
  const workFlow = [

    function parseFormData(cb) {
      let form = new formidable.IncomingForm();
      console.log('workflow::::::::');
      
      form.parse(req, async(err, fields, files)=> {
        if (err) {
        console.log("Error while parsing the form datat")
        }
        console.log('form parser');
        mkdirp.sync('./uploads/' + fields.functionName);
  
        console.log(files.file.path);
        console.log("request body:::", JSON.stringify(fields));

        let funcData = new FuncDataModel(fields);
        let result = await funcData.save();

        let fileType = '';
        let funcEnv = fields.functionEnv.toLocaleLowerCase();
       
        if (funcEnv === 'nodejs') {
          fileType = '.js'
        } else if (funcEnv === 'python') {
          fileType = '.py'
        } else if (funcEnv === 'java') {
          fileType = '.java'
        } else {
          fileType = '.zip'
        }

        let folderName = fields.functionName;
        let fileName = folderName + '_' + new Date().getTime() + fileType;
        let sourceFile = files.file.path;
        let destinationPath = './uploads/' + folderName + '/' + fileName;

        fsExtra.move(sourceFile, destinationPath,{overwrite :true}, (err) => {
          console.log(err);
          console.log("File moved successfully");
          console.log(destinationPath);
          cb(null,folderName)
        })
       
      })
      
    },
    function readTemplet(folderName,cb) {
     
      fs.readFile('./shell_script/script_template.sh', 'utf8', (err, data) => {
        if (err) {
          return cb(null, err);
        }
        return cb(null, data,folderName);
      })
    },

    function createShellFileFromTemp(data,folderName, cb) {

      let result = data.replace(/<a>/g, 10);
          result = result.replace(/<b>/g, 20);
    
      fs.writeFile('./uploads/'+folderName+'/script.sh', result, 'utf8', function (err) {
        if (err) return cb(null,err);
        return cb(null, folderName);
      });
    },

    function copyFileToRemoteServer(folderName, cb) {
        
      let localDir = './uploads/' + folderName + '/',
          dir = 'home/' + folderName + '/';
          serverOptions.path = `/${dir}`;
     
      scp2Client.scp(localDir, serverOptions, function (err) {
        console.log("scp function");
        console.log(err);
        if (err) {
          return cb(null, err);
        }
        return cb(null, folderName);
      });
    },

    function executeCodeFileInRemoteServer(folderName,cb) {
     
      const conn = new ssh2Client();

      conn.on('ready', ()=> {
        console.log('Client :: ready');
        conn.exec(`sh /home/${folderName}/script.sh`, (err, stream) => {
          if (err) throw err;
          stream.on('close', (code, signal)=> {
            console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            conn.end();
          }).on('data', (data)=> {
            console.log('STDOUT: ' + data);
            return cb(null);
          }).stderr.on('data', (data)=> {
            console.log('STDERR: ' + data);
           return cb(null);
          });
        });
     
      }).connect(serverOptions);
    }

  ];


// Execution starts here
  if (req.body !== undefined) {
    try {
      async.waterfall(workFlow, (err,result)=> {
        res.status(200).json({
          message: "Function has been created successfully.!",
          data:req.body
        });
      });
    } catch (err) {
      console.log("Erorr::",err)
      res.status(500).json( {
        message: "Internal Error",
        error: `${err}`
      });
    }
  }
}

exports.download = async (req, res) => {

  let fileName = req.params.codeFile,
      temp = fileName.split('_'),
      folderName = temp[0];

  res.download('./uploads/'+folderName+'/'+fileName);
  
}

exports.downloadSampleFile = async (req, res) => {

  let fileName = req.params.codeFile;

  res.download('./files/'+fileName);
  
}

exports.getFunctionData = async (req, res) => {
  try {
    let result = await FuncDataModel.find({ "functionName": req.params.functionName });
    let resultone = await FuncDataModel.find();
    res.send({ "message": "Success", data: result,"test":resultone });
  } catch (err) {
    res.send({ "message": "failed to fetch record", "Error": err });
  }
}

exports.getAllFunctions = async (req, res) => {
  
  try {
    let result = await FuncDataModel.find();
    res.send({ "message": "Success", data: result });
  } catch (err) {
    res.send({ "message": "failed to fetch record", "Error": err });
  }
}

exports.checkFnNameExists = async (req, res) => {
  console.log(req.params.functionName)
  try {
    let result = await FuncDataModel.find({ "functionName": req.params.functionName });
    console.log(result)
    if (result.length != 0) {
      res.send({exists:true, status:200})
    } else {
      res.send({exists:false, status:200})
    }
  } catch (err) {
    res.send({ "Error": err });
  }
}

exports.checkFnUrlExists = async (req, res) => {
  console.log(req.params.functionURL)

  try {
    let result = await FuncDataModel.find({ "functionURL": req.params.functionURL });
    console.log(result)
    if (result.length != 0) {
      res.send({exists:true, status:200})
    } else {
      res.send({exists:false, status:200})
    }
   
  } catch (err) {
    res.send({ "Error": err });
  }
}

exports.updateFnData = async (req, res) => {
  
  
}