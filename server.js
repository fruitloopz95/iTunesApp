const express = require('express');
const app = express();
const fetch = require('node-fetch');
const helmet = require('helmet');
const cors = require('cors')

app.use(helmet());
app.use(cors());

app.get('/search', function(req, res) {
	console.log(req.query.term);
	fetch(
		'https://itunes.apple.com/search?country=US&term=' + req.query.term + '&media=' + req.query.type + '&limit=200'
	)
		.then((res) => res.json())
		.then(
			(result) => {
				console.log(result.results);
				res.send(result.results);
			},
			(error) => {
				alert(error);
				res.send(error);
			}
		);
});

const path = require('path');

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
