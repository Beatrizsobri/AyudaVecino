import apiClient from './apiClient';

const transactionsApi = {
  // Get all transactions
  getAllTransactions: (transactionType, page = 1) => {
    const params = {
      page: page,
    };
    if (transactionType !== undefined) {
      params.transaction_type = transactionType;
    }
    return apiClient.get('/transactions/', { params });
  },

  // Get a single transaction by ID
  getTransaction: (id) => {
    return apiClient.get(`/transactions/${id}/`);
  },

  // Create a new transaction
  createTransaction: (transactionData) => {
    return apiClient.post('/transactions/', transactionData);
  },

  // Update an existing transaction
  updateTransaction: (id, transactionData) => {
    return apiClient.put(`/transactions/${id}/`, transactionData);
  },

  // Delete a transaction
  deleteTransaction: (id) => {
    return apiClient.delete(`/transactions/${id}/`);
  },

  // Get transaction totals
  getTotals: () => {
    return apiClient.get('/transactions/totals/');
  }
};

export default transactionsApi;
