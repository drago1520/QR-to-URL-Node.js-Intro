/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";
const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is your url?',
    }
  ];
  
  inquirer
    .prompt(questions)
    .then((answers) => {
      console.log('Answers:', answers.name);
      var url = answers.name;
      var qrCode = qr.image(url, {type: "png"});
      qrCode.pipe(fs.createWriteStream("./qr-code.png"));
      console.log("Generated and saved!");
      fs.writeFile("./url.txt", url, (err)=>{
        if (err) throw err;
        console.log("The file has been saved!");
      })
    })
    .catch((error) => {
      console.error(error);
    });