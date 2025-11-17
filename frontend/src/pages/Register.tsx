import React, { useState } from 'react';
import axios from 'axios'; // 1. Importe o axios

// O endereço do nosso backend.
// IMPORTANTE: O nosso backend está a rodar em http://localhost:3000
const API_URL = 'http://localhost:3000/auth/register';

const Register = () => {
  // 2. Estados para guardar o que o utilizador digita
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // ****** MUDANÇA AQUI ******
  // O valor padrão agora é o que o backend espera: 'volunteer'
  const [role, setRole] = useState('volunteer');

  // Estados para feedback
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 3. Função que será chamada quando o formulário for submetido
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Impede o navegador de recarregar a página
    setError(''); // Limpa erros antigos
    setMessage(''); // Limpa mensagens antigas

    // 4. Validação simples no frontend
    if (!name || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (password.length < 6) {
      setError('A palavra-passe deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      // 5. O GRANDE MOMENTO: Enviar os dados para o backend!
      const response = await axios.post(API_URL, {
        name: name,
        email: email,
        password: password,
        role: role, // Isto agora vai enviar 'volunteer', 'professor', ou 'admin'
      });

      // 6. Se deu certo (backend criou o utilizador)
      setMessage(`Utilizador "${response.data.name}" criado com sucesso!`);
      // Limpar o formulário
      setName('');
      setEmail('');
      setPassword('');

    } catch (err: any) {
      // 7. Se deu errado (ex: email já existe)
      // ****** CORREÇÃO DO ERRO AQUI: Adicionando o bloco catch que faltava ******
      if (axios.isAxiosError(err) && err.response) {
        // Mostra a mensagem de erro que o *backend* nos enviou
        // (ex: "Este email já está a ser utilizado.")
        setError(err.response.data.message);
      } else {
        setError('Ocorreu um erro desconhecido ao tentar registar.');
      }
    }
  }; // <-- O '}' que estava a causar o erro foi corrigido com o bloco catch

  // 8. Este é o HTML (JSX) do nosso formulário
  return (
    <div>
      <h2>Página de Registo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Palavra-passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ****** MUDANÇA AQUI ****** */}
        {/* O 'value' das <option> agora é o que o backend espera (minúsculas) */}
        <div>
          <label>Função:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="volunteer">Voluntário</option>
            <option value="professor">Professor</option>
            <option value="admin">Coordenador</option> 
            {/* O Coordenador no backend é o 'admin' */}
          </select>
        </div>
        <button type="submit">Registar</button>
      </form>

      {/* Mostra mensagens de sucesso ou erro */}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;