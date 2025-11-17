import React, { useState } from 'react';
import axios from 'axios';

// 1. Criamos uma "instância" do Axios para não ter de repetir o URL base
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

// Usamos 'export function' (uma exportação com nome)
export function PainelLevantamento() {
  // --- Estados da Lista ---
  const [levantamentos, setLevantamentos] = useState<any[]>([]);

  // --- Estados de Feedback ---
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getToken = () => localStorage.getItem('authToken');

  // --- Função: Carregar a Lista de Levantamentos ---
  const handleLoadLevantamentos = async () => {
    setLevantamentos([]);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = getToken();
      if (!token) {
        setErrorMessage('Erro: Você precisa de fazer login primeiro (ser Coordenador).');
        return;
      }

      // 1. Tenta chamar a "porta" (endpoint) GET /levantamento
      //    (O "Guarda" no backend vai verificar o token)
      const response = await apiClient.get('/levantamento', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 2. Sucesso!
      setLevantamentos(response.data);
      setSuccessMessage(`(${response.data.length}) registos encontrados.`);
    } catch (error: any) {
      setErrorMessage('Erro ao carregar os registos (Acesso Negado?).');
    }
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Painel de Visualização (RF05)
      </h2>
      <h3 className="text-xl text-center mb-4">(Apenas Coordenadores)</h3>

      {/* --- Lista de Levantamentos --- */}
      <div className="mt-8">
        <button
          onClick={handleLoadLevantamentos}
          className="w-full px-4 py-2 mb-4 font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Carregar Registos Socioeconómicos (Rota Protegida)
        </button>

        {/* Mensagens de Feedback */}
        {successMessage && <p className="text-center text-green-400">{successMessage}</p>}
        {errorMessage && <p className="text-center text-red-400">{errorMessage}</p>}

        {/* Tabela de Levantamentos */}
        {levantamentos.length > 0 && (
          <table className="min-w-full mt-4 text-left bg-gray-700 table-auto">
            <thead className="border-b border-gray-600">
              <tr>
                <th className="px-4 py-2">Data</th>
                <th className="px-4 py-2">Membros</th>
                <th className="px-4 py-2">Renda</th>
                <th className="px-4 py-2">Moradia</th>
                <th className="px-4 py-2">Bairro</th>
                <th className="px-4 py-2">Internet</th>
              </tr>
            </thead>
            <tbody>
              {levantamentos.map((item) => (
                <tr key={item.id} className="border-b border-gray-600">
                  <td className="px-4 py-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{item.numero_membros_familia}</td>
                  <td className="px-4 py-2">{item.faixa_renda}</td>
                  <td className="px-4 py-2">{item.tipo_moradia}</td>
                  <td className="px-4 py-2">{item.bairro}</td>
                  <td className="px-4 py-2">{item.possui_acesso_internet ? 'Sim' : 'Não'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}