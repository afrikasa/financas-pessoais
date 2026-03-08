// Firebase Sync Service
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  getDocs, 
  deleteDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';

class FirebaseSyncService {
  constructor() {
    this.userId = null;
    this.listeners = [];
  }

  // Set current user
  setUser(userId) {
    this.userId = userId;
  }

  // Cleanup listeners
  cleanup() {
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners = [];
  }

  // ============================================
  // TRANSACTIONS
  // ============================================

  async saveTransaction(transaction) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const transactionRef = doc(db, 'users', this.userId, 'transactions', transaction.id);
    await setDoc(transactionRef, {
      ...transaction,
      updatedAt: serverTimestamp()
    });
  }

  async getTransactions() {
    if (!this.userId) throw new Error('User not authenticated');
    
    const transactionsRef = collection(db, 'users', this.userId, 'transactions');
    const snapshot = await getDocs(transactionsRef);
    return snapshot.docs.map(doc => doc.data());
  }

  async deleteTransaction(transactionId) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const transactionRef = doc(db, 'users', this.userId, 'transactions', transactionId);
    await deleteDoc(transactionRef);
  }

  onTransactionsChange(callback) {
    if (!this.userId) return () => {};
    
    const transactionsRef = collection(db, 'users', this.userId, 'transactions');
    const unsubscribe = onSnapshot(transactionsRef, (snapshot) => {
      const transactions = snapshot.docs.map(doc => doc.data());
      callback(transactions);
    });
    
    this.listeners.push(unsubscribe);
    return unsubscribe;
  }

  // ============================================
  // ACCOUNTS
  // ============================================

  async saveAccount(account) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const accountRef = doc(db, 'users', this.userId, 'accounts', account.id);
    await setDoc(accountRef, {
      ...account,
      updatedAt: serverTimestamp()
    });
  }

  async getAccounts() {
    if (!this.userId) throw new Error('User not authenticated');
    
    const accountsRef = collection(db, 'users', this.userId, 'accounts');
    const snapshot = await getDocs(accountsRef);
    return snapshot.docs.map(doc => doc.data());
  }

  async deleteAccount(accountId) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const accountRef = doc(db, 'users', this.userId, 'accounts', accountId);
    await deleteDoc(accountRef);
  }

  onAccountsChange(callback) {
    if (!this.userId) return () => {};
    
    const accountsRef = collection(db, 'users', this.userId, 'accounts');
    const unsubscribe = onSnapshot(accountsRef, (snapshot) => {
      const accounts = snapshot.docs.map(doc => doc.data());
      callback(accounts);
    });
    
    this.listeners.push(unsubscribe);
    return unsubscribe;
  }

  // ============================================
  // CATEGORIES
  // ============================================

  async saveCategory(category) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const categoryRef = doc(db, 'users', this.userId, 'categories', category.id);
    await setDoc(categoryRef, {
      ...category,
      updatedAt: serverTimestamp()
    });
  }

  async getCategories() {
    if (!this.userId) throw new Error('User not authenticated');
    
    const categoriesRef = collection(db, 'users', this.userId, 'categories');
    const snapshot = await getDocs(categoriesRef);
    return snapshot.docs.map(doc => doc.data());
  }

  async deleteCategory(categoryId) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const categoryRef = doc(db, 'users', this.userId, 'categories', categoryId);
    await deleteDoc(categoryRef);
  }

  onCategoriesChange(callback) {
    if (!this.userId) return () => {};
    
    const categoriesRef = collection(db, 'users', this.userId, 'categories');
    const unsubscribe = onSnapshot(categoriesRef, (snapshot) => {
      const categories = snapshot.docs.map(doc => doc.data());
      callback(categories);
    });
    
    this.listeners.push(unsubscribe);
    return unsubscribe;
  }

  // ============================================
  // LOANS
  // ============================================

  async saveLoan(loan) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const loanRef = doc(db, 'users', this.userId, 'loans', loan.id);
    await setDoc(loanRef, {
      ...loan,
      updatedAt: serverTimestamp()
    });
  }

  async getLoans() {
    if (!this.userId) throw new Error('User not authenticated');
    
    const loansRef = collection(db, 'users', this.userId, 'loans');
    const snapshot = await getDocs(loansRef);
    return snapshot.docs.map(doc => doc.data());
  }

  async deleteLoan(loanId) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const loanRef = doc(db, 'users', this.userId, 'loans', loanId);
    await deleteDoc(loanRef);
  }

  onLoansChange(callback) {
    if (!this.userId) return () => {};
    
    const loansRef = collection(db, 'users', this.userId, 'loans');
    const unsubscribe = onSnapshot(loansRef, (snapshot) => {
      const loans = snapshot.docs.map(doc => doc.data());
      callback(loans);
    });
    
    this.listeners.push(unsubscribe);
    return unsubscribe;
  }

  // ============================================
  // INVESTMENTS
  // ============================================

  async saveInvestment(investment) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const investmentRef = doc(db, 'users', this.userId, 'investments', investment.id);
    await setDoc(investmentRef, {
      ...investment,
      updatedAt: serverTimestamp()
    });
  }

  async getInvestments() {
    if (!this.userId) throw new Error('User not authenticated');
    
    const investmentsRef = collection(db, 'users', this.userId, 'investments');
    const snapshot = await getDocs(investmentsRef);
    return snapshot.docs.map(doc => doc.data());
  }

  async deleteInvestment(investmentId) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const investmentRef = doc(db, 'users', this.userId, 'investments', investmentId);
    await deleteDoc(investmentRef);
  }

  onInvestmentsChange(callback) {
    if (!this.userId) return () => {};
    
    const investmentsRef = collection(db, 'users', this.userId, 'investments');
    const unsubscribe = onSnapshot(investmentsRef, (snapshot) => {
      const investments = snapshot.docs.map(doc => doc.data());
      callback(investments);
    });
    
    this.listeners.push(unsubscribe);
    return unsubscribe;
  }

  // ============================================
  // RECURRING PAYMENTS
  // ============================================

  async saveRecurring(recurring) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const recurringRef = doc(db, 'users', this.userId, 'recurring', recurring.id);
    await setDoc(recurringRef, {
      ...recurring,
      updatedAt: serverTimestamp()
    });
  }

  async getRecurring() {
    if (!this.userId) throw new Error('User not authenticated');
    
    const recurringRef = collection(db, 'users', this.userId, 'recurring');
    const snapshot = await getDocs(recurringRef);
    return snapshot.docs.map(doc => doc.data());
  }

  async deleteRecurring(recurringId) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const recurringRef = doc(db, 'users', this.userId, 'recurring', recurringId);
    await deleteDoc(recurringRef);
  }

  onRecurringChange(callback) {
    if (!this.userId) return () => {};
    
    const recurringRef = collection(db, 'users', this.userId, 'recurring');
    const unsubscribe = onSnapshot(recurringRef, (snapshot) => {
      const recurring = snapshot.docs.map(doc => doc.data());
      callback(recurring);
    });
    
    this.listeners.push(unsubscribe);
    return unsubscribe;
  }

  // ============================================
  // BULK OPERATIONS
  // ============================================

  async uploadAllData(data) {
    if (!this.userId) throw new Error('User not authenticated');
    
    const batch = writeBatch(db);
    
    // Upload transactions
    if (data.transactions) {
      data.transactions.forEach(transaction => {
        const ref = doc(db, 'users', this.userId, 'transactions', transaction.id);
        batch.set(ref, { ...transaction, updatedAt: serverTimestamp() });
      });
    }
    
    // Upload accounts
    if (data.accounts) {
      data.accounts.forEach(account => {
        const ref = doc(db, 'users', this.userId, 'accounts', account.id);
        batch.set(ref, { ...account, updatedAt: serverTimestamp() });
      });
    }
    
    // Upload categories
    if (data.categories) {
      data.categories.forEach(category => {
        const ref = doc(db, 'users', this.userId, 'categories', category.id);
        batch.set(ref, { ...category, updatedAt: serverTimestamp() });
      });
    }
    
    // Upload loans
    if (data.loans) {
      data.loans.forEach(loan => {
        const ref = doc(db, 'users', this.userId, 'loans', loan.id);
        batch.set(ref, { ...loan, updatedAt: serverTimestamp() });
      });
    }
    
    // Upload investments
    if (data.investments) {
      data.investments.forEach(investment => {
        const ref = doc(db, 'users', this.userId, 'investments', investment.id);
        batch.set(ref, { ...investment, updatedAt: serverTimestamp() });
      });
    }
    
    // Upload recurring
    if (data.recurring) {
      data.recurring.forEach(rec => {
        const ref = doc(db, 'users', this.userId, 'recurring', rec.id);
        batch.set(ref, { ...rec, updatedAt: serverTimestamp() });
      });
    }
    
    await batch.commit();
  }

  async downloadAllData() {
    if (!this.userId) throw new Error('User not authenticated');
    
    const [transactions, accounts, categories, loans, investments, recurring] = await Promise.all([
      this.getTransactions(),
      this.getAccounts(),
      this.getCategories(),
      this.getLoans(),
      this.getInvestments(),
      this.getRecurring()
    ]);
    
    return {
      transactions,
      accounts,
      categories,
      loans,
      investments,
      recurring
    };
  }
}

// Singleton instance
export const firebaseSync = new FirebaseSyncService();
export default firebaseSync;
