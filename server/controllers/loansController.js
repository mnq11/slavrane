module.exports = (models) => {
    const { Loan } = models;

    async function createLoan(req, res) {
        console.log('createLoan function called.', req.body);
        try {
            const loan = await Loan.create(req.body);
            console.log('Loan created:', loan);
            res.json(loan);
        } catch (error) {
            console.error('Error in createLoan function:', error);
            res.status(500).json({ message: 'An error occurred while creating the loan.' });
        }
    }

    async function updateLoan(req, res) {
        console.log('updateLoan function called.', req.body);
        try {
            const { id } = req.params;
            const loan = await Loan.findByPk(id);
            if (!loan) return res.status(404).json({ message: 'Loan not found.' });

            await loan.update(req.body);

            console.log('Loan updated:', loan);
            res.json(loan);
        } catch (error) {
            console.error('Error in updateLoan function:', error);
            res.status(500).json({ message: 'An error occurred while updating the loan.' });
        }
    }

    async function deleteLoan(req, res) {
        console.log('deleteLoan function called.', req.params);
        try {
            const { id } = req.params;
            const loan = await Loan.findByPk(id);
            if (!loan) return res.status(404).json({ message: 'Loan not found.' });

            await loan.destroy();

            console.log('Loan deleted:', loan);
            res.json({ message: 'Loan deleted successfully.' });
        } catch (error) {
            console.error('Error in deleteLoan function:', error);
            res.status(500).json({ message: 'An error occurred while deleting the loan.' });
        }
    }

    async function getLoansForFamily(req, res) {
        console.log('getLoansForFamily function called.', req.params);
        try {
            const { familyId } = req.params;
            const loans = await Loan.findAll({ where: { FamilyID: familyId } });
            if (!loans) return res.status(404).json({ message: 'Loans not found.' });
            res.json(loans);
        } catch (error) {
            console.error('Error in getLoansForFamily function:', error);
            res.status(500).json({ message: 'An error occurred while getting loans for the family.' });
        }
    }

    return {
        createLoan,
        updateLoan,
        deleteLoan,
        getLoansForFamily
    };
};
