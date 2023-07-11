
module.exports = (models) => {
    const { Income } = models;

    async function createIncome(req, res) {
        console.log('createIncome function called.', req.body);
        try {
            const income = await Income.create(req.body);
            console.log('Income created:', income);
            res.json(income);
        } catch (error) {
            console.error('Error in createIncome function:', error);
            res.status(500).json({ message: 'An error occurred while creating the income.' });
        }
    }

    async function updateIncome(req, res) {
        console.log('updateIncome function called.', req.body);
        try {
            const { id } = req.params;
            const income = await Income.findByPk(id);
            if (!income) return res.status(404).json({ message: 'Income not found.' });

            await income.update(req.body);

            console.log('Income updated:', income);
            res.json(income);
        } catch (error) {
            console.error('Error in updateIncome function:', error);
            res.status(500).json({ message: 'An error occurred while updating the income.' });
        }
    }

    async function deleteIncome(req, res) {
        console.log('deleteIncome function called.', req.params);
        try {
            const { id } = req.params;
            const income = await Income.findByPk(id);
            if (!income) return res.status(404).json({ message: 'Income not found.' });

            await income.destroy();

            console.log('Income deleted:', income);
            res.json({ message: 'Income deleted successfully.' });
        } catch (error) {
            console.error('Error in deleteIncome function:', error);
            res.status(500).json({ message: 'An error occurred while deleting the income.' });
        }
    }

    async function getIncomesForFamily(req, res) {
        console.log('getIncomesForFamily function called.', req.params);
        try {
            const { id } = req.params;
            const incomes = await Income.findAll({ where: { FamilyID: id } });
            if (!incomes) return res.status(404).json({ message: 'Incomes not found.' });
            res.json(incomes);
        } catch (error) {
            console.error('Error in getIncomesForFamily function:', error);
            res.status(500).json({ message: 'An error occurred while getting incomes for the family.' });
        }
    }

    async function getIncomeForMember(req, res) {
        console.log('getIncomeForMember function called.', req.params);
        try {
            const { id } = req.params;
            const incomes = await Income.findAll({ where: { MemberID: id } });
            if (!incomes) return res.status(404).json({ message: 'Incomes not found.' });
            res.json(incomes);
        } catch (error) {
            console.error('Error in getIncomeForMember function:', error);
            res.status(500).json({ message: 'An error occurred while getting incomes for the member.' });
        }
    }



    return {
        createIncome,
        updateIncome,
        deleteIncome,
        getIncomesForFamily,
        getIncomeForMember
    };
};
