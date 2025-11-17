import React, { useState } from 'react';
import axios from 'axios';

// 1. Importamos TODAS as nossas "páginas" (componentes)
import { Login } from './pages/Login';
import Register from './pages/Register';
import { PainelProfessor } from './pages/PainelProfessor';
import { GestaoEscolas } from './pages/GestaoEscolas';
import LevantamentoForm from './pages/LevantamentoForm';
import { PainelLevantamento } from './pages/PainelLevantamento';

// --- API Client Base ---
// Criamos uma "instância" do Axios para não ter de repetir o URL base
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

// --- Tipos de Dados ---
interface IVolunteer {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'pending' | 'approved' | 'rejected' | null;
  createdAt: string;
}

function App() {
  // --- Estados para os 5 Painéis ---

  // (RF01 - Autenticação)
  const [profileData, setProfileData] = useState<any>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  // (RF02 - Painel Coordenador)
  const [volunteers, setVolunteers] = useState<IVolunteer[]>([]);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccess, setAdminSuccess] = useState<string | null>(null);

  // (O resto dos painéis já tem a sua própria gestão de estado interna)

  // --- Função: Aceder à Rota Protegida (/profile) ---
  const handleAccessProtected = async () => {
    setProfileData(null);
    setProfileError(null);

    try {
      // 1. Tenta buscar o "passe" (token) do localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        setProfileError('Erro: Você precisa de fazer login primeiro.');
        return;
      }

      // 2. Faz a chamada ao backend (GET /auth/profile)
      //    ENVIANDO o token no cabeçalho (Header)
      const response = await apiClient.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // O nosso "Guarda" vai ler isto
        },
      });

      // 3. Sucesso!
      setProfileData(response.data);
    } catch (error: any) {
      // 4. Falha (Token expirado, 'Guarda' bloqueou, etc.)
      if (error.response) {
        setProfileError(`Erro: Acesso não autorizado (${error.response.status})`);
      } else {
        setProfileError('Erro de rede ao aceder à rota protegida.');
      }
    }
  };

  // --- Função: Carregar Lista de Voluntários (RF02) ---
  const handleLoadVolunteers = async () => {
    setVolunteers([]);
    setAdminError(null);
    setAdminSuccess(null);

    const token = localStorage.getItem('authToken');
    if (!token) {
      setAdminError('Erro: Você precisa de fazer login primeiro.');
      return;
    }

    try {
      // 1. Chamar a rota GET /volunteers (protegida)
      const response = await apiClient.get('/volunteers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 2. Sucesso
      setVolunteers(response.data);
      setAdminSuccess(`Voluntários encontrados (${response.data.length}):`);
    } catch (error: any) {
      if (error.response) {
        setAdminError(`Erro ao carregar voluntários (${error.response.status})`);
      } else {
        setAdminError('Erro de rede ao carregar voluntários.');
      }
    }
  };

  // --- Função: Aprovar Voluntário (RF02) ---
  const handleApproveVolunteer = async (volunteerId: string) => {
    setAdminError(null);
    setAdminSuccess(null);

    const token = localStorage.getItem('authToken');
    if (!token) {
      setAdminError('Erro: Você precisa de fazer login primeiro.');
      return;
    }

    try {
      // 1. Chamar a rota PATCH /volunteers/:id/approve (protegida)
      const response = await apiClient.patch(
        `/volunteers/${volunteerId}/approve`,
        {}, // Envia um corpo vazio
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 2. Sucesso
      setAdminSuccess(`Voluntário "${response.data.name}" aprovado com sucesso!`);
      
      // 3. (MUITO IMPORTANTE) Atualiza a lista localmente
      setVolunteers((currentVolunteers) =>
        currentVolunteers.map((vol) =>
          vol.id === volunteerId
            ? { ...vol, status: response.data.status } // Atualiza o status
            : vol,
        ),
      );

    } catch (error: any) {
      if (error.response) {
        setAdminError(`Erro ao aprovar voluntário (${error.response.status})`);
      } else {
        setAdminError('Erro de rede ao aprovar voluntário.');
      }
    }
  };

  // --- O Nosso HTML (JSX) ---
  return (
    // Um contentor de tela cheia, com fundo escuro e texto branco
    <div className="flex flex-col items-center justify-start min-h-screen w-full p-10 bg-gray-900 text-white">
      
      {/* 1. O nosso "Olá Mundo" (Título Principal) */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">Olá Mundo, do Frontend React!</h1>
        <p className="text-lg text-gray-400">
          (Agora com Registo, Login, JWT, Rotas Protegidas e Gestão!)
        </p>
      </div>

      {/* --- Um contentor para os nossos dois formulários (Lado a Lado) --- */}
      <div className="flex flex-wrap items-start justify-center w-full max-w-6xl gap-10 mt-10">
        
        {/* Painel de Registo (RF01 / RF02) */}
        <Register />

        {/* Painel de Login (RF01) */}
        <Login />

      </div>

      {/* --- Um divisor visual --- */}
      <hr className="w-full max-w-6xl my-10 border-gray-700" />

      {/* --- Painel de Teste de Rota Protegida (RF01) --- */}
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-center mb-4">
          Painel de Teste de Rota Protegida
        </h3>
        <button
          onClick={handleAccessProtected}
          className="w-full px-4 py-2 font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Aceder à Rota Protegida /profile
        </button>

        {/* Feedback Rota Protegida */}
        {profileError && (
          <p className="mt-4 text-center text-red-400">{profileError}</p>
        )}
        {profileData && (
          <div className="mt-4">
            <p className="text-center text-green-400">Sucesso! Você está autenticado.</p>
            <pre className="mt-2 p-4 text-sm text-left bg-gray-900 rounded-md overflow-auto">
              {JSON.stringify(profileData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* --- Um divisor visual --- */}
      <hr className="w-full max-w-6xl my-10 border-gray-700" />

      {/* --- Painel do Coordenador (RF02) --- */}
      <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-center mb-4">
          Painel do Coordenador (RF02)
        </h3>
        <button
          onClick={handleLoadVolunteers}
          className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Carregar Voluntários (Rota Protegida /volunteers)
        </button>

        {/* Feedback Painel Coordenador */}
        {adminSuccess && (
          <p className="mt-4 text-center text-green-400">{adminSuccess}</p>
        )}
        {adminError && (
          <p className="mt-4 text-center text-red-400">{adminError}</p>
        )}

        {/* Tabela de Voluntários */}
        {volunteers.length > 0 && (
          <table className="min-w-full mt-4 text-left bg-gray-700 table-auto">
            <thead className="border-b border-gray-600">
              <tr>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer) => (
                <tr key={volunteer.id} className="border-b border-gray-600">
                  <td className="px-4 py-2">{volunteer.name}</td>
                  <td className="px-4 py-2">{volunteer.email}</td>
                  <td
                    className={`px-4 py-2 ${
                      volunteer.status === 'approved'
                        ? 'text-green-400'
                        : volunteer.status === 'pending'
                        ? 'text-yellow-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {volunteer.status || 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {/* O botão "Aprovar" só aparece se o status for 'pending' */}
                    {volunteer.status === 'pending' && (
                      <button
                        onClick={() => handleApproveVolunteer(volunteer.id)}
                        className="px-3 py-1 text-sm font-medium text-black bg-yellow-400 rounded-md hover:bg-yellow-500"
                      >
                        Aprovar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* --- Um divisor visual --- */}
      <hr className="w-full max-w-6xl my-10 border-gray-700" />
      
      {/* --- Painel do Professor (RF03) --- */}
      <PainelProfessor />

      {/* --- Um divisor visual --- */}
      <hr className="w-full max-w-6xl my-10 border-gray-700" />

      {/* --- Painel de Gestão de Escolas (RF04) --- */}
      <GestaoEscolas />

      {/* --- Um divisor visual --- */}
      <hr className="w-full max-w-6xl my-10 border-gray-700" />

      {/* --- Painel de Levantamento (RF05) - FORMULÁRIO PÚBLICO --- */}
      <LevantamentoForm />

      {/* --- Um divisor visual --- */}
      <hr className="w-full max-w-6xl my-10 border-gray-700" />

      {/* --- Painel de Levantamento (RF05) - PAINEL DO COORDENADOR --- */}
      <PainelLevantamento />

    </div>
  );
}

export default App;