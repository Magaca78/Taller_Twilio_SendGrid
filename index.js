/* Importar librerias*/
const sgMail = require('@sendgrid/mail');
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const {logErrors, errorHandler, boomErrorHandler} = require('./src/handlers/errors.handler')
const app = express();


/*Importar twilio */
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const client = require('twilio')(accountSid, authToken);
const sgMailSendGrid = require('./src/emailSendGrid/emailSendGrid')


/* Funcion para enviar mensajes de texto*/
client.messages
  .create({
     body: 'Prueba de twilio desde la app',
     from: '+17752567438',
     to: '+573225834535'
   })
  .then(message => console.log(`Mensaje enviado ${message.sid}`));

  app.use(express.json());
  app.use(express.urlencoded({extended:false}));
  app.use(logErrors)
  app.use(errorHandler)
  app.use(boomErrorHandler)

  /* Funcion para enviar mensajes de texto*/
  app.post('/api/email/confirmacion',async (req,res,next) =>{
    try {
      res.json(await sgMailSendGrid.sendOrderSerie(req.body));
    } catch(error){
      next(error);
    }
  });

  app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message});
    return;
  })

  
const routerApi = require('./src/routes')
const port = process.env.PORT

app.listen(port, () => console.log('Active port', port));

mongoose
  .connect(process.env.CONNECTION_STRING_MONGODB)
  .then(() => console.log('Sucess connect with mongodb'))
  .catch((err) => console.error(err));

/*Creacion de middlewares */
routerApi(app);