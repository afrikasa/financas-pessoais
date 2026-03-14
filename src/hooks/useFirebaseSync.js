// Custom hook for Firebase synchronization
import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { firebaseSync } from '../services/firebaseSync';

export function useFirebaseSync() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        firebaseSync.setUser(user.uid);
      } else {
        firebaseSync.setUser(null);
        firebaseSync.cleanup();
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign in with Google
  const signIn = async () => {
    try {
      setError(null);
      setSyncing(true);
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      setError(err.message);
      console.error('Sign in error:', err);
      return null;
    } finally {
      setSyncing(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
      firebaseSync.cleanup();
    } catch (err) {
      setError(err.message);
      console.error('Sign out error:', err);
    }
  };

  // Upload local data to Firebase
  const uploadLocalData = async (localData) => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    try {
      setError(null);
      setSyncing(true);
      await firebaseSync.uploadAllData(localData);
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Upload error:', err);
      return false;
    } finally {
      setSyncing(false);
    }
  };

  // Download data from Firebase
  const downloadFirebaseData = async () => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    try {
      setError(null);
      setSyncing(true);
      const data = await firebaseSync.downloadAllData();
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Download error:', err);
      return null;
    } finally {
      setSyncing(false);
    }
  };

  return {
    user,
    loading,
    syncing,
    error,
    signIn,
    signOut,
    uploadLocalData,
    downloadFirebaseData,
    isAuthenticated: !!user
  };
}

export default useFirebaseSync;
