import React, { useState } from 'react';
import axios from 'axios';

// 1. Criamos uma "instância" do Axios para não ter de repetir o URL base
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

// Usamos 'export function' (uma exportação com nome)
export function PainelProfessor() {
  // --- Estados do Formulário ---
  const [tema, setTema] = useState('');
  const [descricao, setDescricao] = useState('');
  const [publicoAlvo, setPublicoAlvo] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  // --- Estados de Feedback ---
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // --- Função: Lidar com o envio do formulário ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // 1. Tenta buscar o "passe" (token) do localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrorMessage('Erro: Você precisa de fazer login primeiro.');
        return;
      }

      // 2. Prepara os dados para enviar (payload)
      const payload = {
        tema: tema,
        descricao: descricao,
        publico_alvo: publicoAlvo,
        data_inicio: new Date(dataInicio), // Converte a string para Data
        data_fim: new Date(dataFim), // Converte a string para Data
      };

      // 3. Tenta chamar a "porta" (endpoint) POST /oficinas
      const response = await apiClient.post('/oficinas', payload, {
        headers: {
          Authorization: `Bearer ${token}`, // O nosso "Guarda" vai ler isto
        },
      });

      // 4. Sucesso!
      setSuccessMessage(`Oficina "${response.data.tema}" criada com sucesso!`);
      // Limpa o formulário
      setTema('');
      setDescricao('');
      setPublicoAlvo('');
      setDataInicio('');
      setDataFim('');
    } catch (error: any) {
      // 5. Falha
      if (error.response && error.response.data && error.response.data.message) {
        const messages = error.response.data.message;
        setErrorMessage(Array.isArray(messages) ? messages.join(', ') : messages);
      } else {
        setErrorMessage('Ocorreu um erro desconhecido ao tentar criar a oficina.');
      }
    }
  };

  return (
    <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Painel do Professor (RF03)
      </h2>
      <h3 className="text-xl text-center mb-4">Criar Nova Oficina</h3>
      <form onSubmit={handleSubmit}>
        {/* Campo Tema */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Tema:</label>
          <input
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Campo Descrição */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Campo Público-Alvo */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Público-Alvo:</label>
          <input
            type="text"
            value={publicoAlvo}
            onChange={(e) => setPublicoAlvo(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Campo Data Início */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Data de Início:</label>
          <input
            type="datetime-local" // Facilita a escolha da data e hora
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Campo Data Fim */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Data de Fim:</label>
          <input
            type="datetime-local"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Criar Oficina
        </button>

        {/* Mensagens de Feedback */}
        {successMessage && (
          <p className="mt-4 text-center text-green-400">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-center text-red-400">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}