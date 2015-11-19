import prettyjson from 'prettyjson';
import clientFactory from 'twilio';

import _ from 'lodash';
import md5 from 'md5';

import levelup from 'levelup';
import transaction from 'level-transactions';

const key = "results";
const fromNumber = "+14423337468";
const client = clientFactory('AC5592f04d75d6ccf4eba102992a0a9f27', process.env.KEY);

const routes = router => {

    const db = levelup('./dnd', {
        valueEncoding: 'json'
    });

    var tx = transaction(db);

    const defaultRoute = (req, res) => {

        if (md5(req.params.name) !== req.params.key) {
            return res.send(500, "GET LOST");
        }


        db.get('results', (err, value) => {

            let results = value || {};

            res.render(req.url, {
                data: results
            });
        });

    };

    const adminRoute = (req, res) => {

        getTotal((err, results)=>{ 
            res.render(req.url, results);
        });

    };

    const postData = (req, res) => {
        const { judge, team, entries } = req.body;

        tx.commit(() => {
            db.get('results', (err, value) => {
                //if (err) return console.log('Ooops!', err) // likely the key was not found
                const results = value || {};

                const judgeResults = results[judge];

                const teamResults = {};

                teamResults[team] = entries;

                results[judge] = Object.assign({}, judgeResults, teamResults);

                db.put('results', results, function(err) {
                    if (err) return console.log('Ooops!', err);
                    res.send(200, {
                        success: true
                    });
                });
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

    const getTotal = (cb) => {
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
                        total[team].totalScore += teamTotal;
                        total[team].judges += 1;
                    }
                });
            });

            var sortedTotal = [];

            Object.keys(total).forEach(team => {
                sortedTotal.push([team, total[team].totalScore, total[team].judges]);
            });

            sortedTotal.sort(function(a, b) {
                return b[1] - a[1]
            });

            return cb(null, {total:sortedTotal,data:results});
        });
    }

    const sendTotal = (req, res) => {
        getTotal((err, results) => {
            if (req.body.number) {
                sendTotalSMS(req.body.number, results.total, (err, data) => {
                    res.send(200, { data: results.total });
                });
            };
        });
    }

    const sendTotalSMS = (number, scores, cb) => {
        let body = [];

        scores.forEach(score => {
            body.push({
                "team": score[0],
                "points": score[1],
                "judges": score[2]
            });
        });

        client.messages.create({
            body: JSON.stringify(body, null, 2),
            to: "+" + number,
            from: fromNumber
        }, function(err, message) {
            console.log(err || message);
            cb(null, err || message)
        });
    };

    const sendLink = (req, res) => {

        const { name, number } = req.body;
        const hash = md5(name);

        const body = `Hi ${name}, click on the link to start the judging process - http://dnd.imessage.sg/judge/${name}/${hash}`;

        client.messages.create({
            body: body,
            to: "+" + number,
            from: fromNumber,
        }, function(err, message) {
            console.log(err || message);
            res.send(200, body);
        });

    };

    const deleteRoute = (req, res) => {
        const judgeName = req.body.name;
        
        tx.commit(() => {
            db.get('results', (err, results) => {
                if (err) return res.send(200, {});
                delete results[judgeName];
                db.put('results', results, function(err) {
                    if (err) return console.log('Ooops!', err);
                    res.send(200,{data:results});
                });
            });
        });

    }

    router.get('/judge/:name/:key', defaultRoute);
    router.get('/admin/*', adminRoute); //checked

    router.post('/data', postData);
    router.post('/data/delete', deleteRoute);
    router.post('/send/link', sendLink); //checked    
    router.post('/send/total', sendTotal);

}

export default routes;
