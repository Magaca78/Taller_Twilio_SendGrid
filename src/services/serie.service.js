const serieSchema = require('../models/serie.model');
const Boom = require('@hapi/boom');

class SerieService{
  async createSerie(serie){
    serie.save();
    return serie;
  }
  async listSerie(){
    return new Promise((resolve,reject) =>{
      setTimeout(() => resolve(serieSchema.find()),1000);
    });
    
  }

  async showSerie(serieId) {
    return serieSchema.findById({_id: serieId }).then(
      (serieFind) => {
        if (!serieFind) throw Boom.notFound('No se encontro la serie');
        return serieFind
      }
    )
  }

  async showSerieDate(date){
    return serieSchema.find({'features_seasons.premier_date': date }).then(
      (dateFind) => {
        if (!dateFind) throw Boom.notFound('No se encontro la fecha');
        return dateFind
      }
    )
  }

  async showSerieActor(name){
    return serieSchema.find({ 'features_seasons.cast': name }).then(
      (nameFind) => {
        if (!nameFind) throw Boom.notFound('No se encontro el actor');
        return nameFind
      }
    )
  }

  async editSerie(serieId,serie, number_seasons, original_lenguage,features_seasons) {
      return serieSchema.findById({_id: serieId}).then(
        (serieFind) =>{
        if(!serieFind) throw Boom.notFound('Serie no encontrada')
        return serieSchema.updateOne(
          {_id:serieId}, 
          {serie,number_seasons,original_lenguage,features_seasons}
        );
      });
  }
  async removeSerie(serieId){
    return serieSchema.findById({_id: serieId}).then(
      (serieFind)=>{
        if(!serieFind) throw Boom.notFound('No se encontró la serie');
        return serieSchema.deleteOne(serieFind);
      }
    ); 
  }
}
module.exports = SerieService;