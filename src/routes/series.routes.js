const SeriesService = require('../services/serie.service');
const service = new SeriesService();
const express = require('express');
const serieModel = require('../models/serie.model');
const serieRoutes = express.Router();

serieRoutes.post('/serie' , async (req,res) => {
  try {
    const serie = serieModel(req.body);
    const data = await service.createSerie(serie);
    res.status(201).json({data})
  } catch (error) {
    res.status(404).json({
      message: error,
    })
  }
});

serieRoutes.get('/' , async (req,res) => {
  try {
    const data = await service.listSerie();
    res.status(200).json({data});
  } catch (error) {
    res.status(404).json({message: error})
    
  }  
});


serieRoutes.get('/:serieId' , async (req,res, next) => {
  try {
    const {serieId}= req.params;
    const data = await service.showSerie(serieId);
    res.status(302).json({data})
  } catch (error) {
    next(error); 
  }
});

serieRoutes.get('/searchDate/:date' , async (req,res,next) => {
  try {
    const {date}= req.params;
    const data = await service.showSerieDate(date);
    res.status(200).json({data})
  } catch (error) {
    next(error);
  }
});

serieRoutes.get('/searchActor/:name' , async (req,res,next) => {
  try {
    const {name}= req.params;
    const data = await service.showSerieActor(name);
    res.status(200).json({data})
  } catch (error) {
    next(error);
  }
});


serieRoutes.put('/:serieId' , async (req,res,next) => {
  try {
    const {serieId}= req.params;
    const {serie, number_seasons,original_lenguage, features_seasons} = req.body;
    const data = await service.editSerie(serieId, serie, number_seasons,original_lenguage, features_seasons);
    res.status(200).json({data})
    
  } catch (error) {
    next(error);
  }
});


serieRoutes.delete('/:serieId' , async (req,res,next) => {
  try {
    const {serieId}= req.params;
    const data =await service.removeSerie(serieId);
    res.status(200).json(data);
    
  } catch (error) {
    next(error);
  }
});

module.exports = serieRoutes;