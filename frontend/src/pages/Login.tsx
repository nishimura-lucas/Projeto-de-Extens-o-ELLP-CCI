import React, { useState } from 'react';
import axios from 'axios';
// (NÃO importamos o jwt-decode aqui, não é preciso)

// 1. (REVERTIDO) Não recebe mais 'props' (onLoginSuccess)
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      // 1. "Telefonar" para a nossa "porta" /auth/login
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        {
          email,
          password,
        },
      );

      // 2. Se a chamada for bem-sucedida, o 'response.data' terá o token
      const token = response.data.access_token;
      localStorage.setItem('authToken', token); // Guardamos no "cofre"

      setMessage({
        type: 'success',
        text: 'Login efetuado com sucesso! (Pode testar as rotas protegidas agora)',
      });

      // 3. (REVERTIDO) Já NÃO chamamos 'onLoginSuccess'
    } catch (error: any) {
      // 4. Se o backend devolver um erro (ex: 401 Unauthorized), mostre-o
      console.error('Erro no login:', error);
      if (error.response && error.response.data.message) {
        setMessage({ type: 'error', text: error.response.data.message });
      } else {
        setMessage({
          type: 'error',
          text: 'Ocorreu um erro desconhecido ao tentar fazer login.',
        });
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        Entrar no Sistema (RF01)
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Palavra-passe:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </form>

      {/* Mensagens de sucesso ou erro */}
      {message.text && (
        <p
          className={`text-sm text-center ${
            message.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}