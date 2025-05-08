const Thing = require ('../models/blog');
const Blog = require('../models/blog');
const fs = require('fs');

exports.createBlog = (req, res, next) => {
    const blogObject = req.body
    const blog = new Blog({...blogObject});    
    blog.save()
      .then(() => res.status(201).json({id : blog._id}))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneBlog = (req, res, next) => {
    Blog.findOne({ _id : req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(400).json( {error} ));
};

exports.modifyBlog = (req, res, next) => {
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete thingObject._userId;
    Thing.findOne({_id: req.params.id})
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

exports.deleteBlog = (req, res, next) => {
    Blog.findOne({ _id: req.params.id})
        .then(blog => {
            blog.deleteOne()
                .then(() => res.status(201).json('Supprimé !'))
                .catch(error => res.status(400).json({error}))
        })
};
exports.getAllBlogs =(req, res, next) => {
    Blog.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};