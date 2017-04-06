const nodemailer = require('nodemailer');
let transport = nodemailer.createTransport({
	service: 'gmail',
	 auth:{
	 user:'mohammadhunan@gmail.com',
	 pass:'Lidsfitteds1'
	}
	});

 let mailOptions = {
	from: '"mo " <mohammadhunan@gmail.com>',
	 to: 'mohammad.chughtai@gmail.com, mohammad.chughtai@gmail.com',
	subject: 'foo',
 	text:'foobar',
	 html:'<b>fohbaz</b>'
	 };

transport.sendMail(mailOptions,(error,info)=>{
	 if(error){
	 return console.log(error);
	 }
	 console.log('mssg sent:', info.messageId, info.response);
	 });