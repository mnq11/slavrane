module.exports = (sequelize, DataTypes) => {
    const Loan = sequelize.define('Loan', {
        LoanID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        MemberID: DataTypes.INTEGER,
        FamilyID: DataTypes.INTEGER,
        Amount: DataTypes.DECIMAL,
        InterestRate: DataTypes.DECIMAL,
        StartDate: DataTypes.DATE,
        DueDate: DataTypes.DATE,
        Lender: DataTypes.STRING,
        LoanPurpose: DataTypes.TEXT,
        RepaymentStatus: DataTypes.STRING
    });

    return Loan;
};
