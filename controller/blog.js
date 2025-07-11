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
        .then(blog => res.status(200).json(blog))
        .catch(error => res.status(400).json( {error} ));
};

exports.modifyBlog = (req, res, next) => {
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete thingObject._userId;
    Blog.findOne({_id: req.params.id})
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Blog.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
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
        .then(blogs => res.status(200).json(blogs))
        .catch(error => res.status(400).json({ error }));
};

exports.getGroupedBlogs = (req, res, next) => {
    function groupByLocation(blogs) {
        return blogs.reduce((acc, post) => {
        if (!acc[post.location]) {
            acc[post.location] = [];
        }
        acc[post.location].push(post);
        return acc;
        }, {})
    }

    Blog.find()
        .then(blogs => res.status(200).json(groupByLocation(blogs)))
        .catch(error => res.status(400).json({ error }));
}

