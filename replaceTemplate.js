
module.exports = (htmlStr, loan)=>{ // fat arrow function or lambda
    let output = htmlStr.replace(/{%ID%}/g, loan.id);
    output = output.replace(/{%CUSTOMERNAME%}/g, loan.customerName);
    output = output.replace(/{%PHONENUMBER%}/g, loan.phoneNumber);
    output = output.replace(/{%ADDRESS%}/g, loan.address);
    output = output.replace(/{%LOANAMOUNT%}/g, loan.loanAmount);
    output = output.replace(/{%INTEREST%}/g, loan.interest);
    output = output.replace(/{%LOANTERMYEARS%}/g, loan.loanTermYears);
    output = output.replace(/{%LOANTYPE%}/g, loan.loanType);
    output = output.replace(/{%DESCRIPTION%}/g, loan.description);
    output = output.replace(/{%AMOUNTOWED%}/g, loan.amountowed);

    return output;
}