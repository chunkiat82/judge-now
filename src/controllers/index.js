import levelup from 'levelup';
import prettyjson from 'prettyjson';
import clientFactory from 'twilio';

import _ from 'lodash';
import md5 from 'md5';

const fromNumber = "+14423337468";

const client = clientFactory('AC5592f04d75d6ccf4eba102992a0a9f27', process.env.KEY);

const routes = router => {

    const db = levelup('./dnd', {
        valueEncoding: 'json'
    });

    const defaultRoute = (req, res) => {

        if (md5(req.params.name) !== req.params.key){
            return res.send(500, "GET LOST");
        }


        db.get('results', (err, value) => {
            //if (err) return console.log('Ooops!', err) // likely the key was not found
            let results = value || {};
            //console.log(results);
            res.render(req.url, {
                data: results
            });
        });

    };

    const postData = (req, res) => {
        const {judge, team, entries} = req.body;
        
        db.get('results', (err, value) => {
            //if (err) return console.log('Ooops!', err) // likely the key was not found
            const results = value || {};

            const judgeResults = results[judge];

            const teamResults = {};

            teamResults[team] = entries;

            results[judge] = Object.assign({}, judgeResults, teamResults);

            db.put('results', results, function(err) {
                if (err) return console.log('Ooops!', err);

            });
        });
    };

    const getData = (req, res) => {
        db.get('results', (err, value) => {
            res.render('json', {
                data: value
            });
        });
    };

    const getTotal = (req, res) => {
        db.get('results', (err, results) => {
            if (err) return res.send(200, {});
            if (results === undefined) return res.send(200, {});

            const total = {};
            Object.keys(results).forEach(judgeId => {
                const judgeResults = results[judgeId];
                Object.keys(judgeResults).forEach(team => {
                    const teamResults = judgeResults[team];
                    let teamTotal = 0;
                    teamResults.forEach(record => {
                        if (record.title !== 'total') {
                            teamTotal += record.points;
                        }
                    });
                    if (total[team] === undefined) {
                        total[team] = {};
                        total[team].totalScore = teamTotal;
                        total[team].judges = 1;
                    } else {
                        total[team].totalScore  += teamTotal;
                        total[team].judges += 1;
                    }
                });
            });

            var sortedTotal = [];

            Object.keys(total).forEach(team => {
                sortedTotal.push([team, total[team].totalScore, total[team].judges]);
            });

            sortedTotal.sort(function(a, b) {return b[1] - a[1]});            

            if (req.params.number){
                sendSMS(req.params.number,sortedTotal,()=>{
                    res.render('json', {
                        data: sortedTotal
                    });        
                });
            }else{
                res.render('json', {
                    data: sortedTotal
                });
            }     
        });

        
    };

    const sendSMS = (number, scores,cb) => { 
        let body = [];
        
        scores.forEach(score=>{
            body.push({"team":score[0],"points":score[1],"judges":score[2]});
        });

        client.messages.create({
            body: JSON.stringify(body,null,2),
            to: "+65"+number,
            from: fromNumber
        }, function(err, message) {            
            console.log(err || message);            
            cb()
        });
    };

    const sendRoute = (req, res) => {
        const name = req.params.name;
        const number = req.params.number;
        const hash = md5(name);        

        const body = `Hi ${name}, click on the link to start the judging process - http://dnd.imessage.sg/judge/${name}/${hash}`;

        client.messages.create({
            body: body,
            to: "+65"+number,
            from: fromNumber,
        }, function(err, message) {                     
            res.send(200,body);
        });

    };

    const deleteRoute = (req, res) => {
        const judgeId = req.params.name;
        db.get('results', (err, results) => {
            if (err) return res.send(200, {});
            delete results[judgeId];
            db.put('results', results, function(err) {
                if (err) return console.log('Ooops!', err);
                getData(req, res);
            });
        });

    }

    router.get('/judge/:name/:key', defaultRoute);
    router.post('/data', postData);
    router.get('/data', getData);
    router.get('/total/:number?', getTotal);
    router.get('/send/:name/:number', sendRoute);
    router.get('/delete/:name', deleteRoute);

}

export default routes;
