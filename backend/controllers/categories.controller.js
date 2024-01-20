const Category = require('../models/category.model');

const getCategories = (req, res) => {
    Category.find()
        .then((categoryList) => {
                res.status(200).json({
                Success: true,
                categoryList
            });
            
        })
        .catch((err)=>{
            res.status(400).json({
                Error: err,
                Success: false
            })
        })
}

const getCategory = (req, res) => {
    var id = req.params.id;
    
    Category.findById(id)
        .then((category)=>{
            if(category){
                res.status(200).json({
                    Success: true,
                    category
                })
            }
            else{
                res.status(404).json({
                    Success: false,
                    message: "The category with the given ID was not found"
                })
            }
        })
        .catch((err)=>{
            res.status(400).json({
                Success: false,
                Error: err
            })
        })
}

const postCategory = (req, res) => {
    var { name, icon, color } = req.body;
    var category = new Category({
        name,
        icon,
        color
    })

    category.save()
        .then((createdCategory) => {
            if(createdCategory){
                res.status(201).json({
                    Success: true,
                    message: `Category ${createdCategory.name} is created`,
                    createdCategory
                });
            }
            else{
                res.status(400).json({
                    Success: false,
                    Message: `Category ${name} is not created`
                })
            }
        })
}

const updateCategory = (req, res) => {
    var id = req.params.id;
    var { name, icon, color } = req.body;

    var category = {
        name,
        icon,
        color
    }
    Category.findByIdAndUpdate(id, category, {new: true})
        .then((updatedCategory)=>{
            if(updatedCategory){
                res.status(200).json({
                Success: true,
                message: "The category is updated",
                updatedCategory
            })
            }
            else{
                res.status(404).json({
                    Success: false,
                    message: "The category with the given ID was not found"
                })
            }

        })
        .catch((err) => {
            res.status(400).json({
                Error: err,
                Success: false
            });
        })

}

const deleteCategory = (req, res) => {
    var id = req.params.id;

    Category.findByIdAndRemove(id)
        .then((deletedCategory) => {
            if(deletedCategory){
                    res.status(200).json({
                    Success: true,
                    message: `The category ${deletedCategory.name} is deleted`,
                })
            }
            else{
                    res.status(404).json({
                    Success: false,
                    message: `The category is not found`
                })
            }
        })
        .catch((err)=>{
            res.status(400).json({
                Success: false,
                Error: err
            })
        })
}

module.exports = {getCategories, getCategory, postCategory, updateCategory, deleteCategory};