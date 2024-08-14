export function totalPhoneBill(logs) {
    var logArray = logs.split(",");
    var smsCount = 0;
    var callCount = 0;
	let calls = 2.75;
	let smses = 0.65;
    for (let i = 0; i < logArray.length; i++) {
        if (logArray[i] === "call") {
            callCount++;
        } else if (logArray[i] === "sms") {
            smsCount++;
        }
    }
    var phone_bill = (smsCount * smses) + (callCount * calls);
    return {
        total: "R" + phone_bill.toFixed(2),
        calls: callCount * calls,
        sms: smsCount * smses
    };
}