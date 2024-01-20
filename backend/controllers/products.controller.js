const Category = require('../models/category.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');



const getProducts = (req, res) => {

    let filter = {};

    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') };
    }

    Product.find(filter).populate('category')
        .then((productList) => {
            res.status(200).json(productList);
        })
        .catch((err) => {
            res.status(500).json({
                Error: err,
                Success: false
            })
        })
}

const getProduct = (req, res) => {
    var id = req.params.id;

    Product.findById(id).populate('category')
        .then((product) => {
            if (product) {
                res.status(200).json({
                    Success: true,
                    product
                })
            }
            else {
                res.status(404).json({
                    Success: false,
                    message: "Product is not found"
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                Success: false,
                Error: err
            });
        })

}

const getProductsCount = (req, res) => {
    Product.countDocuments()
        .then((productCount) => {
            if (productCount) {
                res.status(200).json({
                    productCount
                });
            }
            else {
                res.status(404).json({
                    productCount
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                Error: err,
                Success: false
            })
        })
}

const getFeaturedProducts = (req, res) => {

    var count = req.params.id ? req.params.id : 0;

    Product.find({ isFeatured: true }).limit(+count)

        .then((featuredProduct) => {

            if (Object.keys(featuredProduct).length > 0) {
                res.status(200).json({
                    Success: true,
                    featuredProduct
                });
            }
            else {
                res.status(404).json({
                    Success: false,
                    message: "No Featured Product Found",
                    featuredProduct
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                Error: err,
                Success: false
            })
        })
}

const postProducts = async (req, res) => {

    var { name, description, richDescription, brand, price, category, countInStock, rating, numReviews, isFeatured } = req.body;

    const file = req.file;

    if (!file) {
        return res.status(400).send('No image in the request');
    }

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    var imagePath = `${basePath}${fileName}`;

    try {
        category = await Category.findById(category);
        if (!category) {
            return res.status(400).json({
                Success: false,
                message: "Invalid Category"
            })
        }
    } catch (e) {
        return res.status(400).json({
            Success: false,
            Error: e
        })
    }

    var product = new Product({
        name,
        description,
        richDescription,
        image: imagePath,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured
    })


    product.save()
        .then((createdProduct) => {
            if (createdProduct) {
                res.status(201).json({
                    Success: true,
                    message: `Product ${createdProduct.name} is created`,
                    createdProduct
                });
            }
            else {
                res.status(400).json({
                    Success: false,
                    Message: `Product ${name} is not created`
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                Success: false,
                message: 'Invalid id',
                Error: err
            });
        })
}


const updateProduct = async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
            Success: false,
            message: 'Inavlid id by mongoose',
        });
    }

    var id = req.params.id;

    var { name, description, richDescription, image, brand, price, categoryId, countInStock, rating, numReviews, isFeatured } = req.body;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).json({
                Success: false,
                message: "Invalid Category"
            })
        }
    } catch (e) {
        return res.status(400).json({
            Success: false,
            message: 'Invalid Category ID length',
            Error: e
        })
    }

    var product = {
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        categoryId,
        countInStock,
        rating,
        numReviews,
        isFeatured
    }

    Product.findByIdAndUpdate(id, product, { new: true })
        .then((updatedProduct) => {
            if (updatedProduct) {
                res.status(200).json({
                    Success: true,
                    message: "The product is updated",
                    updatedProduct
                })
            }
            else {
                res.status(404).json({
                    Success: false,
                    message: "The product with the given ID was not found"
                })
            }

        })
        .catch((err) => {
            res.status(400).json({
                Success: false,
                message: 'Inavlid id',
                Error: err
            });
        })

}


const updateProductGallery = async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
            Success: false,
            message: 'Inavlid id by mongoose',
        });
    }

    var id = req.params.id;

    // try {
    //     const category = await Category.findById(categoryId);
    //     if (!category) {
    //         return res.status(400).json({
    //             Success: false,
    //             message: "Invalid Category"
    //         })
    //     }
    // } catch (e) {
    //     return res.status(400).json({
    //         Success: false,
    //         message: 'Invalid Category ID length',
    //         Error: e
    //     })
    // }

    const files = req.files;
    const imagePaths = [];

    if (!files) {
        return res.status(400).send('No image in the request');
    }
    else {
        files.map((file) => {
            const fileName = file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
            imagePaths.push(`${basePath}${fileName}`);
        })
    }

    var product = {
        images: imagePaths
    }

    Product.findByIdAndUpdate(id, product, { new: true })
        .then((updatedProduct) => {
            if (updatedProduct) {
                res.status(200).json({
                    Success: true,
                    message: "The product gallery is updated",
                    updatedProduct
                })
            }
            else {
                res.status(404).json({
                    Success: false,
                    message: "The product with the given ID was not found"
                })
            }

        })
        .catch((err) => {
            res.status(400).json({
                Success: false,
                message: 'Inavlid id',
                Error: err
            });
        })

}

const deleteProduct = (req, res) => {
    var id = req.params.id;

    Product.findByIdAndRemove(id)
        .then((deletedProduct) => {
            if (deletedProduct) {
                res.status(200).json({
                    Success: true,
                    message: `The product ${deletedProduct.name} is deleted`,
                })
            }
            else {
                res.status(404).json({
                    Success: false,
                    message: `The product is not found`
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                Success: false,
                Error: err
            })
        })
}

module.exports = { getProducts, getProduct, getProductsCount, getFeaturedProducts, postProducts, updateProduct, updateProductGallery, deleteProduct };