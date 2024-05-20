const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createComplex = async (req, res) => {
    const data = req.body;

    try {
        const complex = await prisma.complexes.create({
            data: {
                name: data.name,
                image: data.image,
                info: data.info,
                price: data.price,
                area: data.area,
                class: data.class,
                finishing: data.finishing,
            },
            
        });
        res.status(201).send(complex);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

const getComplexes = async (req, res) => {
    try {
        const complex = await prisma.complexes.findMany();
        res.send(complex);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getComplex = async (req, res) => {
    try {
        const complex = await prisma.complexes.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.send(complex);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateComplex = async (req, res) => {
    const data = req.body;
    try {
        const complex = await prisma.complexes.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                name: data.name,
                image: data.image,
                info: data.info,
                price: data.price ,
                area: data.area ,
                class: data.class,
                finishing: data.finishing
            },
        });
        res.send(complex);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteComplex = async (req, res) => {
    try {
        await prisma.complexes.delete({
            where: {
                id: parseInt(req.params.id),
            },
        })
        res.send({message: 'Complex deleted'});
    } catch (error) {
        res.status(500).send(error);
    }

}

module.exports = {
    createComplex, 
    getComplexes, 
    getComplex, 
    updateComplex, 
    deleteComplex 
};
