import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AuthContextType } from "../types/authTypes";
import { useToast } from "../components/Toast/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "dragons_db_auth_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { success, error: toastError } = useToast();
  
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Dragon!",
      email: "dragondb@email.com",
      password: "Dragon12@@"
    }
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        setError("Email ou senha inválidos");
        toastError("Erro de autenticação", "Email ou senha inválidos");
        setLoading(false);
        return false;
      }
      
      const userToStore = { ...foundUser };
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userToStore));
      setUser(foundUser);
      success("Login realizado", "Bem-vindo de volta!");
      setLoading(false);
      return true;
    } catch (err) {
      setError("Erro ao fazer login");
      toastError("Erro", "Não foi possível completar o login");
      setLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userExists = users.some(user => user.email === email);
      if (userExists) {
        setError("Este email já está em uso");
        toastError("Erro no cadastro", "Este email já está cadastrado");
        setLoading(false);
        return false;
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password
      };
      
      setUsers(prevUsers => [...prevUsers, newUser]);
      
      const userToStore = { ...newUser };
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userToStore));
      setUser(newUser);
      success("Cadastro realizado", "Conta criada com sucesso!");
      setLoading(false);
      return true;
    } catch (err) {
      setError("Erro ao criar conta");
      toastError("Erro", "Não foi possível criar sua conta");
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    success("Logout realizado", "Você saiu da sua conta");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};