module.exports = (models) => {
    const { Expense } = models;

    async function createExpense(req, res) {
        console.log('controller :createExpense function called.', req.body);
        try {
            const expense = await Expense.create(req.body);
            console.log('controller : Expense created:', expense);
            res.json(expense);
        } catch (error) {
            console.error('Error in createExpense function:', error);
            res.status(500).json({ message: 'An error occurred while creating the expense.' });
        }
    }

    async function updateExpense(req, res) {
        console.log('controller :updateExpense function called.', req.body);
        try {
            const { id } = req.params;
            const expense = await Expense.findByPk(id);
            if (!expense) return res.status(404).json({ message: 'Expense not found.' });

            await expense.update(req.body);

            console.log('controller :Expense updated:', expense);
            res.json(expense);
        } catch (error) {
            console.error('Error in updateExpense function:', error);
            res.status(500).json({ message: 'An error occurred while updating the expense.' });
        }
    }

    async function deleteExpense(req, res) {
        console.log('controller :deleteExpense function called.', req.params);
        try {
            const { id } = req.params;
            const expense = await Expense.findByPk(id);
            if (!expense) return res.status(404).json({ message: 'Expense not found.' });

            await expense.destroy();

            console.log('Expense deleted:', expense);
            res.json({ message: 'Expense deleted successfully.' });
        } catch (error) {
            console.error('Error in deleteExpense function:', error);
            res.status(500).json({ message: 'An error occurred while deleting the expense.' });
        }
    }

    async function getExpensesForFamily(req, res) {
        console.log('controller :getExpensesForFamily function called.', req.params);
        try {
            const { familyId } = req.params;
            const expenses = await Expense.findAll({ where: { FamilyID: familyId } });
            if (!expenses) return res.status(404).json({ message: 'Expenses not found.' });
            res.json(expenses);
        } catch (error) {
            console.error('Error in getExpensesForFamily function:', error);
            res.status(500).json({ message: 'An error occurred while getting expenses for the family.' });
        }
    }

    async function getExpensesForMember(req, res) {
        console.log('controller :getExpensesForMember function called.', req.params);
        try {
            const memberId = req.params.id;
            const expenses = await Expense.findAll({ where: { MemberID: memberId } });
            if (!expenses) return res.status(404).json({ message: 'Expenses not found.' });
            res.json(expenses);
        } catch (error) {
            console.error('Error in getExpensesForMember function:', error);
            res.status(500).json({ message: 'An error occurred while getting expenses for the member.' });
        }
    }


    return {
        createExpense,
        updateExpense,
        deleteExpense,
        getExpensesForFamily,
        getExpensesForMember
    };
};
