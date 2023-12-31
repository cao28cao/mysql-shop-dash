const productModel = require('../../../models/data_model/lv2/product.model');
const productCategoryModel = require('../../../models/data_model/lv1/productCategory.model');
const jwtConfig = require('../../../config/jwt.config');
const jwtUtil = require('../../../utils/jwt.util');
const { Op } = require("sequelize");


exports.getMaxID = async (req, res) => {
    try {
        const maxID = await productModel.max('id');
        res.status(200).json(maxID);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving product."
        });
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        const products = await productModel.findAll();
        const productPromises = products.map(async (product) => {
            const category = await productCategoryModel.findByPk(product.category_id);
            delete product.dataValues.category_id;
            return { ...product.dataValues, category_name: category.category_name };
        }, Promise.resolve());
        const productWithCategory = await Promise.all(productPromises);
        res.status(200).json(productWithCategory);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving products."
        });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await productModel.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found with id " + req.params.id
            });
        }
        const category = await productCategoryModel.findByPk(product.category_id);
        delete product.dataValues.category_id;
        const productWithCategory = { ...product.dataValues, category_name: category.category_name };
        res.status(200).json(productWithCategory);

    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving product."
        });
    }
}

exports.createProduct = async (req, res) => {
    const maxID = await productModel.max('id');
    const category_id = await productCategoryModel.findOne({
        where: {
            category_name: req.body.category_name
        }
    })
    try {
        const product = {
            id: maxID + 1,
            name: req.body.name,
            description: req.body.description,
            product_image: req.body.product_image,
            category_id: category_id.id
        }
        const newProduct = await productModel.create(product);
        res.status(200).json(newProduct);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the product."
        });
    }
}

exports.updateProduct = async (req, res) => {
    const category_id = await productCategoryModel.findOne({
        where: {
            category_name: req.body.category_name
        }
    })
    try {
        const product = {
            name: req.body.name,
            description: req.body.description,
            product_image: req.body.product_image,
            category_id: category_id.id
        }
        const productUpdate = await productModel.update(product, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json("Update complete");
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the product."
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found with id " + req.params.id
            });
        }
        const productDelete = await productModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json("Delete complete " + productDelete + " product");
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting the product."
        });
    }
}