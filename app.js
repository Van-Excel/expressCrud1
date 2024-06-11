const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model")


app = express();

// using json middleware
app.use(express.json())


//get all products
app.get('/api/product/all', async(req, res) => {
    try{
        const productList = await Product.find();
        res.status(200).json(productList);

    }catch(error){
        console.log(error);
        res.status(400).json({"message":error.message});
    }
});


// get product by id
app.get('/api/product/:id', async(req, res) =>{
    try {
        const {id} = req.params
        const productDetail = await Product.findById(id)
        res.status(200).json(productDetail)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
        
    }
})

// create product
app.post('/api/product', async(req, res) =>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product)
        
      

    }catch(error) {
        console.log(error)
        res.status(500).json({message:error.message});
    }
   
});






mongoose.connect('mongodb+srv://admin:DDxVnLnni7NpCgsN@backend.ttgtdmm.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=backend')
.then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
         console.log("Server is listening to requests")
    });
})
.catch(() => {
    console.log("Error! Connection failed")
});

  

  