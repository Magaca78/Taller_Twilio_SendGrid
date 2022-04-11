const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* Enviar mensajes al correo electronico*/
function sendEmailConfirmation(customerName, orderNroserie){
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
  
    <div class="row">
      <div class="col">
        <label>Prueba desde la APP</label>
      </div>
    </div>
  
    <div class="row">
      <p><small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, iusto dolore ullam magni, repellendus praesentium illo ut labore eaque soluta minus tenetur doloremque ipsa! Harum, unde? Voluptates illo explicabo voluptatem? </small></p>
    </div>
    
  </body>
  </html>` 
}

function getMessage(emailParams){
  /*Establecemos los parametros requeridos para el envio del correo */  
  return{
    to: emailParams.toEmail,
    from: 'jeffhc911@gmail.com',
    subject: 'Confirmacion pedido Serie NombreSerie',
    text: `Cordial saludo, ${emailParams.customerName}, te confirmamos la recepcion de tu pedido y se ha generado una factura
    con orden de compra ${emailParams.orderNroserie}, Agradecemos tu compra.`,
    html: sendEmailConfirmation(
      emailParams.customerName,
      emailParams.orderNroserie
    ),
  };
}

async function sendOrderSerie(emailParams){
  try {
    await sgMail.send(getMessage(emailParams));
    return {message: 'Confirmacion de pedido recibido, ha sido enviada'}
    
  } catch (error) {
    const message = 'No se pudo enviar la orden de compra al cliente.';
    console.error(message);
    console.error(error);
    if (error.response) console.error(error.response.body);
    return {message};
  }
}
/*
async() =>{
  console.log('Se ha enviado el correo electronico');
  await sendOrderSerie();
};*/

module.exports = {sendOrderSerie};