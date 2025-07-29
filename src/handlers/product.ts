import { prisma } from "../db";

//Get All Product
export const getProducts = async (req, res) => {

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: { products: true }
    })

    res.json({ data: user.products })
}


//Get One Product
export const getOneProduct = async (req, res) => {
    const id = req.params.id
    const product = await prisma.product.findUnique({
        where: {
            id,
            belongsToId: req.user.id
        }
    })

    res.json({ data: product })
}


//Create  Product
export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                belongsToId: req.user.id
            }
        });
        res.json({ data: product })
    } catch (err) {
        next(err)
        // console.error('Error creating product:', err);
        // res.status(500).json({ error: 'Internal Server Error' });
    }
}


//Update  Product
export const updateProduct = async (req, res) => {
    const updated = await prisma.product.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name
        }
    })
    res.json({ data: updated })
}


//Delete  Product
export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        },
    })
    res.json({ data: deleted })
}


//Get All Product With Pagination
export const getAllProductsWithPagination = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    try {
        const products = await prisma.product.findMany({
            skip,
            take,
        });

        const total = await prisma.product.count();

        res.json({
            data: products,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit)),
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};


//Get All Product With Filter
export const getAllProductsWithFilter = async (req, res) => {
    const { name } = req.query;

    try {
        const where: any = {};

        if (name) {
            where.name = {
                contains: name,
                mode: 'insensitive',
            };
        }

        const products = await prisma.product.findMany({
            where,
        });
        res.json({ data: products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
}


//Get All Product With Sorting
export const getAllProductsWithSorting = async (req, res) => {
    const { sortBy = 'createdAt', order = 'desc' } = req.query;
    try {
        const orderBy = {
            [sortBy]: order,
        };

        const products = await prisma.product.findMany({
            orderBy,
        });
        res.json({ data: products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
}

