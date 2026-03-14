import { useState, useEffect, useRef } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import FirebaseSyncPanel from './components/FirebaseSyncPanel';
import { ToastProvider, useToast } from './components/Toast';
import { 
  CardSkeleton, 
  TransactionListSkeleton,
  LoadingOverlay
} from './components/Loading';
import { useFirebaseSync } from './hooks/useFirebaseSync';
import { firebaseSync } from './services/firebaseSync';

// Ícones SVG bonitos (em vez de emojis)
const PlusCircle = ({ className = 'w-5 h-5' }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
        
        const Trash2 = ({ className = 'w-5 h-5' }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        );
        
        const Wallet = ({ className = 'w-5 h-5' }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
        );
        
        const Building = ({ className = 'w-5 h-5' }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        );
        
        const TrendingUp = ({ className = 'w-5 h-5' }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        );
        
        const DollarSign = ({ className = 'w-5 h-5' }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
        
        const PieChartIcon = ({ className = 'w-6 h-6' }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
        );
        

const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Alimentação', type: 'expense', color: 'bg-red-100 text-red-800' },
  { id: '2', name: 'Transporte', type: 'expense', color: 'bg-orange-100 text-orange-800' },
  { id: '3', name: 'Habitação', type: 'expense', color: 'bg-purple-100 text-purple-800' },
  { id: '4', name: 'Lazer', type: 'expense', color: 'bg-blue-100 text-blue-800' },
  { id: '5', name: 'Salário', type: 'income', color: 'bg-green-100 text-green-800' },
  { id: '6', name: 'Freelance', type: 'income', color: 'bg-emerald-100 text-emerald-800' },
  { id: '7', name: 'Seguros', type: 'expense', color: 'bg-pink-100 text-pink-800' },
  { id: '8', name: 'Desporto', type: 'expense', color: 'bg-yellow-100 text-yellow-800' },
  { id: '9', name: 'EMPRESTIMOS', type: 'expense', color: 'bg-gray-100 text-gray-800' },
];

const DEFAULT_ACCOUNTS = [
  { id: 'ctt-default', name: 'CONTA CTT', balance: 0, type: 'bank' }
];

function FinanceAppContent() {
  // Hook useToast para mostrar notificações
  const toast = useToast();
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [accounts, setAccounts] = useState(DEFAULT_ACCOUNTS);
  const [investments, setInvestments] = useState([]);
  const [recurring, setRecurring] = useState([]);
  const [loans, setLoans] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState('green'); // green, blue, purple, orange
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [chartPeriod, setChartPeriod] = useState('30d'); // 7d, 30d, 90d, 1y, all
  const [goals, setGoals] = useState([]);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalFormData, setGoalFormData] = useState({});
  const [budgets, setBudgets] = useState({});
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetFormData, setBudgetFormData] = useState({});
  
  // Firebase sync hook
  const { 
    user, 
    loading: firebaseLoading, 
    syncing, 
    error: firebaseError,
    signIn, 
    signOut,
    uploadLocalData,
    downloadFirebaseData
  } = useFirebaseSync();
  
  // Theme colors
  const themeColors = {
    green: {
      from: 'from-green-600',
      to: 'to-emerald-600',
      hoverFrom: 'hover:from-green-700',
      hoverTo: 'hover:to-emerald-700',
      bg: 'bg-green-600',
      text: 'text-green-600',
      border: 'border-green-600'
    },
    blue: {
      from: 'from-blue-600',
      to: 'to-cyan-600',
      hoverFrom: 'hover:from-blue-700',
      hoverTo: 'hover:to-cyan-700',
      bg: 'bg-blue-600',
      text: 'text-blue-600',
      border: 'border-blue-600'
    },
    purple: {
      from: 'from-purple-600',
      to: 'to-pink-600',
      hoverFrom: 'hover:from-purple-700',
      hoverTo: 'hover:to-pink-700',
      bg: 'bg-purple-600',
      text: 'text-purple-600',
      border: 'border-purple-600'
    },
    orange: {
      from: 'from-orange-600',
      to: 'to-red-600',
      hoverFrom: 'hover:from-orange-700',
      hoverTo: 'hover:to-red-700',
      bg: 'bg-orange-600',
      text: 'text-orange-600',
      border: 'border-orange-600'
    }
  };
  
  const currentTheme = themeColors[theme];
  
  // Auto-download data when user logs in
  useEffect(() => {
    if (user && !firebaseLoading) {
      console.log('🔄 User logged in, auto-downloading data from cloud...');
      downloadFirebaseData().then(data => {
        if (data) {
          console.log('✅ Data downloaded:', data);
          if (data.transactions !== undefined) {
            setTransactions(data.transactions);
            localStorage.setItem('finance_transactions', JSON.stringify(data.transactions));
          }
          if (data.categories !== undefined) {
            setCategories(data.categories);
            localStorage.setItem('finance_categories', JSON.stringify(data.categories));
          }
          if (data.accounts !== undefined) {
            setAccounts(data.accounts);
            localStorage.setItem('finance_accounts', JSON.stringify(data.accounts));
          }
          if (data.investments !== undefined) {
            setInvestments(data.investments);
            localStorage.setItem('finance_investments', JSON.stringify(data.investments));
          }
          if (data.recurring !== undefined) {
            setRecurring(data.recurring);
            localStorage.setItem('finance_recurring', JSON.stringify(data.recurring));
          }
          if (data.loans !== undefined) {
            setLoans(data.loans);
            localStorage.setItem('finance_loans', JSON.stringify(data.loans));
          }
          if (data.goals !== undefined) {
            setGoals(data.goals);
            localStorage.setItem('finance_goals', JSON.stringify(data.goals));
          }
          if (data.budgets !== undefined) {
            setBudgets(data.budgets);
            localStorage.setItem('finance_budgets', JSON.stringify(data.budgets));
          }
          toast.success('Dados carregados da cloud!');
        }
      }).catch(err => {
        console.error('❌ Error auto-downloading:', err);
      });
    }
  }, [user, firebaseLoading]);
  
  // Ref para o settings dropdown
  const settingsRef = useRef(null);
  
  // Hook para fechar settings ao clicar fora ou pressionar ESC
  useEffect(() => {
    if (!showSettings) return;
    
    const handleEvents = (e) => {
      // Fecha se clicar fora
      if (e.type === 'mousedown' && settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
      // Fecha se pressionar ESC
      if (e.type === 'keydown' && e.key === 'Escape') {
        setShowSettings(false);
      }
    };
    
    document.addEventListener('mousedown', handleEvents);
    document.addEventListener('keydown', handleEvents);
    
    return () => {
      document.removeEventListener('mousedown', handleEvents);
      document.removeEventListener('keydown', handleEvents);
    };
  }, [showSettings]);

  const loadData = () => {
    try {
      const localTx = localStorage.getItem('finance_transactions');
      if (localTx) setTransactions(JSON.parse(localTx));

      const localCat = localStorage.getItem('finance_categories');
      if (localCat) setCategories(JSON.parse(localCat));
      
      const localAcc = localStorage.getItem('finance_accounts');
      if (localAcc) {
        const savedAccounts = JSON.parse(localAcc);
        // Aceita array vazio (reset) - só usa default se não existir no localStorage
        setAccounts(savedAccounts);
      } else {
        // Só usa DEFAULT se nunca foi guardado
        setAccounts(DEFAULT_ACCOUNTS);
      }
      
      const localInv = localStorage.getItem('finance_investments');
      if (localInv) setInvestments(JSON.parse(localInv));
      
      const localRec = localStorage.getItem('finance_recurring');
      if (localRec) setRecurring(JSON.parse(localRec));
      
      const localLoans = localStorage.getItem('finance_loans');
      if (localLoans) setLoans(JSON.parse(localLoans));
      
      const localGoals = localStorage.getItem('finance_goals');
      if (localGoals) setGoals(JSON.parse(localGoals));
      
      const localBudgets = localStorage.getItem('finance_budgets');
      if (localBudgets) setBudgets(JSON.parse(localBudgets));
      
      const savedDarkMode = localStorage.getItem('finance_darkMode');
      if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
      
      const savedTheme = localStorage.getItem('finance_theme');
      if (savedTheme) setTheme(savedTheme);
      
      // Simulate loading for better UX (shows skeleton)
      setTimeout(() => setIsInitialLoading(false), 800);
    } catch (error) {
      console.log('Error loading data:', error);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveTransactions = (data) => {
    setTransactions(data);
    localStorage.setItem('finance_transactions', JSON.stringify(data));
  };

  const saveCategories = (data) => {
    setCategories(data);
    localStorage.setItem('finance_categories', JSON.stringify(data));
  };

  const saveAccounts = (data) => {
    setAccounts(data);
    localStorage.setItem('finance_accounts', JSON.stringify(data));
  };

  const saveInvestments = (data) => {
    setInvestments(data);
    localStorage.setItem('finance_investments', JSON.stringify(data));
  };

  const saveRecurring = (data) => {
    setRecurring(data);
    localStorage.setItem('finance_recurring', JSON.stringify(data));
  };

  const saveLoans = (data) => {
    setLoans(data);
    localStorage.setItem('finance_loans', JSON.stringify(data));
  };

  const saveGoals = (data) => {
    setGoals(data);
    localStorage.setItem('finance_goals', JSON.stringify(data));
  };

  const saveBudgets = (data) => {
    setBudgets(data);
    localStorage.setItem('finance_budgets', JSON.stringify(data));
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('finance_darkMode', JSON.stringify(newMode));
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('finance_theme', newTheme);
    toast.success(`🎨 Tema ${newTheme} ativado!`);
  };

  const exportData = () => {
    const data = {
      transactions,
      categories,
      accounts,
      investments,
      recurring,
      loans,
      exportDate: new Date().toISOString(),
      version: '2.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financas-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Configurações
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPos = 20;
    
    // Cabeçalho
    doc.setFontSize(22);
    doc.setTextColor(34, 197, 94); // Verde
    doc.text('Finanças Pessoais', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Relatório gerado em ${new Date().toLocaleDateString('pt-PT')}`, pageWidth / 2, yPos, { align: 'center' });
    
    // Linha separadora
    yPos += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPos, pageWidth - 20, yPos);
    
    // Resumo Financeiro
    yPos += 15;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Resumo Financeiro', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    
    const totalWealth = accounts.reduce((sum, acc) => sum + Number(acc.balance || 0), 0);
    const monthlyIncome = transactions
      .filter(t => t.type === 'income' && new Date(t.date).getMonth() === new Date().getMonth())
      .reduce((sum, t) => sum + t.amount, 0);
    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth())
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Cards em colunas
    const colWidth = (pageWidth - 40) / 4;
    
    // Patrimônio
    doc.setFillColor(59, 130, 246);
    doc.rect(20, yPos, colWidth - 5, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('Patrimônio Total', 22, yPos + 5);
    doc.setFontSize(12);
    doc.text(`€${totalWealth.toFixed(2)}`, 22, yPos + 15);
    
    // Receitas
    doc.setFillColor(34, 197, 94);
    doc.rect(20 + colWidth, yPos, colWidth - 5, 20, 'F');
    doc.setFontSize(8);
    doc.text('Receitas (Mês)', 22 + colWidth, yPos + 5);
    doc.setFontSize(12);
    doc.text(`€${monthlyIncome.toFixed(2)}`, 22 + colWidth, yPos + 15);
    
    // Despesas
    doc.setFillColor(239, 68, 68);
    doc.rect(20 + colWidth * 2, yPos, colWidth - 5, 20, 'F');
    doc.setFontSize(8);
    doc.text('Despesas (Mês)', 22 + colWidth * 2, yPos + 5);
    doc.setFontSize(12);
    doc.text(`€${monthlyExpenses.toFixed(2)}`, 22 + colWidth * 2, yPos + 15);
    
    // Poupança
    doc.setFillColor(168, 85, 247);
    doc.rect(20 + colWidth * 3, yPos, colWidth - 5, 20, 'F');
    doc.setFontSize(8);
    doc.text('Poupança (Mês)', 22 + colWidth * 3, yPos + 5);
    doc.setFontSize(12);
    doc.text(`€${(monthlyIncome - monthlyExpenses).toFixed(2)}`, 22 + colWidth * 3, yPos + 15);
    
    // Contas
    yPos += 35;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Contas', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(9);
    accounts.forEach(acc => {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = 20;
      }
      doc.setTextColor(80, 80, 80);
      doc.text(`${acc.name}:`, 20, yPos);
      
      // Cor baseada no saldo
      if (acc.balance >= 0) {
        doc.setTextColor(34, 197, 94); // Verde
      } else {
        doc.setTextColor(239, 68, 68); // Vermelho
      }
      
      doc.text(`€${Number(acc.balance || 0).toFixed(2)}`, pageWidth - 40, yPos, { align: 'right' });
      yPos += 6;
    });
    
    // Transações Recentes
    yPos += 10;
    if (yPos > pageHeight - 50) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Transações Recentes (últimas 10)', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(8);
    
    const recentTx = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
    
    recentTx.forEach(tx => {
      if (yPos > pageHeight - 20) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setTextColor(100, 100, 100);
      doc.text(new Date(tx.date).toLocaleDateString('pt-PT'), 20, yPos);
      doc.setTextColor(0, 0, 0);
      doc.text(tx.description.substring(0, 30), 45, yPos);
      
      // Cor baseada no tipo de transação
      if (tx.type === 'income') {
        doc.setTextColor(34, 197, 94); // Verde
      } else {
        doc.setTextColor(239, 68, 68); // Vermelho
      }
      
      doc.text(
        `${tx.type === 'income' ? '+' : '-'}€${tx.amount.toFixed(2)}`, 
        pageWidth - 30, 
        yPos, 
        { align: 'right' }
      );
      yPos += 6;
    });
    
    // Footer em todas as páginas
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Página ${i} de ${pageCount} • Finanças Pessoais v2.0`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }
    
    // Salvar PDF
    doc.save(`relatorio-financeiro-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.transactions) saveTransactions(data.transactions);
        if (data.categories) saveCategories(data.categories);
        if (data.accounts) saveAccounts(data.accounts);
        if (data.investments) saveInvestments(data.investments);
        if (data.recurring) saveRecurring(data.recurring);
        if (data.loans) saveLoans(data.loans);
        
        setShowSettings(false);
      } catch (err) {
        console.error('Import error:', err);
      }
    };
    reader.readAsText(file);
  };

  const openModal = (type) => {
    setModalType(type);
    const today = new Date().toISOString().split('T')[0];
    
    if (type === 'transaction') {
      setFormData({ 
        type: 'expense', 
        amount: '', 
        description: '', 
        date: today,
        categoryId: categories.find(c => c.type === 'expense')?.id || '', 
        accountId: accounts[0]?.id || '' 
      });
    } else if (type === 'account') {
      setFormData({ name: '', balance: '', type: 'bank' });
    } else if (type === 'investment') {
      setFormData({ name: '', ticker: '', quantity: '', purchasePrice: '', currentPrice: '' });
    } else if (type === 'category') {
      setFormData({ name: '', type: 'expense', color: 'bg-blue-100 text-blue-800' });
    } else if (type === 'recurring') {
      setFormData({ 
        name: '', 
        amount: '', 
        dayOfMonth: '1', 
        type: 'expense', 
        categoryId: categories.find(c => c.type === 'expense')?.id || '', 
        accountId: accounts[0]?.id || '' 
      });
    } else if (type === 'loan') {
      setFormData({ 
        name: '', 
        totalAmount: '', 
        monthlyPayment: '', 
        amountPaid: '0', 
        startDate: today 
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
  };

  const handleSubmit = () => {
    if (modalType === 'transaction') {
      if (!formData.amount || !formData.description || !formData.accountId || !formData.date) {
        toast.error('Por favor, preenche todos os campos obrigatórios');
        return;
      }
      
      const amount = parseFloat(formData.amount);
      const newTx = { 
        id: Date.now(), 
        ...formData, 
        amount: amount, 
        date: new Date(formData.date).toISOString()
      };
      
      const updatedAccounts = accounts.map(acc => {
        if (acc.id === formData.accountId) {
          const currentBalance = Number(acc.balance) || 0;
          const newBalance = formData.type === 'income' 
            ? currentBalance + amount
            : currentBalance - amount;
          
          return { ...acc, balance: newBalance };
        }
        return acc;
      });
      
      saveAccounts(updatedAccounts);
      saveTransactions([newTx, ...transactions]);
      toast.success('Transação adicionada com sucesso!');
      
    } else if (modalType === 'account') {
      if (!formData.name || formData.balance === '') {
        toast.error('Por favor, preenche todos os campos obrigatórios');
        return;
      }
      const newAcc = {
        id: Date.now().toString(),
        name: formData.name,
        balance: parseFloat(formData.balance),
        type: formData.type
      };
      saveAccounts([...accounts, newAcc]);
      toast.success('Conta adicionada com sucesso!');
      
    } else if (modalType === 'investment') {
      if (!formData.name || !formData.ticker || !formData.quantity || !formData.purchasePrice || !formData.currentPrice) {
        toast.error('Por favor, preenche todos os campos obrigatórios');
        return;
      }
      const newInv = {
        id: Date.now().toString(),
        name: formData.name,
        ticker: formData.ticker,
        quantity: parseFloat(formData.quantity),
        purchasePrice: parseFloat(formData.purchasePrice),
        currentPrice: parseFloat(formData.currentPrice)
      };
      saveInvestments([...investments, newInv]);
      toast.success('Investimento adicionado com sucesso!');
      
    } else if (modalType === 'category') {
      if (!formData.name) {
        toast.error('Por favor, preenche o nome da categoria');
        return;
      }
      saveCategories([...categories, { 
        id: Date.now().toString(), 
        name: formData.name, 
        type: formData.type, 
        color: formData.color 
      }]);
      toast.success('Categoria adicionada com sucesso!');
      
    } else if (modalType === 'recurring') {
      if (!formData.name || !formData.amount || !formData.dayOfMonth) {
        toast.error('Por favor, preenche todos os campos obrigatórios');
        return;
      }
      saveRecurring([...recurring, { 
        id: Date.now().toString(), 
        name: formData.name, 
        amount: parseFloat(formData.amount),
        dayOfMonth: parseInt(formData.dayOfMonth),
        type: formData.type,
        categoryId: formData.categoryId,
        accountId: formData.accountId
      }]);
      toast.success('Pagamento recorrente adicionado!');
      
    } else if (modalType === 'loan') {
      if (!formData.name || !formData.totalAmount || !formData.monthlyPayment) {
        toast.error('Por favor, preenche todos os campos obrigatórios');
        return;
      }
      const totalAmount = parseFloat(formData.totalAmount);
      const monthlyPayment = parseFloat(formData.monthlyPayment);
      const amountPaid = parseFloat(formData.amountPaid) || 0;
      const remaining = totalAmount - amountPaid;
      const monthsRemaining = Math.ceil(remaining / monthlyPayment);
      
      saveLoans([...loans, {
        id: Date.now().toString(),
        name: formData.name,
        totalAmount: totalAmount,
        monthlyPayment: monthlyPayment,
        amountPaid: amountPaid,
        startDate: formData.startDate,
        monthsRemaining: monthsRemaining
      }]);
      toast.success('Empréstimo adicionado com sucesso!');
    } else if (modalType === 'editPayment') {
      if (!formData.newPayment) {
        toast.error('Por favor, insere o valor do pagamento');
        return;
      }
      const newPayment = parseFloat(formData.newPayment);
      if (!isNaN(newPayment) && newPayment > 0) {
        const updatedLoans = loans.map(l => {
          if (l.id === selectedLoan.id) {
            const remaining = l.totalAmount - l.amountPaid;
            const newMonths = Math.ceil(remaining / newPayment);
            return { ...l, monthlyPayment: newPayment, monthsRemaining: newMonths };
          }
          return l;
        });
        saveLoans(updatedLoans);
      }
    } else if (modalType === 'markPayment') {
      if (!formData.paymentAmount) {
        return;
      }
      const payment = parseFloat(formData.paymentAmount);
      if (!isNaN(payment) && payment > 0) {
        const updatedLoans = loans.map(l => {
          if (l.id === selectedLoan.id) {
            const newPaid = l.amountPaid + payment;
            const newRemaining = l.totalAmount - newPaid;
            const newMonths = Math.ceil(newRemaining / l.monthlyPayment);
            return { ...l, amountPaid: newPaid, monthsRemaining: newMonths };
          }
          return l;
        });
        saveLoans(updatedLoans);
      }
    }
    closeModal();
  };

  const generateRecurringTransactions = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const newTransactions = [];
    recurring.forEach(rec => {
      if (currentDay >= rec.dayOfMonth) {
        const alreadyExists = transactions.some(tx => 
          tx.recurringId === rec.id && 
          new Date(tx.date).getMonth() === currentMonth &&
          new Date(tx.date).getFullYear() === currentYear
        );
        
        if (!alreadyExists) {
          const transactionDate = new Date(currentYear, currentMonth, rec.dayOfMonth);
          newTransactions.push({
            id: Date.now() + Math.random() * 1000,
            description: `${rec.name} (Recorrente)`,
            amount: rec.amount,
            type: rec.type,
            categoryId: rec.categoryId,
            accountId: rec.accountId,
            date: transactionDate.toISOString(),
            recurringId: rec.id,
            isRecurring: true
          });
        }
      }
    });
    
    if (newTransactions.length > 0) {
      const updatedAccounts = [...accounts];
      newTransactions.forEach(tx => {
        const accIndex = updatedAccounts.findIndex(a => a.id === tx.accountId);
        if (accIndex !== -1) {
          const currentBalance = Number(updatedAccounts[accIndex].balance) || 0;
          updatedAccounts[accIndex] = {
            ...updatedAccounts[accIndex],
            balance: tx.type === 'income' 
              ? currentBalance + tx.amount
              : currentBalance - tx.amount
          };
        }
      });
      
      saveAccounts(updatedAccounts);
      saveTransactions([...newTransactions, ...transactions]);
      localStorage.setItem('lastRecurringGeneration', today.toISOString());
    }
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance || 0), 0);
  const totalInvestments = investments.reduce((sum, inv) => sum + (inv.quantity * inv.currentPrice), 0);
  const totalWealth = totalBalance + totalInvestments;

  const monthlyIncome = transactions
    .filter(t => t.type === 'income' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${darkMode ? 'dark-mode' : ''} ${
      darkMode 
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-[#f3f4f6] bg-gradient-to-b from-gray-100 via-blue-50/50 to-transparent'
    }`}>
      <div className={`backdrop-blur-sm border-b shadow-lg relative z-50 ${
        darkMode 
          ? 'bg-gray-800/95 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Finanças Pessoais</h1>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Gestão completa das tuas finanças</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Firebase Sync Panel */}
            <FirebaseSyncPanel
              user={user}
              syncing={syncing}
              error={firebaseError}
              onSignIn={signIn}
              onSignOut={signOut}
              onUpload={async () => {
                const localData = {
                  transactions,
                  accounts,
                  categories,
                  loans,
                  investments,
                  recurring,
                  goals,
                  budgets
                };
                const success = await uploadLocalData(localData);
                if (success) {
                  toast.success('✅ Dados enviados para a cloud com sucesso!');
                } else {
                  toast.error('❌ Erro ao enviar dados para a cloud');
                }
              }}
              onDownload={async () => {
                const data = await downloadFirebaseData();
                if (data) {
                  if (data.transactions) setTransactions(data.transactions);
                  if (data.accounts) setAccounts(data.accounts);
                  if (data.categories) setCategories(data.categories);
                  if (data.loans) setLoans(data.loans);
                  if (data.investments) setInvestments(data.investments);
                  if (data.recurring) setRecurring(data.recurring);
                  toast.success('✅ Dados sincronizados da cloud!');
                } else {
                  toast.error('❌ Erro ao sincronizar dados da cloud');
                }
              }}
              darkMode={darkMode}
            />
            
            <button 
              onClick={toggleDarkMode}
              className={`p-3 rounded-full transition-all ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              title={darkMode ? "Modo Claro" : "Modo Escuro"}
            >
              {darkMode ? (
                <svg className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v3M12 20v3M21 12h-3M6 12H3M18.36 5.64l-2.12 2.12M7.76 16.24l-2.12 2.12M18.36 18.36l-2.12-2.12M7.76 7.76L5.64 5.64"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>

            {/* Theme Selector */}
            <div className="flex gap-2">
              {['green', 'blue', 'purple', 'orange'].map((themeName) => (
                <button
                  key={themeName}
                  onClick={() => changeTheme(themeName)}
                  className={`w-10 h-10 rounded-full transition-all ${
                    theme === themeName ? 'ring-4 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900' : 'hover:scale-110'
                  } ${
                    themeName === 'green' ? 'bg-gradient-to-br from-green-600 to-emerald-600 ring-green-600' :
                    themeName === 'blue' ? 'bg-gradient-to-br from-blue-600 to-cyan-600 ring-blue-600' :
                    themeName === 'purple' ? 'bg-gradient-to-br from-purple-600 to-pink-600 ring-purple-600' :
                    'bg-gradient-to-br from-orange-600 to-red-600 ring-orange-600'
                  }`}
                  title={`Tema ${themeName}`}
                />
              ))}
            </div>

            <div className="relative" ref={settingsRef}>
              <button 
                onClick={() => setShowSettings(!showSettings)} 
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"
              title="Configurações"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            {showSettings && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[9999]">
                <button
                  onClick={() => {
                    setShowCategories(true);
                    setShowSettings(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 rounded-t-lg flex items-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Gerir Categorias
                </button>
                
                <div className="border-t border-gray-300"></div>
                
                <button
                  onClick={() => {
                    exportData();
                    setShowSettings(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 flex items-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Exportar Dados (JSON)
                </button>
                
                <button
                  onClick={() => {
                    exportPDF();
                    setShowSettings(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 flex items-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Exportar PDF 📄
                </button>
                
                <label className="w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 flex items-center gap-3 cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L9 8m4-4v12" />
                  </svg>
                  Importar Dados
                  <input 
                    type="file" 
                    accept=".json" 
                    onChange={importData} 
                    className="hidden"
                    onClick={(e) => {
                      e.target.value = null;
                      setShowSettings(false);
                    }}
                  />
                </label>
                
                <div className="border-t border-gray-300 dark:border-gray-600"></div>
                
                <button
                  onClick={async () => {
                    if (!window.confirm('⚠️ Tens a certeza? Isto vai apagar TODOS os dados (local + cloud) e fazer logout. Esta ação não pode ser desfeita!')) {
                      return;
                    }
                    
                    setShowSettings(false);
                    
                    // 1. Limpa Firebase (se logado)
                    if (user) {
                      try {
                        const emptyData = {
                          transactions: [],
                          accounts: [],
                          categories: DEFAULT_CATEGORIES,
                          loans: [],
                          investments: [],
                          recurring: [],
                          goals: [],
                          budgets: {}
                        };
                        await uploadLocalData(emptyData);
                        console.log('✅ Firebase limpo!');
                      } catch (err) {
                        console.error('❌ Erro ao limpar Firebase:', err);
                      }
                    }
                    
                    // 2. Limpa localStorage
                    localStorage.clear();
                    console.log('✅ localStorage limpo!');
                    
                    // 3. Faz logout
                    if (user) {
                      await signOut();
                    }
                    
                    // 4. Reload página
                    toast.success('🔄 Dados resetados! A recarregar...');
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }}
                  className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-300 rounded-b-lg flex items-center gap-3 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Resetar para €0
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      <div className={`backdrop-blur-sm border-b relative z-10 ${
        darkMode 
          ? 'bg-gray-800/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-4 overflow-x-auto">
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'transactions', label: 'Transações' },
            { id: 'recurring', label: 'Recorrentes' },
            { id: 'loans', label: 'Empréstimos' },
            { id: 'accounts', label: 'Contas' },
            { id: 'investments', label: 'Investimentos' },
            { id: 'goals', label: 'Metas' },
            { id: 'budgets', label: 'Orçamentos' }
          ].map(tab => (
            <motion.button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`px-6 py-3 font-medium rounded-full transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg' 
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-8">
              <PieChartIcon className="w-6 h-6" />
              Visão Geral
            </h2>
            
            {isInitialLoading ? (
              <div className="grid grid-cols-4 gap-8 mb-10">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-8 mb-10">
              <motion.div 
                className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                <p className="text-blue-100 text-sm mb-2">Patrimônio Total</p>
                <p className="text-3xl font-bold text-white">€{totalWealth.toFixed(2)}</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-8 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <p className="text-green-100 text-sm mb-2">Receitas (Mês)</p>
                <p className="text-4xl font-bold text-white">€{monthlyIncome.toFixed(2)}</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-red-500 to-red-700 rounded-3xl p-8 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  </div>
                </div>
                <p className="text-red-100 text-sm mb-2">Despesas (Mês)</p>
                <p className="text-3xl font-bold text-white">€{monthlyExpenses.toFixed(2)}</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-8 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-purple-100 text-sm mb-2">Poupança (Mês)</p>
                <p className="text-3xl font-bold text-white">€{(monthlyIncome - monthlyExpenses).toFixed(2)}</p>
              </motion.div>
            </div>
            )}
            
{/* 📈 SEÇÃO DE INSIGHTS E TENDÊNCIAS */}
<div className="mb-10">
  {/* Header */}
  <div className={`bg-gradient-to-r ${currentTheme.from} ${currentTheme.to} text-white rounded-2xl p-6 mb-6`}>
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-2">📈 Insights & Tendências</h2>
        <p className="text-sm opacity-90">Análise inteligente dos teus padrões financeiros</p>
      </div>
      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className="text-sm font-medium">Análise Automática</span>
      </div>
    </div>
  </div>

  {/* Cards de Insights */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    {/* Card 1: Top 5 Categorias */}
    <motion.div 
      className={`rounded-3xl border backdrop-blur-xl p-6 shadow-xl ${
        darkMode 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Top 5 Categorias
      </h3>
      <div className="space-y-3">
        {(() => {
          const now = new Date();
          const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
          
          const monthExpenses = transactions.filter(tx => 
            tx.type === 'expense' && new Date(tx.date) >= firstDay
          );
          
          if (monthExpenses.length === 0) {
            return (
              <p className={`text-sm text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Sem despesas este mês
              </p>
            );
          }
          
          const grouped = monthExpenses.reduce((acc, tx) => {
            const cat = categories.find(c => c.id === tx.categoryId);
            const name = cat ? cat.name : 'Outros';
            if (!acc[name]) acc[name] = 0;
            acc[name] += tx.amount;
            return acc;
          }, {});
          
          const total = Object.values(grouped).reduce((sum, val) => sum + val, 0);
          
          return Object.entries(grouped)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, amount], idx) => {
              const percentage = (amount / total * 100).toFixed(1);
              return (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {idx + 1}. {name}
                    </span>
                    <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      €{amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                    />
                  </div>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {percentage}% do total
                  </span>
                </div>
              );
            });
        })()}
      </div>
    </motion.div>

    {/* Card 2: Comparação com Mês Anterior */}
    <motion.div 
      className={`rounded-3xl border backdrop-blur-xl p-6 shadow-xl ${
        darkMode 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
        vs Mês Anterior
      </h3>
      <div className="space-y-4">
        {(() => {
          const now = new Date();
          const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
          
          const currentExpenses = transactions
            .filter(tx => tx.type === 'expense' && new Date(tx.date) >= currentMonth)
            .reduce((sum, tx) => sum + tx.amount, 0);
          
          const lastExpenses = transactions
            .filter(tx => 
              tx.type === 'expense' && 
              new Date(tx.date) >= lastMonth && 
              new Date(tx.date) <= lastMonthEnd
            )
            .reduce((sum, tx) => sum + tx.amount, 0);
          
          const currentIncome = transactions
            .filter(tx => tx.type === 'income' && new Date(tx.date) >= currentMonth)
            .reduce((sum, tx) => sum + tx.amount, 0);
          
          const lastIncome = transactions
            .filter(tx => 
              tx.type === 'income' && 
              new Date(tx.date) >= lastMonth && 
              new Date(tx.date) <= lastMonthEnd
            )
            .reduce((sum, tx) => sum + tx.amount, 0);
          
          const expenseDiff = currentExpenses - lastExpenses;
          const expensePercent = lastExpenses > 0 ? ((expenseDiff / lastExpenses) * 100) : 0;
          const incomeDiff = currentIncome - lastIncome;
          const incomePercent = lastIncome > 0 ? ((incomeDiff / lastIncome) * 100) : 0;
          
          return (
            <>
              {/* Despesas */}
              <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Despesas
                  </span>
                  <div className="flex items-center gap-1">
                    {expenseDiff > 0 ? (
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : expenseDiff < 0 ? (
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                      </svg>
                    )}
                    <span className={`text-xs font-bold ${
                      expenseDiff > 0 ? 'text-red-500' : 
                      expenseDiff < 0 ? 'text-green-500' : 
                      'text-gray-400'
                    }`}>
                      {expenseDiff >= 0 ? '+' : ''}{expensePercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  €{currentExpenses.toFixed(2)}
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Mês anterior: €{lastExpenses.toFixed(2)}
                </p>
              </div>

              {/* Receitas */}
              <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Receitas
                  </span>
                  <div className="flex items-center gap-1">
                    {incomeDiff > 0 ? (
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : incomeDiff < 0 ? (
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                      </svg>
                    )}
                    <span className={`text-xs font-bold ${
                      incomeDiff > 0 ? 'text-green-500' : 
                      incomeDiff < 0 ? 'text-red-500' : 
                      'text-gray-400'
                    }`}>
                      {incomeDiff >= 0 ? '+' : ''}{incomePercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  €{currentIncome.toFixed(2)}
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Mês anterior: €{lastIncome.toFixed(2)}
                </p>
              </div>
            </>
          );
        })()}
      </div>
    </motion.div>

    {/* Card 3: Médias e Maior Gasto */}
    <motion.div 
      className={`rounded-3xl border backdrop-blur-xl p-6 shadow-xl ${
        darkMode 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        Estatísticas
      </h3>
      <div className="space-y-4">
        {(() => {
          const now = new Date();
          const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
          const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
          const currentDay = now.getDate();
          
          const monthExpenses = transactions.filter(tx => 
            tx.type === 'expense' && new Date(tx.date) >= firstDay
          );
          
          const totalExpenses = monthExpenses.reduce((sum, tx) => sum + tx.amount, 0);
          const avgDaily = totalExpenses / currentDay;
          const avgWeekly = avgDaily * 7;
          
          const biggestExpense = monthExpenses.length > 0
            ? monthExpenses.reduce((max, tx) => tx.amount > max.amount ? tx : max)
            : null;
          
          return (
            <>
              {/* Média Diária */}
              <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Média Diária
                </span>
                <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  €{avgDaily.toFixed(2)}
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Baseado em {currentDay} dias
                </p>
              </div>

              {/* Média Semanal */}
              <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Média Semanal
                </span>
                <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  €{avgWeekly.toFixed(2)}
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  ~€{(avgWeekly * 4).toFixed(2)}/mês
                </p>
              </div>

              {/* Maior Gasto */}
              {biggestExpense && (
                <div className={`p-4 rounded-2xl ${darkMode ? 'bg-orange-900/20 border border-orange-500/30' : 'bg-orange-50 border border-orange-200'}`}>
                  <span className={`text-sm font-medium ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                    💰 Maior Gasto
                  </span>
                  <p className={`text-xl font-bold mt-1 ${darkMode ? 'text-orange-200' : 'text-orange-700'}`}>
                    €{biggestExpense.amount.toFixed(2)}
                  </p>
                  <p className={`text-xs mt-1 truncate ${darkMode ? 'text-orange-400/70' : 'text-orange-600/70'}`}>
                    {biggestExpense.description}
                  </p>
                </div>
              )}
            </>
          );
        })()}
      </div>
    </motion.div>
  </div>
</div>
            {!isInitialLoading && (
            <div>
{/* 📊 SEÇÃO DE GRÁFICOS AVANÇADOS */}
<div className="mb-10">
  {/* Header com filtros */}
  <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white rounded-2xl p-6 mb-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-2">📊 Análise Visual</h2>
        <p className="text-sm opacity-90">Evolução financeira ao longo do tempo</p>
      </div>
      
      {/* Filtros de período */}
      <div className="flex gap-2 bg-white/10 p-1 rounded-xl">
        {[
          { value: '7d', label: '7 dias' },
          { value: '30d', label: '30 dias' },
          { value: '90d', label: '90 dias' },
          { value: '1y', label: '1 ano' },
          { value: 'all', label: 'Tudo' }
        ].map(period => (
          <motion.button
            key={period.value}
            onClick={() => setChartPeriod(period.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              chartPeriod === period.value
                ? 'bg-white text-blue-600 shadow-lg'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {period.label}
          </motion.button>
        ))}
      </div>
    </div>
  </div>
  
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
    {/* Gráfico 1: Evolução do Patrimônio (Linha) */}
    <motion.div 
      className={`rounded-3xl border backdrop-blur-xl p-8 shadow-xl ${
        darkMode 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
    >
      <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        Evolução do Patrimônio
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={(() => {
          const getFilteredTransactions = () => {
            const now = new Date();
            const cutoffDate = new Date();
            
            switch(chartPeriod) {
              case '7d': cutoffDate.setDate(now.getDate() - 7); break;
              case '30d': cutoffDate.setDate(now.getDate() - 30); break;
              case '90d': cutoffDate.setDate(now.getDate() - 90); break;
              case '1y': cutoffDate.setFullYear(now.getFullYear() - 1); break;
              default: cutoffDate.setFullYear(2000);
            }
            
            return transactions.filter(tx => new Date(tx.date) >= cutoffDate);
          };
          
          const filtered = getFilteredTransactions();
          const data = [];
          const totalWealth = accounts.reduce((sum, acc) => sum + Number(acc.balance || 0), 0) +
                            investments.reduce((sum, inv) => sum + (inv.quantity * inv.currentPrice), 0);
          
          if (filtered.length === 0) {
            // Dados de exemplo se não houver transações
            const points = chartPeriod === '7d' ? 7 : chartPeriod === '30d' ? 10 : chartPeriod === '90d' ? 12 : 12;
            for (let i = points - 1; i >= 0; i--) {
              const date = new Date();
              date.setDate(date.getDate() - i * (chartPeriod === '7d' ? 1 : chartPeriod === '30d' ? 3 : 7));
              data.push({ 
                date: date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' }),
                valor: 0
              });
            }
          } else {
            // Agrupar por data
            const grouped = filtered.reduce((acc, tx) => {
              const date = new Date(tx.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
              if (!acc[date]) acc[date] = 0;
              acc[date] += tx.type === 'income' ? tx.amount : -tx.amount;
              return acc;
            }, {});
            
            Object.entries(grouped).forEach(([date, value]) => {
              data.push({ date, valor: Math.max(0, value) });
            });
          }
          
          return data;
        })()}>
          <defs>
            <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey="date" 
            stroke={darkMode ? '#9ca3af' : '#6b7280'} 
            style={{ fontSize: '11px' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: darkMode ? '#1f2937' : '#fff',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            formatter={(value) => ['€' + Number(value).toFixed(2), 'Valor']}
          />
          <Area 
            type="monotone" 
            dataKey="valor" 
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorWealth)"
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>

    {/* Gráfico 2: Receitas vs Despesas (Linha) */}
    <motion.div 
      className={`rounded-3xl border backdrop-blur-xl p-8 shadow-xl ${
        darkMode 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
    >
      <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Receitas vs Despesas
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={(() => {
          const getFilteredData = () => {
            const now = new Date();
            const cutoffDate = new Date();
            
            switch(chartPeriod) {
              case '7d': cutoffDate.setDate(now.getDate() - 7); break;
              case '30d': cutoffDate.setDate(now.getDate() - 30); break;
              case '90d': cutoffDate.setDate(now.getDate() - 90); break;
              case '1y': cutoffDate.setFullYear(now.getFullYear() - 1); break;
              default: cutoffDate.setFullYear(2000);
            }
            
            const filtered = transactions.filter(tx => new Date(tx.date) >= cutoffDate);
            const grouped = {};
            
            filtered.forEach(tx => {
              const date = new Date(tx.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
              if (!grouped[date]) {
                grouped[date] = { date, receitas: 0, despesas: 0 };
              }
              if (tx.type === 'income') {
                grouped[date].receitas += tx.amount;
              } else {
                grouped[date].despesas += tx.amount;
              }
            });
            
            return Object.values(grouped).length > 0 ? Object.values(grouped) : 
              [{ date: 'Sem dados', receitas: 0, despesas: 0 }];
          };
          
          return getFilteredData();
        })()}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey="date" 
            stroke={darkMode ? '#9ca3af' : '#6b7280'} 
            style={{ fontSize: '11px' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: darkMode ? '#1f2937' : '#fff',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            formatter={(value) => ['€' + Number(value).toFixed(2)]}
          />
          <Area 
            type="monotone" 
            dataKey="receitas" 
            stackId="1"
            stroke="#10b981" 
            fill="#10b981"
            fillOpacity={0.8}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
          <Area 
            type="monotone" 
            dataKey="despesas" 
            stackId="2"
            stroke="#ef4444" 
            fill="#ef4444"
            fillOpacity={0.8}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  </div>

  {/* Gráfico 3: Por Categoria (Barra) - Full width */}
  <motion.div 
    className={`rounded-3xl border backdrop-blur-xl p-8 shadow-xl ${
      darkMode 
        ? 'bg-gray-800/80 border-gray-700/50' 
        : 'bg-white/80 border-gray-200/50'
    }`}
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
  >
    <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
      Despesas por Categoria
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={(() => {
        const getFilteredData = () => {
          const now = new Date();
          const cutoffDate = new Date();
          
          switch(chartPeriod) {
            case '7d': cutoffDate.setDate(now.getDate() - 7); break;
            case '30d': cutoffDate.setDate(now.getDate() - 30); break;
            case '90d': cutoffDate.setDate(now.getDate() - 90); break;
            case '1y': cutoffDate.setFullYear(now.getFullYear() - 1); break;
            default: cutoffDate.setFullYear(2000);
          }
          
          const expenses = transactions.filter(tx => 
            tx.type === 'expense' && new Date(tx.date) >= cutoffDate
          );
          
          const grouped = expenses.reduce((acc, tx) => {
            const cat = categories.find(c => c.id === tx.categoryId);
            const name = cat ? cat.name : 'Outros';
            if (!acc[name]) acc[name] = 0;
            acc[name] += tx.amount;
            return acc;
          }, {});
          
          return Object.entries(grouped)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);
        };
        
        const data = getFilteredData();
        return data.length > 0 ? data : [{ name: 'Sem dados', value: 0 }];
      })()}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
        <XAxis 
          dataKey="name" 
          stroke={darkMode ? '#9ca3af' : '#6b7280'} 
          style={{ fontSize: '11px' }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: darkMode ? '#1f2937' : '#fff',
            border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
          formatter={(value) => ['€' + Number(value).toFixed(2), 'Gasto']}
        />
        <Bar 
          dataKey="value" 
          fill="#8b5cf6" 
          radius={[8, 8, 0, 0]}
          isAnimationActive={true}
          animationDuration={1000}
          animationEasing="ease-in-out"
        />
      </BarChart>
    </ResponsiveContainer>
  </motion.div>
</div>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contas ({accounts.length})</h3>
                {accounts.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Nenhuma conta</p>
                ) : (
                  accounts.map(acc => (
                    <div key={acc.id} className="flex justify-between p-3 bg-gray-50 rounded mb-2">
                      <span className="text-gray-700">{acc.name}</span>
                      <span className={`font-bold ${acc.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        €{Number(acc.balance || 0).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Transações Recentes</h3>
                {transactions.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Nenhuma transação</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {[...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map(tx => (
                      <div key={tx.id} className="flex justify-between p-2 bg-gray-50 rounded text-sm">
                        <span className="text-gray-700 truncate">{tx.description}</span>
                        <span className={`font-bold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.type === 'income' ? '+' : '-'}€{tx.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            </div>
            )}
          </motion.div>
        )}

        {activeTab === 'transactions' && (
          <motion.div
            key="transactions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Transações</h2>
              <button onClick={() => openModal('transaction')} className="bg-green-600 hover:bg-green-700 text-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />Nova
              </button>
            </div>
            
            {isInitialLoading ? (
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8">
                <TransactionListSkeleton count={5} />
              </div>
            ) : (
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8">
              {transactions.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">Ainda não tens transações</p>
              ) : (
                <div className="space-y-6">
                  {[...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).map(tx => {
                    const cat = categories.find(c => c.id === tx.categoryId);
                    const acc = accounts.find(a => a.id === tx.accountId);
                    return (
                      <div key={tx.id} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          tx.type === 'income' 
                            ? 'bg-green-100' 
                            : 'bg-red-100'
                        }`}>
                          <svg className={`w-6 h-6 ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {tx.type === 'income' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            )}
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{tx.description}</p>
                          <p className="text-sm text-gray-500">
                            {cat?.name} • {acc?.name} • {new Date(tx.date).toLocaleDateString('pt-PT')}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-2xl font-bold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                            {tx.type === 'income' ? '+' : '-'}€{tx.amount.toFixed(2)}
                          </span>
                          <button
                            onClick={() => {
                              const updatedAccounts = accounts.map(a => {
                                if (a.id === tx.accountId) {
                                  const currentBalance = Number(a.balance) || 0;
                                  return {
                                    ...a,
                                    balance: tx.type === 'income' 
                                      ? currentBalance - tx.amount 
                                      : currentBalance + tx.amount
                                  };
                                }
                                return a;
                              });
                              saveAccounts(updatedAccounts);
                              saveTransactions(transactions.filter(t => t.id !== tx.id));
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            )}
          </motion.div>
        )}

        {activeTab === 'recurring' && (
          <motion.div
            key="recurring"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Despesas Recorrentes
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={generateRecurringTransactions}
                  className="bg-blue-600 hover:bg-blue-700 text-gray-800 px-4 py-2 rounded-full flex items-center gap-2 font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Gerar Transações do Mês
                </button>
                <button onClick={() => openModal('recurring')} className="bg-orange-600 hover:bg-orange-700 text-gray-800 px-4 py-2 rounded-full flex items-center gap-2 font-semibold">
                  <PlusCircle className="w-5 h-5" />
                  Nova Recorrente
                </button>
              </div>
            </div>

            {recurring.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg mb-2">Nenhuma despesa recorrente</p>
                <p className="text-gray-500 text-sm">Adiciona despesas mensais como renda, Netflix, ginásio, etc.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Despesas</h3>
                  <div className="space-y-6">
                    {recurring.filter(r => r.type === 'expense').length === 0 ? (
                      <p className="text-gray-500 text-center py-4 text-sm">Nenhuma despesa</p>
                    ) : (
                      recurring.filter(r => r.type === 'expense').map(rec => {
                        const cat = categories.find(c => c.id === rec.categoryId);
                        const acc = accounts.find(a => a.id === rec.accountId);
                        return (
                          <div key={rec.id} className="p-4 bg-gray-50 rounded-2xl">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-800">{rec.name}</p>
                                <p className="text-sm text-gray-500">
                                  Dia {rec.dayOfMonth} • {cat?.name} • {acc?.name}
                                </p>
                                <p className="text-3xl font-bold text-red-400 mt-1">-€{rec.amount.toFixed(2)}</p>
                              </div>
                              <button
                                onClick={() => saveRecurring(recurring.filter(r => r.id !== rec.id))}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Receitas</h3>
                  <div className="space-y-6">
                    {recurring.filter(r => r.type === 'income').length === 0 ? (
                      <p className="text-gray-500 text-center py-4 text-sm">Nenhuma receita</p>
                    ) : (
                      recurring.filter(r => r.type === 'income').map(rec => {
                        const cat = categories.find(c => c.id === rec.categoryId);
                        const acc = accounts.find(a => a.id === rec.accountId);
                        return (
                          <div key={rec.id} className="p-4 bg-gray-50 rounded-2xl">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-800">{rec.name}</p>
                                <p className="text-sm text-gray-500">
                                  Dia {rec.dayOfMonth} • {cat?.name} • {acc?.name}
                                </p>
                                <p className="text-3xl font-bold text-green-400 mt-1">+€{rec.amount.toFixed(2)}</p>
                              </div>
                              <button
                                onClick={() => saveRecurring(recurring.filter(r => r.id !== rec.id))}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'loans' && (
          <motion.div
            key="loans"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-between mb-8">
              <h2 className={`text-2xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Empréstimos e Prestações
              </h2>
              <button onClick={() => openModal('loan')} className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold">
                <PlusCircle className="w-5 h-5" />
                Novo Empréstimo
              </button>
            </div>

            {loans.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg mb-2">Nenhum empréstimo registado</p>
                <p className="text-gray-500 text-sm">Adiciona empréstimos, prestações ou dívidas</p>
              </div>
            ) : (
              <div className="space-y-8">
                {loans.map(loan => {
                  const remaining = loan.totalAmount - loan.amountPaid;
                  const progress = (loan.amountPaid / loan.totalAmount) * 100;
                  const monthsRemaining = Math.ceil(remaining / loan.monthlyPayment);
                  
                  return (
                    <div key={loan.id} className="bg-white rounded-3xl border border-gray-200 p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800">{loan.name}</h3>
                          <p className="text-gray-500 text-sm">Início: {new Date(loan.startDate).toLocaleDateString('pt-PT')}</p>
                        </div>
                        <button
                          onClick={() => saveLoans(loans.filter(l => l.id !== loan.id))}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-3">
                          <span className="text-gray-500 font-medium">Progresso</span>
                          <span className="text-gray-800 font-bold">{progress.toFixed(0)}% pago</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-4 shadow-inner">
                          <div 
                            className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-green-500 h-4 rounded-full transition-all duration-500 shadow-sm"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                          <p className="text-blue-600 text-xs font-semibold mb-1">Total</p>
                          <p className="text-gray-800 font-bold text-xl">€{loan.totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                          <p className="text-green-600 text-xs font-semibold mb-1">Pago</p>
                          <p className="text-green-600 font-bold text-xl">€{loan.amountPaid.toFixed(2)}</p>
                        </div>
                        <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
                          <p className="text-red-600 text-xs font-semibold mb-1">Em Falta</p>
                          <p className="text-red-600 font-bold text-xl">€{remaining.toFixed(2)}</p>
                        </div>
                        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                          <p className="text-purple-600 text-xs font-semibold mb-1">Mensalidade</p>
                          <p className="text-gray-800 font-bold text-xl">€{loan.monthlyPayment.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">Meses restantes</p>
                          <p className="text-3xl font-bold text-gray-800 mt-1">{monthsRemaining} meses</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedLoan(loan);
                              setModalType('editPayment');
                              setFormData({ newPayment: loan.monthlyPayment });
                              setShowModal(true);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold"
                          >
                            ✏️ Editar Mensalidade
                          </button>
                          <button
                            onClick={() => {
                              setSelectedLoan(loan);
                              setModalType('markPayment');
                              setFormData({ paymentAmount: loan.monthlyPayment });
                              setShowModal(true);
                            }}
                            className="bg-green-600 hover:bg-green-700 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold"
                          >
                            ✓ Marcar Pagamento
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'accounts' && (
          <motion.div
            key="accounts"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Contas</h2>
              <button onClick={() => openModal('account')} className="bg-blue-600 hover:bg-blue-700 text-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />Nova Conta
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {accounts.map(acc => (
                <div key={acc.id} className="bg-white rounded-3xl border border-gray-200 p-6 relative">
                  <button onClick={() => saveAccounts(accounts.filter(a => a.id !== acc.id))} className="absolute top-4 right-4 text-red-400 hover:text-red-300">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      acc.type === 'bank' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {acc.type === 'bank' ? (
                        <Building className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Wallet className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <span className="text-gray-500 text-sm font-medium">{acc.type === 'bank' ? 'Conta Bancária' : 'Dinheiro'}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{acc.name}</h3>
                  <p className={`text-4xl font-bold ${acc.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    €{Number(acc.balance || 0).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'investments' && (
          <motion.div
            key="investments"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Investimentos</h2>
              <button onClick={() => openModal('investment')} className="bg-purple-600 hover:bg-purple-700 text-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />Novo
              </button>
            </div>

            {investments.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500">Ainda não tens investimentos</p>
              </div>
            ) : (
              <div className="space-y-6">
                {investments.map(inv => {
                  const invested = inv.quantity * inv.purchasePrice;
                  const current = inv.quantity * inv.currentPrice;
                  const gainLoss = current - invested;
                  return (
                    <div key={inv.id} className="bg-white rounded-3xl border border-gray-200 p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                          gainLoss >= 0 ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <svg className={`w-7 h-7 ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800">{inv.name}</h3>
                          <p className="text-gray-500">{inv.ticker}</p>
                        </div>
                        <button
                          onClick={() => saveInvestments(investments.filter(i => i.id !== inv.id))}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-5 gap-4">
                        <div>
                          <p className="text-gray-500 text-sm">Quantidade</p>
                          <p className="text-gray-800 font-bold text-lg">{inv.quantity}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Preço Compra</p>
                          <p className="text-gray-800 font-bold text-lg">€{inv.purchasePrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Preço Atual</p>
                          <p className="text-gray-800 font-bold text-lg">€{inv.currentPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Valor Total</p>
                          <p className="text-gray-800 font-bold text-lg">€{current.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Ganho/Perda</p>
                          <p className={`font-bold text-xl ${gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {gainLoss >= 0 ? '+' : ''}€{gainLoss.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'goals' && (
          <motion.div
            key="goals"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">🎯 Metas Financeiras</h2>
              <button 
                onClick={() => {
                  setGoalFormData({ name: '', targetAmount: '', deadline: '', currentAmount: 0 });
                  setShowGoalModal(true);
                }}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                Nova Meta
              </button>
            </div>

            {goals.length === 0 ? (
              <div className={`rounded-3xl border p-12 text-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="text-6xl mb-4">🎯</div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Nenhuma meta definida
                </h3>
                <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Cria a tua primeira meta financeira!
                </p>
                <button
                  onClick={() => {
                    setGoalFormData({ name: '', targetAmount: '', deadline: '', currentAmount: 0 });
                    setShowGoalModal(true);
                  }}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Criar Primeira Meta
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => {
                  const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
                  const remaining = Math.max(goal.targetAmount - goal.currentAmount, 0);
                  
                  return (
                    <div
                      key={goal.id}
                      className={`rounded-3xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {goal.name}
                        </h3>
                        <button
                          onClick={() => {
                            if (window.confirm('Apagar esta meta?')) {
                              saveGoals(goals.filter(g => g.id !== goal.id));
                              toast.success('Meta apagada!');
                            }
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            €{goal.currentAmount.toFixed(2)}
                          </span>
                          <span className={`text-sm font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                            {progress.toFixed(0)}%
                          </span>
                        </div>
                        
                        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="absolute h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Faltam €{remaining.toFixed(2)}
                          </span>
                          <button
                            onClick={() => {
                              const amount = prompt('Quanto queres adicionar?');
                              if (amount && !isNaN(amount)) {
                                const newGoals = goals.map(g =>
                                  g.id === goal.id
                                    ? { ...g, currentAmount: Math.min(g.currentAmount + parseFloat(amount), g.targetAmount) }
                                    : g
                                );
                                saveGoals(newGoals);
                                toast.success('💰 Progresso atualizado!');
                              }
                            }}
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                              darkMode 
                                ? 'bg-amber-900/30 text-amber-400 hover:bg-amber-900/50' 
                                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                            }`}
                          >
                            + Adicionar
                          </button>
                        </div>
                      </div>

                      <div className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex items-center justify-between text-sm">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                            Meta: €{goal.targetAmount.toFixed(2)}
                          </span>
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                            {new Date(goal.deadline).toLocaleDateString('pt-PT')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'budgets' && (
          <motion.div
            key="budgets"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">💰 Orçamentos</h2>
              <button 
                onClick={() => {
                  setBudgetFormData({ categoryId: '', amount: '' });
                  setShowBudgetModal(true);
                }}
                className={`bg-gradient-to-r ${currentTheme.from} ${currentTheme.to} ${currentTheme.hoverFrom} ${currentTheme.hoverTo} text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2`}
              >
                <PlusCircle className="w-5 h-5" />
                Definir Orçamento
              </button>
            </div>

            {Object.keys(budgets).length === 0 ? (
              <div className={`rounded-3xl border p-12 text-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="text-6xl mb-4">💰</div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Nenhum orçamento definido
                </h3>
                <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Define orçamentos por categoria para controlar gastos!
                </p>
                <button
                  onClick={() => {
                    setBudgetFormData({ categoryId: '', amount: '' });
                    setShowBudgetModal(true);
                  }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Definir Primeiro Orçamento
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {categories.filter(cat => cat.type === 'expense').map((category) => {
                  const budget = budgets[category.id];
                  if (!budget) return null;
                  
                  const now = new Date();
                  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
                  const spent = transactions
                    .filter(tx => 
                      tx.type === 'expense' && 
                      tx.categoryId === category.id &&
                      new Date(tx.date) >= firstDay
                    )
                    .reduce((sum, tx) => sum + tx.amount, 0);
                  
                  const percentage = (spent / budget) * 100;
                  const status = percentage >= 100 ? 'over' : percentage >= 80 ? 'warning' : 'ok';
                  
                  return (
                    <div
                      key={category.id}
                      className={`rounded-2xl border p-6 ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {category.name}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Orçamento: €{budget.toFixed(2)} / mês
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setBudgetFormData({ categoryId: category.id, amount: budget });
                              setShowBudgetModal(true);
                            }}
                            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Remover orçamento desta categoria?')) {
                                const newBudgets = {...budgets};
                                delete newBudgets[category.id];
                                saveBudgets(newBudgets);
                                toast.success('Orçamento removido!');
                              }
                            }}
                            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`text-2xl font-bold ${
                            status === 'over' ? 'text-red-500' :
                            status === 'warning' ? 'text-amber-500' :
                            'text-green-500'
                          }`}>
                            €{spent.toFixed(2)}
                          </span>
                          <span className={`text-sm font-bold ${
                            status === 'over' ? 'text-red-500' :
                            status === 'warning' ? 'text-amber-500' :
                            'text-green-500'
                          }`}>
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                        
                        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`absolute h-full rounded-full ${
                              status === 'over' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                              status === 'warning' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                              'bg-gradient-to-r from-green-500 to-emerald-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                            {status === 'over' ? `Ultrapassado €${(spent - budget).toFixed(2)}` :
                             status === 'warning' ? `Atenção! Faltam €${(budget - spent).toFixed(2)}` :
                             `Disponível: €${(budget - spent).toFixed(2)}`}
                          </span>
                          {status === 'over' && (
                            <span className="text-red-500 font-medium">⚠️ Ultrapassado</span>
                          )}
                          {status === 'warning' && (
                            <span className="text-amber-500 font-medium">⚠️ 80% usado</span>
                          )}
                          {status === 'ok' && (
                            <span className="text-green-500 font-medium">✓ No limite</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
      {showModal && (
        <motion.div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
              setFormData({});
            }
          }}
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 border border-gray-200 dark:border-gray-700"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setShowModal(false);
                setFormData({});
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <motion.h3 
              className="text-2xl font-bold text-gray-800 dark:text-white mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {modalType === 'transaction' && 'Nova Transação'}
              {modalType === 'account' && 'Nova Conta'}
              {modalType === 'investment' && 'Novo Investimento'}
              {modalType === 'category' && 'Nova Categoria'}
              {modalType === 'recurring' && 'Nova Despesa Recorrente'}
              {modalType === 'loan' && 'Novo Empréstimo'}
            </motion.h3>

            {modalType === 'transaction' && (
              <motion.div 
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.15
                    }
                  }
                }}
              >
                <motion.div 
                  className="flex gap-2"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <button type="button" onClick={() => setFormData({...formData, type: 'expense', categoryId: categories.find(c => c.type === 'expense')?.id})} className={`flex-1 px-4 py-2 rounded-full font-medium transition-all ${formData.type === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Despesa</button>
                  <button type="button" onClick={() => setFormData({...formData, type: 'income', categoryId: categories.find(c => c.type === 'income')?.id})} className={`flex-1 px-4 py-2 rounded-full font-medium transition-all ${formData.type === 'income' ? 'bg-green-600 text-white' : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Receita</button>
                </motion.div>
                <motion.input 
                  type="number" 
                  step="0.01" 
                  placeholder="Valor (€)" 
                  value={formData.amount || ''} 
                  onChange={(e) => setFormData({...formData, amount: e.target.value})} 
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                />
                <motion.input 
                  type="text" 
                  placeholder="Descrição" 
                  value={formData.description || ''} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                />
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <label className="text-gray-500 dark:text-gray-400 text-sm mb-2 block">Data da Transação</label>
                  <input type="date" value={formData.date || ''} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </motion.div>
                <motion.select 
                  value={formData.categoryId || ''} 
                  onChange={(e) => setFormData({...formData, categoryId: e.target.value})} 
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >{categories.filter(c => c.type === formData.type).map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}</motion.select>
                <motion.select 
                  value={formData.accountId || ''} 
                  onChange={(e) => setFormData({...formData, accountId: e.target.value})} 
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >{accounts.map(acc => (<option key={acc.id} value={acc.id}>{acc.name}</option>))}</motion.select>
              </motion.div>
            )}

            {modalType === 'account' && (
              <div className="space-y-6">
                <input type="text" placeholder="Nome da conta" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <input type="number" step="0.01" placeholder="Saldo inicial (€)" value={formData.balance || ''} onChange={(e) => setFormData({...formData, balance: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setFormData({...formData, type: 'bank'})} className={`flex-1 px-4 py-2 rounded-full font-medium ${formData.type === 'bank' ? 'bg-blue-600 text-gray-800' : 'bg-gray-50 text-gray-700'}`}>Banco</button>
                  <button type="button" onClick={() => setFormData({...formData, type: 'cash'})} className={`flex-1 px-4 py-2 rounded-full font-medium ${formData.type === 'cash' ? 'bg-green-600 text-gray-800' : 'bg-gray-50 text-gray-700'}`}>Dinheiro</button>
                </div>
              </div>
            )}

            {modalType === 'investment' && (
              <div className="space-y-6">
                <input type="text" placeholder="Nome do ativo" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <input type="text" placeholder="Ticker (ex: AAPL)" value={formData.ticker || ''} onChange={(e) => setFormData({...formData, ticker: e.target.value.toUpperCase()})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <input type="number" step="0.001" placeholder="Quantidade" value={formData.quantity || ''} onChange={(e) => setFormData({...formData, quantity: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <input type="number" step="0.01" placeholder="Preço de compra (€)" value={formData.purchasePrice || ''} onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <input type="number" step="0.01" placeholder="Preço atual (€)" value={formData.currentPrice || ''} onChange={(e) => setFormData({...formData, currentPrice: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
              </div>
            )}

            {modalType === 'category' && (
              <div className="space-y-6">
                <input type="text" placeholder="Nome da categoria" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setFormData({...formData, type: 'expense'})} className={`flex-1 px-4 py-2 rounded-full font-medium ${formData.type === 'expense' ? 'bg-red-600 text-gray-800' : 'bg-gray-50 text-gray-700'}`}>Despesa</button>
                  <button type="button" onClick={() => setFormData({...formData, type: 'income'})} className={`flex-1 px-4 py-2 rounded-full font-medium ${formData.type === 'income' ? 'bg-green-600 text-gray-800' : 'bg-gray-50 text-gray-700'}`}>Receita</button>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-2">Cor da categoria</p>
                  <div className="grid grid-cols-4 gap-2">
                    {['bg-red-100 text-red-800', 'bg-orange-100 text-orange-800', 'bg-yellow-100 text-yellow-800', 'bg-green-100 text-green-800', 'bg-blue-100 text-blue-800', 'bg-purple-100 text-purple-800', 'bg-pink-100 text-pink-800', 'bg-gray-100 text-gray-800'].map(color => (
                      <button key={color} type="button" onClick={() => setFormData({...formData, color})} className={`px-3 py-2 rounded font-medium ${color} ${formData.color === color ? 'ring-2 ring-white' : ''}`}>Cor</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {modalType === 'recurring' && (
              <div className="space-y-6">
                <div className="flex gap-2 mb-2">
                  <button type="button" onClick={() => setFormData({...formData, type: 'expense', categoryId: categories.find(c => c.type === 'expense')?.id})} className={`flex-1 px-4 py-2 rounded-full font-medium ${formData.type === 'expense' ? 'bg-red-600 text-gray-800' : 'bg-gray-50 text-gray-700'}`}>Despesa</button>
                  <button type="button" onClick={() => setFormData({...formData, type: 'income', categoryId: categories.find(c => c.type === 'income')?.id})} className={`flex-1 px-4 py-2 rounded-full font-medium ${formData.type === 'income' ? 'bg-green-600 text-gray-800' : 'bg-gray-50 text-gray-700'}`}>Receita</button>
                </div>
                <input type="text" placeholder="Nome (ex: Renda, Netflix)" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <input type="number" step="0.01" placeholder="Valor mensal (€)" value={formData.amount || ''} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <div>
                  <label className="text-gray-500 text-sm mb-2 block">Dia do mês (1-31)</label>
                  <input type="number" min="1" max="31" value={formData.dayOfMonth || ''} onChange={(e) => setFormData({...formData, dayOfMonth: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                </div>
                <select value={formData.categoryId || ''} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800">{categories.filter(c => c.type === formData.type).map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}</select>
                <select value={formData.accountId || ''} onChange={(e) => setFormData({...formData, accountId: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800">{accounts.map(acc => (<option key={acc.id} value={acc.id}>{acc.name}</option>))}</select>
              </div>
            )}

            {modalType === 'editPayment' && (
              <div className="space-y-6">
                <p className="text-gray-700 mb-2">Editar mensalidade de: <strong className="text-gray-800">{selectedLoan?.name}</strong></p>
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="Nova mensalidade (€)" 
                  value={formData.newPayment || ''} 
                  onChange={(e) => setFormData({...formData, newPayment: e.target.value})} 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400"
                  autoFocus
                />
              </div>
            )}

            {modalType === 'markPayment' && (
              <div className="space-y-6">
                <p className="text-gray-700 mb-2">Marcar pagamento de: <strong className="text-gray-800">{selectedLoan?.name}</strong></p>
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="Quanto pagaste? (€)" 
                  value={formData.paymentAmount || ''} 
                  onChange={(e) => setFormData({...formData, paymentAmount: e.target.value})} 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400"
                  autoFocus
                />
                <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-2xl p-4">
                  <p className="text-blue-200 text-sm">Mensalidade sugerida</p>
                  <p className="text-gray-800 font-bold text-xl">€{selectedLoan?.monthlyPayment.toFixed(2)}</p>
                </div>
              </div>
            )}

            {modalType === 'loan' && (
              <div className="space-y-6">
                <input type="text" placeholder="Nome (ex: Empréstimo Mãe, iPhone 15)" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <input type="number" step="0.01" placeholder="Valor total (€)" value={formData.totalAmount || ''} onChange={(e) => setFormData({...formData, totalAmount: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <input type="number" step="0.01" placeholder="Mensalidade (€)" value={formData.monthlyPayment || ''} onChange={(e) => setFormData({...formData, monthlyPayment: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <input type="number" step="0.01" placeholder="Já pago (€) - opcional" value={formData.amountPaid || ''} onChange={(e) => setFormData({...formData, amountPaid: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400" />
                <div>
                  <label className="text-gray-500 text-sm mb-2 block">Data de início</label>
                  <input type="date" value={formData.startDate || ''} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800" />
                </div>
                {formData.totalAmount && formData.monthlyPayment && (
                  <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-2xl p-4">
                    <p className="text-blue-200 text-sm mb-1">Previsão</p>
                    <p className="text-gray-800 font-bold text-xl">{Math.ceil((parseFloat(formData.totalAmount) - (parseFloat(formData.amountPaid) || 0)) / parseFloat(formData.monthlyPayment))} meses</p>
                  </div>
                )}
              </div>
            )}

            <motion.div 
              className="flex gap-4 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button 
                onClick={handleSubmit} 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full font-semibold transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Adicionar
              </motion.button>
              <motion.button 
                onClick={closeModal} 
                className="flex-1 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-3 rounded-full font-semibold transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancelar
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <AnimatePresence>
      {showGoalModal && (
        <motion.div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowGoalModal(false);
              setGoalFormData({});
            }
          }}
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              🎯 Nova Meta
            </h3>

            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Nome da meta" 
                value={goalFormData.name || ''} 
                onChange={(e) => setGoalFormData({...goalFormData, name: e.target.value})} 
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white"
              />
              
              <input 
                type="number" 
                placeholder="Valor da meta (€)" 
                value={goalFormData.targetAmount || ''} 
                onChange={(e) => setGoalFormData({...goalFormData, targetAmount: parseFloat(e.target.value)})} 
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white"
              />
              
              <div>
                <label className="text-gray-500 dark:text-gray-400 text-sm mb-2 block">Prazo</label>
                <input 
                  type="date" 
                  value={goalFormData.deadline || ''} 
                  onChange={(e) => setGoalFormData({...goalFormData, deadline: e.target.value})} 
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white"
                />
              </div>

              <input 
                type="number" 
                placeholder="Valor atual (€) - opcional" 
                value={goalFormData.currentAmount || ''} 
                onChange={(e) => setGoalFormData({...goalFormData, currentAmount: parseFloat(e.target.value) || 0})} 
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button 
                onClick={() => {
                  if (!goalFormData.name || !goalFormData.targetAmount || !goalFormData.deadline) {
                    toast.error('Preenche todos os campos!');
                    return;
                  }
                  
                  const newGoal = {
                    id: 'goal-' + Date.now(),
                    name: goalFormData.name,
                    targetAmount: parseFloat(goalFormData.targetAmount),
                    currentAmount: parseFloat(goalFormData.currentAmount) || 0,
                    deadline: goalFormData.deadline
                  };
                  
                  saveGoals([...goals, newGoal]);
                  setShowGoalModal(false);
                  setGoalFormData({});
                  toast.success('🎯 Meta criada!');
                }} 
                className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-3 rounded-full font-semibold"
              >
                Criar Meta
              </button>
              <button 
                onClick={() => {
                  setShowGoalModal(false);
                  setGoalFormData({});
                }} 
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-3 rounded-full font-semibold"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <AnimatePresence>
      {showBudgetModal && (
        <motion.div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowBudgetModal(false);
              setBudgetFormData({});
            }
          }}
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              💰 {budgetFormData.categoryId ? 'Editar' : 'Definir'} Orçamento
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-gray-500 dark:text-gray-400 text-sm mb-2 block">Categoria</label>
                <select
                  value={budgetFormData.categoryId || ''}
                  onChange={(e) => setBudgetFormData({...budgetFormData, categoryId: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white"
                  disabled={!!budgetFormData.categoryId}
                >
                  <option value="">Seleciona uma categoria</option>
                  {categories.filter(cat => cat.type === 'expense').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-gray-500 dark:text-gray-400 text-sm mb-2 block">Orçamento Mensal (€)</label>
                <input 
                  type="number" 
                  placeholder="Valor do orçamento" 
                  value={budgetFormData.amount || ''} 
                  onChange={(e) => setBudgetFormData({...budgetFormData, amount: parseFloat(e.target.value)})} 
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button 
                onClick={() => {
                  if (!budgetFormData.categoryId || !budgetFormData.amount) {
                    toast.error('Preenche todos os campos!');
                    return;
                  }
                  
                  const newBudgets = {
                    ...budgets,
                    [budgetFormData.categoryId]: parseFloat(budgetFormData.amount)
                  };
                  
                  saveBudgets(newBudgets);
                  setShowBudgetModal(false);
                  setBudgetFormData({});
                  toast.success('💰 Orçamento definido!');
                }} 
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-3 rounded-full font-semibold"
              >
                Guardar
              </button>
              <button 
                onClick={() => {
                  setShowBudgetModal(false);
                  setBudgetFormData({});
                }} 
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-3 rounded-full font-semibold"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {showCategories && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-8 border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">Gerir Categorias</h3>
              <button onClick={() => setShowCategories(false)} className="text-gray-500 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <button onClick={() => openModal('category')} className="w-full mb-6 bg-orange-600 hover:bg-orange-700 text-gray-800 px-4 py-3 rounded-full flex items-center justify-center gap-2 font-semibold">
              <PlusCircle className="w-5 h-5" />
              Nova Categoria
            </button>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl border border-gray-200 p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Despesas</h4>
                <div className="space-y-2">
                  {categories.filter(c => c.type === 'expense').length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Nenhuma categoria</p>
                  ) : (
                    categories.filter(c => c.type === 'expense').map(cat => (
                      <div key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className={`px-3 py-1 rounded font-medium ${cat.color}`}>{cat.name}</span>
                        <button onClick={() => saveCategories(categories.filter(c => c.id !== cat.id))} className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Receitas</h4>
                <div className="space-y-2">
                  {categories.filter(c => c.type === 'income').length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Nenhuma categoria</p>
                  ) : (
                    categories.filter(c => c.type === 'income').map(cat => (
                      <div key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className={`px-3 py-1 rounded font-medium ${cat.color}`}>{cat.name}</span>
                        <button onClick={() => saveCategories(categories.filter(c => c.id !== cat.id))} className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Loading Overlay for Firebase Sync */}
      <LoadingOverlay 
        show={syncing} 
        message="A sincronizar com a cloud..." 
      />
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}

// App wrapper com ToastProvider
function FinanceApp() {
  return (
    <ToastProvider>
      <FinanceAppContent />
    </ToastProvider>
  );
}

export default FinanceApp;

