import levelup from 'levelup';

const routes = router => {

    const db = levelup('./dnd', {
        valueEncoding: 'json'
    });

    const defaultRoute = (req, res) => {
        res.render(req.url, {});
    };

    const postData = (req, res) => {
        const input = req.body;
        const judgeInput = input.judge;
        const teamInput = input.team;
        const entriesInput = input.entries;

        db.get('results', (err, value) => {
            //if (err) return console.log('Ooops!', err) // likely the key was not found
            let results = value || {};
            
            let judgeResults = results[judgeInput];
            
            let teamResults = {};
            teamResults[teamInput] = entriesInput;

            results[judgeInput] = Object.assign({}, judgeResults, teamResults);

            db.put('results', results, function (err) {
                if (err) return console.log('Ooops!', err);

            });
        });
    };

    const getData = (req, res) => {
        db.get('results', (err, value) => {
            if (err) return console.log('Ooops!', err) // likely the key was not found
            res.send(200, value);            
        });
    };

    const getTotal = (req, res) => {
        db.get('results', (err, results) => {
            if (err) return res.send(200, {});
            if (results === undefined) return res.send(200, {}); 

            const total = {};
            Object.keys(results).forEach(judgeId=>{
                const judgeResults = results[judgeId];
                Object.keys(judgeResults).forEach(team=>{
                    const teamResults = judgeResults[team];
                    let teamTotal=0;
                    teamResults.forEach(record=>{
                        teamTotal +=  record.points;
                    });
                });
                if (total[team] === undefined){
                    total[team] = teamTotal;
                }else{
                    total[team] += teamTotal;
                }
            });
            res.send(200, total);         
        });
    };

    router.get('/judge/*', defaultRoute);
    router.post('/data', postData);
    router.get('/data', getData);
    router.get('/total', getTotal);
}

export default routes;
