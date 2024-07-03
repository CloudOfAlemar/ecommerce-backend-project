const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll( {
      include : [ { model : Product, through : ProductTag, as : "products" } ]
    } );
    if( !tags ) return res.status( 404 ).json( { message : "Tags Not Found" } );
    res.status( 200 ).json( tags );
  } catch( error ) {
    res.status( 500 ).json( error );
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk( req.params.id, {
      include : [ { model : Product, through : ProductTag, as : "products" } ]
    } );
    if( !tag ) return res.status( 404 ).json( { message : "Tag Not Found" } );
    res.status( 200 ).json( tag );
  } catch( error ) {
    res.status( 500 ).json( error );
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create( req.body );
    res.status( 200 ).json( newTag );
  } catch( error ) {
    res.status( 500 ).json( error );
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update( { tag_name : req.body.tag_name }, {
      where : {
        id : req.params.id
      }
    } );
    console.log( updatedTag );
    if( !updatedTag ) return res.status( 404 ).json( { message : "Tag Not Found and therefore cannot be updated..." } );
    res.status( 200 ).json( updatedTag );
  } catch( error ) {
    res.status( 500 ).json( error );
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy( {
      where : {
        id : req.params.id
      }
    } );
    if( !deletedTag ) return res.status( 404 ).json( { message : "Tag Not Found and therefore cannot be deleted..." } );
    res.status( 200 ).json( deletedTag );
  } catch( error ) {
    res.status( 500 ).json( error );
  }
});

module.exports = router;
