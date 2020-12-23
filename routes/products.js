var express = require('express');
var router = express.Router();

var db=require('../db');


router.get('/', function(req, res, next) {
  var query = 'select * from products';

  db.query(query, function(err,rows,fields){
       
      if(err) throw err;

    //   res.json(rows);

      res.render('products', { title: 'products:', products : rows});

  });

});

 router.get('/create-form',function(req,res,next){
     res.render('createform',{title:'create product'});
 })

 router.post('/create',function(req,res,next){
     var product_name=req.body.product_name;
     var price=req.body.price;
     var sku=req.body.sku;

     var sql = `INSERT INTO products(product_name,price,sku) VALUES ("${product_name}","${price}","${sku}")`;
     db.query(sql,function(err,result){
         if(err) throw err;
         res.redirect('/products'); 

     })
 })

 router.get('/edit-form/:id',function(req,res,next){
     var id =req.params.id;
     var sql =`SELECT * FROM products WHERE id =${id}`;
     db.query(sql,function(err,rows,fields){
         res.render('editform',{title:'update product',product:rows[0]});
     })
})
router.post('/edit/:id',function(req,res,next){
    var product_name=req.body.product_name;
    var price=req.body.price;
    var sku=req.body.sku;

    var id =req.params.id;


    var sql = `UPDATE products SET product_name="${product_name}",price="${price}",sku="${sku}" WHERE id=${id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        res.redirect('/products'); 

    })
})

router.get('/delete/:id',function(req,res,next){
    var id=req.params.id;
    var sql=`DELETE FROM products WHERE id=${id} `;
    db.query(sql,function(err,result){
        if(err) throw err;
        res.redirect('/products'); 

    })
})

module.exports = router;