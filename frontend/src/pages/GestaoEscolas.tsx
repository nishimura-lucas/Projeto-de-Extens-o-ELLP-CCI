import React, { useState } from 'react';
import axios from 'axios';

// 1. Criamos uma "instância" do Axios para não ter de repetir o URL base
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

// (Vamos buscar os Enums ao backend, mas por agora vamos defini-los aqui)
const TipoInstituicao = {
  ESCOLA_PUBLICA: 'escola_publica',
  ONG: 'ong',
  CRECHE: 'creche',
  OUTRO: 'outro',
};

const StatusParceria = {
  PENDENTE: 'pendente',
  ATIVA: 'ativa',
  INATIVA: 'inativa',
};

// Usamos 'export function' (uma exportação com nome)
export function GestaoEscolas() {
  // --- Estados do Formulário ---
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState(TipoInstituicao.ESCOLA_PUBLICA);
  const [contatoNome, setContatoNome] = useState('');
  const [contatoEmail, setContatoEmail] = useState('');

  // --- Estados da Lista ---
  const [escolas, setEscolas] = useState<any[]>([]);

  // --- Estados de Feedback ---
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // --- Função: Criar uma nova Escola ---
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrorMessage('Erro: Você precisa de fazer login primeiro.');
        return;
      }

      const payload = {
        nome,
        tipo,
        contato_nome: contatoNome,
        contato_email: contatoEmail,
      };

      // 1. Tenta chamar a "porta" (endpoint) POST /escolas
      const response = await apiClient.post('/escolas', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 2. Sucesso!
      setSuccessMessage(`Instituição "${response.data.nome}" criada com sucesso!`);
      // Limpa o formulário
      setNome('');
      setTipo(TipoInstituicao.ESCOLA_PUBLICA);
      setContatoNome('');
      setContatoEmail('');
      // Atualiza a lista de escolas (para mostrar a nova)
      handleLoadEscolas();
    } catch (error: any) {
      const messages = error.response?.data?.message;
      setErrorMessage(Array.isArray(messages) ? messages.join(', ') : 'Erro ao criar instituição.');
    }
  };

  // --- Função: Carregar a Lista de Escolas ---
  const handleLoadEscolas = async () => {
    setEscolas([]);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrorMessage('Erro: Você precisa de fazer login primeiro.');
        return;
      }

      // 1. Tenta chamar a "porta" (endpoint) GET /escolas
      const response = await apiClient.get('/escolas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 2. Sucesso!
      setEscolas(response.data);
      setSuccessMessage(`(${response.data.length}) escolas carregadas.`);
    } catch (error: any) {
      setErrorMessage('Erro ao carregar a lista de escolas.');
    }
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Painel de Gestão de Escolas (RF04)
      </h2>

      {/* --- Formulário de Criação --- */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Cadastrar Nova Instituição</h3>
        <form onSubmit={handleCreateSubmit} className="grid grid-cols-2 gap-4">
          {/* Coluna 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo:</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md"
            >
              <option value={TipoInstituicao.ESCOLA_PUBLICA}>Escola Pública</option>
              <option value={TipoInstituicao.ONG}>ONG</option>
              <option value={TipoInstituicao.CRECHE}>Creche</option>
              <option value={TipoInstituicao.OUTRO}>Outro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Nome do Contato:</label>
            <input
              type="text"
              value={contatoNome}
              onChange={(e) => setContatoNome(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email do Contato:</label>
            <input
              type="email"
              value={contatoEmail}
              onChange={(e) => setContatoEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md"
            />
          </div>
          {/* Botão na linha inteira */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Salvar Nova Instituição
            </button>
          </div>
        </form>
      </div>

      <hr className="w-full border-gray-700" />

      {/* --- Lista de Escolas --- */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Instituições Cadastradas</h3>
        <button
          onClick={handleLoadEscolas}
          className="w-full px-4 py-2 mb-4 font-bold text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Carregar Lista de Instituições
        </button>

        {/* Mensagens de Feedback */}
        {successMessage && <p className="text-center text-green-400">{successMessage}</p>}
        {errorMessage && <p className="text-center text-red-400">{errorMessage}</p>}

        {/* Tabela de Escolas */}
        {escolas.length > 0 && (
          <table className="min-w-full mt-4 text-left bg-gray-700 table-auto">
            <thead className="border-b border-gray-600">
              <tr>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Contato</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {escolas.map((escola) => (
                <tr key={escola.id} className="border-b border-gray-600">
                  <td className="px-4 py-2">{escola.nome}</td>
                  <td className="px-4 py-2">{escola.tipo}</td>
                  <td className="px-4 py-2">{escola.contato_nome} ({escola.contato_email})</td>
                  <td className="px-4 py-2">{escola.status_parceria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}