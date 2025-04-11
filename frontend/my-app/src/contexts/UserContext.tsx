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

const generateGravatarUrl = (email?: string) => {
  if (!email) {
    return 'https://www.gravatar.com/avatar/default?d=identicon&s=150';
  }
  return `https://www.gravatar.com/avatar/${email.trim().toLowerCase()}?d=identicon&s=150`;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const userData = await getUserProfile();
      // Si el usuario no tiene imagen de perfil, generamos el Gravatar
      if (!userData.profile_picture) {
        userData.profile_picture = generateGravatarUrl(userData.email);
      }
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
      // Si el usuario no tiene imagen de perfil, generamos el Gravatar
      if (!updatedUser.profile_picture) {
        updatedUser.profile_picture = generateGravatarUrl(updatedUser.email);
      }
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