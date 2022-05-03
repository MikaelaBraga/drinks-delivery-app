import productService from '../services/product';

const createNew = async (req, res) => {
  const { body } = req;
  try {
    await productService.createNew(body);
    return res.status(201).json({ message: true });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const getAll = async (_req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getById(id);
    if (product === null) { 
      return res.status(404).json({ message: 'products does not exist' });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const product = await productService.update(body, id);
    if (product === null) { 
      return res.status(404).json({ message: 'products does not exist' });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.remove(id);
    if (product === null) { 
      return res.status(404).json({ message: 'products does not exist' });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export default {
  createNew,
  getAll,
  getById,
  update,
  remove,
};
