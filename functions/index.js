const functions = require('firebase-functions');

const MeiliSearch = require('meilisearch');

const client = new MeiliSearch({
  host: 'http://35.232.184.124',
  apiKey: '793c93af9e13c8380ed364b042268dba4466fae33f79d636fbdb2d2275c450dd',
});

exports.meilisearchIndex = functions.firestore
  .document('movies/{id}')
  .onCreate(async (snapshot, context) => {
    const index = client.getIndex('movies');

    const id = snapshot.id;
    const { title, year, description } = snapshot.data();

    const response = await index.addDocuments([
      { id, title, year, description }
    ])
    console.log(response)

  });


exports.meilisearchQuery = functions.https.onRequest(async (req, res) => {
  const index = client.getIndex('movies');

  const search = await index.search(req.body.q);

  res.send(search);
});