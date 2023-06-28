
// controllers/familyController.js
const { Family } = require('../DB/databaseSetup');

exports.getAllFamilies = async (req, res) => {
    const families = await Family.findAll();
    res.json(families);
};

exports.createFamily = async (req, res) => {
    const family = await Family.create(req.body);
    res.json(family);
};

exports.getFamilyById = async (req, res) => {
    const { familyId } = req.params;
    const family = await Family.findByPk(familyId);
    if (!family) return res.status(404).json({message: 'Family not found.'});
    res.json(family);
};

exports.updateFamily = async (req, res) => {
    const { familyId } = req.params;
    const family = await Family.findByPk(familyId);
    if (!family) return res.status(404).json({message: 'Family not found.'});
    await family.update(req.body);
    res.json(family);
};

exports.deleteFamily = async (req, res) => {
    const { familyId } = req.params;
    const family = await Family.findByPk(familyId);
    if (!family) return res.status(404).json({message: 'Family not found.'});
    await family.destroy();
    res.json({message: 'Family deleted.'});
};