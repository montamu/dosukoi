import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import { User } from "firebase/auth";

type UserAuthContext = { 
  user: User | null; 
  loading: boolean;
};

const AuthContext = createContext<UserAuthContext>({user: null, loading: true});

type Props = {
  children: React.ReactNode
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  const value = {
    user,
    loading
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

