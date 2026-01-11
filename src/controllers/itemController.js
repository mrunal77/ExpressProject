const prisma = require('../db');

const createItem = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });

    const item = await prisma.item.create({ data: { title, description, owner: { connect: { id: req.user.id } } } });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

const getItems = async (req, res, next) => {
  try {
    const items = await prisma.item.findMany({ where: { ownerId: req.user.id } });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const getItem = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item || item.ownerId !== req.user.id) return res.status(404).json({ error: 'not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = await prisma.item.findUnique({ where: { id } });
    if (!existing || existing.ownerId !== req.user.id) return res.status(404).json({ error: 'not found' });

    const { title, description } = req.body;
    const updated = await prisma.item.update({ where: { id }, data: { title, description } });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = await prisma.item.findUnique({ where: { id } });
    if (!existing || existing.ownerId !== req.user.id) return res.status(404).json({ error: 'not found' });

    await prisma.item.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { createItem, getItems, getItem, updateItem, deleteItem };
