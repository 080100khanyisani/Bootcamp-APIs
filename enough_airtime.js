export function enoughAirtime(usage, remaining_amount) {
	var logArray = usage.split(","); //verify error
  	var call = 1.88;
  	var bundles = 12;
  	var sms = 0.75;
  	var total = 0;
  	for(let i = 0; i < logArray.length; i++) { //verify error 
    	if(logArray[i] === "sms") {
        	total += sms;
        } else if(logArray[i] === "data") {
        	total += bundles;
        } else if(logArray[i] === "call") {
        	total += call;
        }
    }
  	var current_balance = remaining_amount - total;
  	return current_balance >= 0 ? "R" + current_balance.toFixed(2) : "R0.00";
}