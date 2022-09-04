const httpServer = require('http');
const url = require('url');
const fs = require('fs');
//const math = require('math');

const replaceTemplate = require('./modules/replaceTemplate');


/// Read data from file
// Template
const tempLoan = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
 );

 /////////////////////////////////
// Template
const templateHTMLLoan = fs.readFileSync(
    `${__dirname}/template/templateLoan.html`,
    'utf-8'
  );
 const dataObj = JSON.parse(tempLoan);// string to JavaScript Object JSON

////////////////////////////////
//Create Server
// const server = httpServer.createServer(function (req, res) {// call back function
const server = httpServer.createServer( (req, res) =>{// call back function

    // const urlParameter = url.parse(req.url, true);
    // console.log(JSON.stringify(urlParameter.query));// convert to String
    // console.log(JSON.stringify(urlParameter.pathname));// convert to String
    const {query,pathname} = url.parse(req.url, true); // object distructors
    if(query.id){// if there is query parameter named id read as string
        // Courses page
        if (pathname === '/' || pathname.toLowerCase() === '/loans') {
            res.writeHead(200, {// Every thing ran successfully
                'Content-type': 'text/html'
            });
            const loan = dataObj[Number(query.id)];// convert string to numeric value
            const strLoanName = JSON.stringify(loan);
            const loanHTML = replaceTemplate(templateHTMLLoan, loan);// function that will replace the course values in the HTML
            //   res.end(` We received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}
            //   ${JSON.stringify(course)}// convert object back to string
            //   `)
          loan.amountowed=  loan.loanAmount - loan.monthlyPayement*((1+loan.interest)**loan.loanTermYears)*((((1+loan.interest)**loan.loanTermYears)-1)/loan.interest);

            res.end(loanHTML)
        }
    }
    /*else{
            res.writeHead(404, {// Server did not find what you were looking for
                'Content-type': 'text/html'
            });
            res.end(`resource not found`)
        }
    });
*/
});
//Start Listening to requests
server.listen(8000, 'localhost', ()=> {
    console.log('Listening to requests on port 8000');
});