const Arbitre = require('../models/arbitre');

exports.getAllArbitres = async (req, res) => {
  try {
    const arbitres = await Arbitre.find();
    res.status(200).json(arbitres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArbitreById = async (req, res) => {
  try {
    const arbitre = await Arbitre.findById(req.params.id);
    if (!arbitre) {
      return res.status(404).json({ message: 'Arbitre not found' });
    }
    res.status(200).json(arbitre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createArbitre = async (req, res) => {
  const arbitre = new Arbitre(req.body);
  try {
    const newArbitre = await arbitre.save();
    res.status(201).json(newArbitre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateArbitre = async (req, res) => {
  try {
    const updatedArbitre = await Arbitre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArbitre) {
      return res.status(404).json({ message: 'Arbitre not found' });
    }
    res.status(200).json(updatedArbitre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteArbitre = async (req, res) => {
  try {
    const deletedArbitre = await Arbitre.findByIdAndDelete(req.params.id);
    if (!deletedArbitre) {
      return res.status(404).json({ message: 'Arbitre not found' });
    }
    res.status(200).json({ message: 'Arbitre deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};