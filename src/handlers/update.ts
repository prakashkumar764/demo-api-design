import { prisma } from "../db";


//Get One Update
export const getOneUpdate = async (req, res) => {
    const id = req.params.id
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: update })
}


//Get All Update
export const getUpdates = async (req, res) => {

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: { update: true }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.update]
    }, [])

    res.json({ data: updates })
}


//Create  Update
export const createUpdate = async (req, res) => {

    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if (!product) {
        return res.json({ message: 'Nope' })
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: { connect: { id: product.id } }
        }
    })

    res.json({ data: update })
}


//update  Update
export const updateUpdate = async (req, res) => {

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: { update: true }
    })
    // if (!products) {
    //     return res.json({ message: 'Nope' })
    // }

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.update]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        res.json({ message: 'Nope' })
    }

    const updateUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })


    res.json({ data: updateUpdate })
}

//delete  Update
export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: { update: true }
    })
    if (!products) {
        return res.json({ message: 'Nope' })
    }

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.update]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        res.json({ message: 'Nope' })
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })
    res.json({ data: deleted })
}