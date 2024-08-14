import express from 'express';
import cors from 'cors';
import { longestWord, shortestWord, wordLengths } from './word_game.js';
import { totalPhoneBill } from './total_phone_bill.js';
import { enoughAirtime } from './enough_airtime.js';
const app = express();

app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// add CORS
app.use(cors());

// route definitions below here
app.get('/api/hello', function (req, res) {
    const languages = req.query.language;
    const greetings = req.query.greeting;
    res.json({ message: greetings + " in " + languages });
});

app.post('/api/hello', function (req, res) {
    const languages = req.body.language;
    const greetings = req.body.greeting;
    res.json({ message: greetings + " in " + languages });
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});

// WORD GAME

app.get('/api/word_game', function (req, res) {

    const sentence = req.query.sentence; // use what is in the function
    const longestword_res = longestWord(sentence)
    const shortestword_res = shortestWord(sentence)
    const wordlengths_res = wordLengths(sentence)
    res.json({
        longestword: longestword_res,
        shortestword: shortestword_res,
        wordLength: wordlengths_res
    });
});

// TOTAL PHONE BILL
// GLOBAL VARIABLES
let calls = 2.75;
let smses = 0.65;

app.post('/api/phonebill/total', function (req, res) {
    const log = req.body.bill;
    const totals = totalPhoneBill(log);
    const totalCost = parseFloat(totals.total.replace('R', ''));
    res.json({
        total: totals.total,
        calls: totals.calls,
        sms: totals.sms,
        totalCost
    });
});

app.get('/api/phonebill/prices', function (req, res) {
    res.json({
        call: calls,
        sms: smses
    });
});

// TYPE


app.post('/api/phonebill/price', (req, res) => {
    let { type, price } = req.body;
    if (type === 'sms' || type === 'call') {
        res.json({
            status: 'success',
            message: `This ${type} was set to ${price}`
        });
    } else {
        res.status(400).json({
            status: 'failed',
            message: 'Invalid Type'
        });
    }
});

app.get('/api/phonebill/prices', (req, res) => {
    res.json(prices);
});

// ENOUGH AIRTIME
app.post('/api/usage/add', (req, res) => {
    const { usage } = req.body;
    usageList.push(usage);
    res.json({ status: 'success', message: 'Usage added', usageList });
});

app.post('/api/usage/remove', (req, res) => {
    const { index } = req.body;
    if (index >= 0 && index < usageList.length) {
        usageList.splice(index, 1);
        res.json({ status: 'success', message: 'Usage removed', usageList });
    } else {
        res.status(400).json({ status: 'failed', message: 'Invalid index' });
    }
});

app.post('/api/enough', (req, res) => {
    const { usage, available } = req.body;
    const result = enoughAirtime(usage, available);
    const numericResult = parseFloat(result.replace('R', ''));
    
    res.json({
      result: numericResult
    });
});
