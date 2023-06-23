const Service = require('../models/service');
const User = require('../models/user');

exports.getAllServices = async (req, res) => {
    const services = await Service.findAll();
    res.json(services);
};

exports.createService = async (req, res) => {
    const user = await User.findByPk(req.body.userId);
    if (!user) return res.status(404).json({message: 'User not found.'});

    const service = await user.createService(req.body);
    res.json(service);
};
