import levelup from 'levelup';

const routes = router => {

    const db = levelup('./dnd', {
        valueEncoding: 'json'
    });

    const defaultRoute = (req, res) => {
        res.render(req.url, {
            id: "asdfasdfsd"
        });
    };

    const postData = (req, res) => {
        const input = req.body;
        const judgeInput = input.judge;
        const entriesInput = input.entries;

        db.get('results', (err, value) => {
            if (err) return console.log('Ooops!', err) // likely the key was not found
            let results = {};
            results[judgeInput] = entriesInput;
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

    router.get('/judge/*', defaultRoute);
    router.post('/data', postData);
    router.get('/data', getData);
}

export default routes;
