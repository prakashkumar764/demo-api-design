import { Router } from 'express'
import { body, oneOf, validationResult } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import { createProduct, getOneProduct, getProducts, updateProduct, deleteProduct } from './handlers/product'
import { create } from 'domain'
import { getUpdates, getOneUpdate, updateUpdate, createUpdate, deleteUpdate, } from './handlers/update'

const router = Router()


// Product
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)

router.post('/product',
    body('name').isString(),
    //handleInputErrors, 
    createProduct)

router.put('/product/:id',
    body('name').isString(),
    //handleInputErrors,
    updateProduct)

router.delete('/product/:id', deleteProduct)


// Update
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    updateUpdate)

router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate)

router.delete('/update/:id', deleteUpdate)


// Update Point
router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id',
    body('name').optional(),
    body('description').optional(),
    () => {

    })
router.post('/updatepoint',
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    () => { })
router.delete('/updatepoint/:id', () => { })


router.use((err, req, res, next) => {
    console.log('Error from :', err)
    res.json({ message: `in router handler` })
});

export default router