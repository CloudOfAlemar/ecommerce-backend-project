const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const categories = await Category.findAll( {
      // be sure to include its associated Products
      include : [ { model : Product, as : "products"} ]
    } );
    if( !categories ) return res.status( 404 ).json( { message : "Categories Not Found" } );
    res.status( 200 ).json( categories );
  } catch( error ) {
    res.status( 500 ).json( error );
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const category = await Category.findByPk( req.params.id, {
      // be sure to include its associated Products
      include : [ { model : Product, as : "products" } ]
    } );
    if( !category ) return res.status( 404 ).json( { message : "Category Not Found" } );
    res.status( 200 ).json( category );
  } catch( error ) {
    res.status( 500 ).json( error );
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create( req.body );
    res.status( 201 ).json( newCategory );
  } catch( error ) {
    res.status( 500 ).json( error );
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update( { category_name : req.body.category_name }, {
      where : {
        id : req.params.id
      }
    } );
    if( !updatedCategory ) return res.status( 404 ).json( { message : "Category Not Found and therefore cannot be updated..." } );
    res.status( 200 ).json( updatedCategory );
  } catch( error ) {
    res.status( 500 ).json( error );
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
