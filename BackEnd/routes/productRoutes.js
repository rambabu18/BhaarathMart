import express from 'express'
import { deleteProduct } from '../../bhaarath/src/actions/ProductAction';
import Product from '../models/productModel'  
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", async(req,res)=>{
   const products = await Product.find({});
   res.send(products);
});

router.post("/", isAuth, isAdmin, async(req,res)=>{
   const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description

   });

   const newProduct = await product.save();
   if(newProduct){
      return res.status(201).send({message: 'New Product Created', data: newProduct});

   }

   return res.status(500).send({message: 'Error in creating product'})
})

router.delete("/:id", isAuth, isAdmin, async(req,res)=>{
   const deletedProduct = await Product.findById(req.params.id);
   if(deletedProduct){
      await deletedProduct.remove();
      res.send({message: "Product Deleted"});
   }else{
      res.send("Error in Deletion")
   }
})

router.put("/:id", isAuth, isAdmin, async(req,res)=>{
   //const productId = req.params.id;
   const product = await Product.findById(req.params.id);
   if(product){
      product.name = req.body.name;
      product.price= req.body.price;
      product.image= req.body.image;
      product.brand= req.body.brand;
      product.category= req.body.category;
      product.countInStock= req.body.countInStock;
      product.description= req.body.description;
      const updatedProduct = await product.save();
      if(updatedProduct){
       return res.status(200).send({message: ' Product Updated', data: updatedProduct});

      }

   }
   return res.status(500).send({message: 'Error in Updating product'});
   
   });

export default router