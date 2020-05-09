const express = require(`express`);
const { MongoClient, ObjectID } = require(`mongodb`);
const bodyParser = require(`body-parser`);
const assert = require(`assert`);
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongodbURL = `mongodb://localhost:27017`
const dataBase = `contact_list`

MongoClient.connect(mongodbURL, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(err, null, `Failed connection to DB`);
    const db = client.db(dataBase);

    // Get all Contacts

    app.get(`/contacts`, (req, res) => {
        db.collection(`contact`)
            .find()
            .toArray((err, data) => {
                err ? res.send(`Can't fetch your contacts..`) : res.send(data);
            });
    });

    // Get a Contact

    app.get(`/contacts/:id`, (req, res) => {
        const id = ObjectID(req.params.id);
        db.collection(`contact`)
            .findOne({ _id: id })
            .then(data => res.send(data))
            .catch(err => res.send(`Can't fetech your contact..`));
    });

    // Add a Contact

    app.post(`/add_contact`, (req, res) => {
        db.collection(`contact`).insertOne(req.body, (err, data) => {
            err ? res.send(`Can't add a contact..`) : res.send(data);
        });
    });

    // Delete a Contact

    app.delete(`/delete_contact/:id`, (req, res) => {
        db.collection(`contact`).findOneAndDelete(
            { _id: ObjectID(req.params.id) },
            (err, data) => {
                err ? res.send(`Can't delete this contact..`) : res.send(data);
            }
        );
    });

    // Update a Contact

    app.put(`/edit_contact/:id`, (req, res) => {
        db.collection(`contact`).findOneAndUpdate(
            { _id: ObjectID(req.params.id) },
            { $set: { ...req.body } },
            (err, data) => {
                err ? res.send(`Can't modify your contact..`) : res.send(data);
            }
        );
    });

});

const PORT = `4000`

app.listen(PORT, (error) => {
    error
        ? console.log(`Failed connection to server on port ${PORT}`)
        : console.log(`Server is running on port ${PORT}`);
});