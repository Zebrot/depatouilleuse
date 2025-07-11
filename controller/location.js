const Location = require('../models/location');

exports.createLocation = (req, res) => {
    const locationObject = req.body
    const location = new Location({...locationObject});    
    location.save()
        .then(() => res.status(201).json({id : location._id}))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllLocations = (req, res) => {
    Location.find()
        .then(locations => res.status(200).json(locations))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteLocation = (req, res) => {
    Location.findOne({ _id: req.params.id})
        .then(location => {
            location.deleteOne()
                .then(() => res.status(201).json('Supprimé !'))
                .catch(error => res.status(400).json({error}))
        })
}