import levelup from 'levelup';
import prettyjson from 'prettyjson';
const routes = router => {

    const db = levelup('./dnd', {
        valueEncoding: 'json'
    });

    const defaultRoute = (req, res) => {
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
                        total[team] = teamTotal;
                    } else {
                        total[team] += teamTotal;
                    }
                });
            });
            res.render('json', {
                data: total
            });
        });
    };

    const sendRoute = (req, res) => {

    }

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

    router.get('/judge/*', defaultRoute);
    router.post('/data', postData);
    router.get('/data', getData);
    router.get('/total', getTotal);
    router.get('/send/:name/:number', sendRoute);
    router.get('/delete/:name', deleteRoute);

}

export default routes;
