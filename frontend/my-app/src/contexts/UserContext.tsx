import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/favor';
import { getUserProfile, updateUserProfile } from '../api/user';

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateUser: (userData: Partial<User>) => Promise<User>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const userData = await getUserProfile();
      setUser(userData);
      setError(null);
    } catch (err) {
      setError('Error al cargar el perfil del usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      const updatedUser = await updateUserProfile(userData);
      setUser(updatedUser);
      setError(null);
      return updatedUser;
    } catch (err) {
      setError('Error al actualizar el perfil');
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 