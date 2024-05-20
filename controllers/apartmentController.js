const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createApartment = async (req, res) => {
    const data = req.body;
    try {
        const apartment = await prisma.flats.create({
            data: {
                img: data.img,
                price: data.price,
                rooms: data.rooms,
                floor: data.floor,
                liter: data.liter,
            },
        });
        res.status(201).send(apartment);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getApartments = async (req, res) => {
    try {
        const apartments = await prisma.flats.findMany({
            include: {
                complex: true,
            },
        });
        res.send(apartments);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getApartment = async (req, res) => {
    try {
        const apartment = await prisma.flats.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            include: {
                complex: true,
            },
        });
        if (!apartment) {
            return res.status(404).send({ error: 'Apartment not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateApartment = async (req, res) => {
    try {
        const apartment = await prisma.flats.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                img: data.img,
                price: data.price,
                rooms: data.rooms,
                floor: data.floor,
                liter: data.liter,
            },
        });
        res.send(apartment);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteApartment = async (req, res) => {
    try {
        await prisma.flats.delete({
            where: {
                id: parseInt(req.params.id),
            }
        })
        res.send({ message: 'Apartment deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createApartment, 
    getApartments, 
    getApartment, 
    updateApartment, 
    deleteApartment
}