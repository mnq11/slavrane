const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const initDatabase = require('../models/database');

let User, Service, Bill, Receipt;

initDatabase.then(db => {
    User = db.User;
    Service = db.Service;
    Bill = db.Bill;
    Receipt = db.Receipt;
});



exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.getUserServices = async (req, res) => {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({message: 'User not found.'});

    const services = await user.getServices();
    res.json(services);
};

exports.createUser = async (req, res) => {
    const { password, ...otherFields } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ password: hashedPassword, ...otherFields });
    res.json(user);
};

exports.createUser = async (req, res) => {
    const { password, ...otherFields } = req.body;

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ where: { email: otherFields.email } });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ password: hashedPassword, ...otherFields });
    res.json(user);
};


exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({message: 'User not found.'});

    await user.destroy();
    res.json({message: 'User deleted.'});
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: { email },
        include: [
            { model: Service, include: [Receipt] },  // Include Services and nested Receipts
            { model: Bill }  // Include Bills
        ]
    });
    if (!user) return res.status(404).json({message: 'User not found.'});

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({message: 'Invalid password.'});

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user.id, user });
};



exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({message: 'User not found.'});

    const { password, ...otherFields } = req.body;
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }
    Object.assign(user, otherFields);
    await user.save();
    res.json(user);
}
