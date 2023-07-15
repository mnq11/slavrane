import axios from 'axios';

// Create a custom axios instance
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        let errorMessage = error.response.data.message;
        if (error.response.data.errors) {
            errorMessage += ': ' + error.response.data.errors.join(', ');
        }
        throw new Error(errorMessage);
    } else {
        throw new Error("An error occurred while processing your request.");
    }
});

export async function loginMember(email, password) {
    const response = await api.post('/members/login', { email, password });
    return response.data;
}

export async function registerMember(values) {
    const response = await api.post('/members', values);
    return response.data;
}

export async function getMembersByFamilyId(familyId) {
    const response = await api.get(`/members/families/${familyId}`);
    return response.data;
}

export async function getAllFamilies() {
    const response = await api.get('/families/getFamilies');
    return response.data;
}

export async function createFamily(family) {
    const response = await api.post('/families', family);
    return response.data;
}

export async function updateFamily(family) {
    return await api.put(`/families/${family.FamilyID}`, family);
}

export async function deleteFamily(familyId) {
    const response = await api.delete(`/families/${familyId}`);
    return response.data;
}

export async function createMember(member) {
    const response = await api.post('/members', {
        ...member,
        FamilyID: parseInt(member.FamilyID), // ensure FamilyID is an integer
    });
    console.log('Api log: for create Member', response.data);
    return response.data;
}

export async function updateMember(member) {
    const response = await api.put(`/members/${member.MemberID}`, member);
    console.log('Api log: for update Member', response.data);
    return response.data;
}

export async function deleteMember(memberId) {
    const response = await api.delete(`/members/${memberId}`);
    console.log('Api log: for delete Member', response.data);
    return response.data;
}

export async function createTask(task) {
    const response = await api.post('/tasks/createTask', task);
    console.log('Api log: for create Task', response.data);
    return response.data;
}

export async function updateTask(task) {
    const response = await api.put(`/tasks/updateTask/${task.TaskID}`, task);
    console.log('Api log: for update Task', response.data);
    return response.data;
}

export async function deleteTask(taskId) {
    const response = await api.delete(`/tasks/deleteTask/${taskId}`);
    console.log('Api log: for delete Task', response.data);
    return response.data;
}

export async function getTasksForMember(memberId) {
    const response = await api.get(`/tasks/member/${memberId}`);
    console.log('Api log: for getTasksForMember', response.data);
    return response.data;
}

export async function createSkill(skill) {
    const response = await api.post('/skills/createSkill', skill);
    console.log('Api log: for create Skill', response.data);
    return response.data;
}

export async function updateSkill(skill) {
    const response = await api.put(`/skills/updateSkill/${skill.SkillID}`, skill);
    console.log('Api log: for update Skill', response.data);
    return response.data;
}

export async function deleteSkill(skillId) {
    const response = await api.delete(`/skills/deleteSkill/${skillId}`);
    console.log('Api log: for delete Skill', response.data);
    return response.data;
}

export async function getSkillsForMember(memberId) {
    const response = await api.get(`/skills/member/${memberId}`);
    console.log('Api log: for getSkillsForMember', response.data);
    return response.data;
}

export async function createExpense(expense) {
    const response = await api.post('/expenses/createExpense', expense);
    console.log('Api log: for create Expense', response.data);
    return response.data;
}

export async function updateExpense(expense) {
    const response = await api.put(`/expenses/updateExpense/${expense.ExpenseID}`, expense);
    console.log('Api log: for update Expense', response.data);
    return response.data;
}

export async function deleteExpense(expenseId) {
    const response = await api.delete(`/expenses/deleteExpense/${expenseId}`);
    console.log('Api log: for delete Expense', response.data);
    return response.data;
}


export async function getExpensesForFamily(familyId) {
    const response = await api.get(`/expenses/family/${familyId}`);
    console.log('Api log: for getExpensesForFamily', response.data);
    return response.data;
}
export async function getExpensesForMember(memberId) {
    const response = await api.get(`/expenses/member/${memberId}`);
    console.log('Api log: for getExpensesForMember', response.data);
    return response.data;
}

export async function getIncomesForMember(memberId) {
    const response = await api.get(`/incomes/member/${memberId}`);
    console.log('Api log: for getIncomesForMember', response.data);
    return response.data;
}

export async function createIncome(income) {
    const response = await api.post('/incomes/createIncome', income);
    console.log('Api log: for create Income', response.data);
    return response.data;
}
export async function updateIncome(income) {
    const response = await api.put(`/incomes/updateIncome/${income.IncomeID}`, income);
    console.log('Api log: for update Income', response.data);
    return response.data;
}

export async function deleteIncome(incomeId) {
    const response = await api.delete(`/incomes/deleteIncome/${incomeId}`);
    console.log('Api log: for delete Income', response.data);
    return response.data;
}
export async function getLoansForFamily(memberId) {
    const response = await api.get(`/loans/family/${memberId}`);
    console.log('Api log: for getLoansForMember', response.data);
    return response.data;
}

export async function getLoansForMember(memberId) {
    const response = await api.get(`/loans/member/${memberId}`);
    console.log('Api log: for getLoansForMember', response.data);
    return response.data;
}
export async function createLoan(loan) {
    const response = await api.post('/loans/createLoan', loan);
    console.log('Api log: for create Loan', response.data);
    return response.data;
}

export async function updateLoan(loan) {
    const response = await api.put(`/loans/updateLoan/${loan.LoanID}`, loan);
    console.log('Api log: for update Loan', response.data);
    return response.data;
}

export async function deleteLoan(loanId) {
    const response = await api.delete(`/loans/deleteLoan/${loanId}`);
    console.log('Api log: for delete Loan', response.data);
    return response.data;
}

export async function getSavingsForMember(memberId) {
    const response = await api.get(`/savings/member/${memberId}`);
    console.log('Api log: for getSavingsForMember', response.data);
    return response.data;
}

export async function createSaving(saving) {
    const response = await api.post('/savings/createSaving', saving);
    console.log('Api log: for create Saving', response.data);
    return response.data;
}

export async function updateSaving(saving) {
    const response = await api.put(`/savings/updateSaving/${saving.SavingID}`, saving);
    console.log('Api log: for update Saving', response.data);
    return response.data;
}

export async function deleteSaving(savingId) {
    const response = await api.delete(`/savings/deleteSaving/${savingId}`);
    console.log('Api log: for delete Saving', response.data);
    return response.data;
}

export async function getResourcesForFamily(familyId) {
    const response = await api.get(`/resources/family/${familyId}`);
    console.log('Api log: for getResourcesForFamily', response.data);
    return response.data;
}
export async function getResourcesForMember(memberId) {
    const response = await api.get(`/resources/member/${memberId}`);
    console.log('Api log: for getResourcesForMember', response.data);
    return response.data;
}

export async function createResource(resource) {
    const response = await api.post('/resources/createResource', resource);
    console.log('Api log: for create Resource', response.data);
    return response.data;
}

export async function updateResource(resource) {
    const response = await api.put(`/resources/updateResource/${resource.ResourceID}`, resource);
    console.log('Api log: for update Resource', response.data);
    return response.data;
}

export async function deleteResource(resourceId) {
    const response = await api.delete(`/resources/deleteResource/${resourceId}`);
    console.log('Api log: for delete Resource', response.data);
    return response.data;
}
