const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


module.exports = {
    index: (req,res) =>{
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        res.render(path.resolve(__dirname, '../views/admin/administrar'), {products});
    },
    create: (req,res) =>{
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        res.render(path.resolve(__dirname, '../views/admin/create'), {products});
    },
    save: (req,res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        let ultimoProducto = products.pop();
        products.push(ultimoProducto);
        let nuevoProducto = {
            id: ultimoProducto.id +1,
            name : req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            description: req.body.description,
            brand: req.body.brand, 
            image: req.file.filename,
        }
        products.push(nuevoProducto);
        let nuevoProductoGuardar = JSON.stringify(products,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../data/products.json'), nuevoProductoGuardar);
        res.redirect('/administrar');
    },
    show: (req,res) =>{
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        let miProduct;
        products.forEach(product => {
            if(product.id == req.params.id){
                miProduct = product;
            }
        });
        res.render(path.resolve(__dirname, '../views/admin/detail'), {miProduct})
    },
    edit: (req,res)=>{
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        const productId = req.params.id;
        let productEditar = products.find(product=> product.id == productId);
        res.render(path.resolve(__dirname,'../views/admin/edit'), {productEditar});
    },  
    update: (req,res) =>{
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        req.body.id = req.params.id;
        req.body.image = req.file ? req.file.filename : req.body.oldImage;
        let productsUpdate = products.map(product =>{
            if(product.id == req.body.id){
                return product = req.body;
            }
            return product;
        })
        let productActualizar = JSON.stringify(productsUpdate,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../data/products.json'),productActualizar)
        res.redirect('/administrar');
},
destroy: (req,res) =>{
    let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
    const productDeleteId = req.params.id;
    const productsFinal = products.filter(product => product.id != productDeleteId);
    let productsGuardar = JSON.stringify(productsFinal,null,2)
    fs.writeFileSync(path.resolve(__dirname, '../data/products.json'),productsGuardar);
    res.redirect('/administrar');
},
}