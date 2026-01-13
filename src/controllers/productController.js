const prisma = require('../db');

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    if (price === undefined || Number.isNaN(Number(price))) return res.status(400).json({ error: 'price is required and must be a number' });

    const product = await prisma.product.create({ data: { name, description, price: Number(price), owner: { connect: { id: req.user.id } } } });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({ where: { ownerId: req.user.id } });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product || product.ownerId !== req.user.id) return res.status(404).json({ error: 'not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing || existing.ownerId !== req.user.id) return res.status(404).json({ error: 'not found' });

    const { name, description, price } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    if (price === undefined || Number.isNaN(Number(price))) return res.status(400).json({ error: 'price is required and must be a number' });

    const updated = await prisma.product.update({ where: { id }, data: { name, description, price: Number(price) } });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const patchProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing || existing.ownerId !== req.user.id) return res.status(404).json({ error: 'not found' });

    const data = {};
    if (req.body.name !== undefined) data.name = req.body.name;
    if (req.body.description !== undefined) data.description = req.body.description;
    if (req.body.price !== undefined) {
      if (Number.isNaN(Number(req.body.price))) return res.status(400).json({ error: 'price must be a number' });
      data.price = Number(req.body.price);
    }

    const patched = await prisma.product.update({ where: { id }, data });
    res.json(patched);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing || existing.ownerId !== req.user.id) return res.status(404).json({ error: 'not found' });

    await prisma.product.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { createProduct, getProducts, getProduct, updateProduct, patchProduct, deleteProduct };