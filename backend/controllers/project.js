'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {

//Ejemplos de controllers
  home : function(req, res){
    return res.status(200).send({
      message: 'Soy la home'
    });
  },
  test: function(req, res){
    return res.status(200).send({
      message: 'Soy el metodo  o accion test del controlador project'
    });
  },

//agregar
  saveProject: function(req, res){
    var project = new Project();

    var params = req.body;

    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = null;

    project.save((err, projectStored) => {

      if (err) return res.status(500).send({message: 'Error al guardar'});

      if (!projectStored) return res.status(404).send({message: 'No se ha podido guardar el projecto'});

      return res.status(200).send({project: projectStored});

    });
  },

//buscar
  getProject: function(req, res){

    var projectId = req.params.id;

    Project.findById(projectId, (err, project) => {

      if (err) return res.status(500).send({message : "Error al devolver los datos"});

      if(!project) return res.status(404).send({message: 'El proyecto no existe'});

      res.status(200).send({project});


    });
  },

  //listado
  getProjects: function(req, res){

    Project.find({}).sort('-year').exec((err, projects) => {

      if(err) return res.status(500).send({message: "Error al devolver los datos"});

      if(!projects) return res.status(404).send({message: "No hay proyectos para mostrar"});

      return res.status(200).send({projects});

    });
  },

  //actualizar
  updateProject: function(req, res){
    var projectId = req.params.id;
    var update = req.body;

    Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
      if(err) return res.status(500).send({message: "Error al actualizar los datos"});

      if(!projectUpdated) return res.status(404).send({message: "No existe el proyecto para actualizar"});

      return res.status(200).send({project: projectUpdated});
    });
  },

  //borrar
  deleteProject: function(req, res){
    var projectId = req.params.id;

    Project.findByIdAndRemove(projectId, (err, projectDeleted) => {

      if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

      if(!projectDeleted) return res.status(404).send({message: 'No se puede borrar el proyecto'});

      return res.status(200).send({project: projectDeleted});
    });
  },

  //subir imagen
  uploadImage: function(req, res){
    var projectId = req.params.id;
    var fileName = 'Imagen no subida...';

    if (req.files) {
      var filePath = req.files.image.path;//recoger el path del archivo
      var fileSplit = filePath.split('\\');//cortar el path a partir del \\
      var fileName  = fileSplit[1];//recoger la imagen

      var extSplit = fileName.split('\.');//despues del punto
      var fileExt = extSplit[1];

      if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
        Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true}, (err, projectUpdated) => {
          if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
          if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe'});
          return res.status(200).send({project: projectUpdated});
        });
      }else {
        fs.unlink(filePath, (err) => {
          return res.status(200).send({message: 'La extension no es valida'});
        });
      }
    }else {
      return res.status(200).send({
        message: fileName
      });
    }
  },

  getImageFile: function(req, res){
    var file = req.params.image;
    var path_file = './uploads/'+file;

    fs.exists(path_file, (exists) =>{
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      }else{
        return res.status(200).send({
          message: 'No existe la imagen'
        });
      }
    });
  }
};

module.exports = controller;
