import React, { useState } from 'react';
import axios from 'axios';

// 1. Criamos uma "instância" do Axios para não ter de repetir o URL base
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

// (Vamos buscar os Enums ao backend, mas por agora vamos defini-los aqui)
const FaixaRenda = {
  ATE_1_MINIMO: 'ate_1_minimo',
  DE_1_A_2_MINIMOS: 'de_1_a_2_minimos',
  DE_2_A_3_MINIMOS: 'de_2_a_3_minimos',
  MAIS_DE_3_MINIMOS: 'mais_de_3_minimos',
};

const TipoMoradia = {
  PROPRIA: 'propria',
  ALUGADA: 'alugada',
  CEDIDA: 'cedida',
};

// 2. Note que agora é 'export default' (importação padrão)
export default function LevantamentoForm() {
  // --- Estados do Formulário ---
  const [numMembros, setNumMembros] = useState(1);
  const [faixaRenda, setFaixaRenda] = useState(FaixaRenda.ATE_1_MINIMO);
  const [tipoMoradia, setTipoMoradia] = useState(TipoMoradia.PROPRIA);
  const [bairro, setBairro] = useState('');
  const [temInternet, setTemInternet] = useState(false);
  const [observacoes, setObservacoes] = useState('');

  // --- Estados de Feedback ---
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // --- Função: Lidar com o envio do formulário ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const payload = {
        numero_membros_familia: Number(numMembros),
        faixa_renda: faixaRenda,
        tipo_moradia: tipoMoradia,
        bairro: bairro,
        possui_acesso_internet: temInternet,
        observacoes: observacoes,
      };

      // 1. Tenta chamar a "porta" (endpoint) PÚBLICA /levantamento
      //    (Note: NÃO enviamos 'token' de autorização)
      const response = await apiClient.post('/levantamento', payload);

      // 2. Sucesso!
      setSuccessMessage('Levantamento enviado com sucesso! Obrigado.');
      // Limpa o formulário
      setNumMembros(1);
      setFaixaRenda(FaixaRenda.ATE_1_MINIMO);
      // ... (etc, pode adicionar a limpeza dos outros campos)
    } catch (error: any) {
      // 3. Falha
      const messages = error.response?.data?.message;
      setErrorMessage(Array.isArray(messages) ? messages.join(', ') : 'Erro ao enviar o formulário.');
    }
  };

  return (
    <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md text-gray-900">
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
        Formulário Socioeconômico (RF05)
      </h2>
      <h3 className="text-sm text-center text-gray-600 mb-4">(Este formulário é 100% anónimo)</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Número de membros na família:</label>
          <input
            type="number"
            value={numMembros}
            onChange={(e) => setNumMembros(Number(e.target.value))}
            min={1}
            required
            className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Faixa de Renda:</label>
          <select
            value={faixaRenda}
            onChange={(e) => setFaixaRenda(e.target.value)}
            className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md"
          >
            <option value={FaixaRenda.ATE_1_MINIMO}>Até 1 salário mínimo</option>
            <option value={FaixaRenda.DE_1_A_2_MINIMOS}>De 1 a 2 salários</option>
            <option value={FaixaRenda.DE_2_A_3_MINIMOS}>De 2 a 3 salários</option>
            <option value={FaixaRenda.MAIS_DE_3_MINIMOS}>Mais de 3 salários</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Moradia:</label>
          <select
            value={tipoMoradia}
            onChange={(e) => setTipoMoradia(e.target.value)}
            className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md"
          >
            <option value={TipoMoradia.PROPRIA}>Própria</option>
            <option value={TipoMoradia.ALUGADA}>Alugada</option>
            <option value={TipoMoradia.CEDIDA}>Cedida</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bairro:</label>
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={temInternet}
            onChange={(e) => setTemInternet(e.target.checked)}
            id="internet-check"
            className="w-4 h-4 text-indigo-600 rounded"
          />
          <label htmlFor="internet-check" className="ml-2 block text-sm text-gray-900">
            Possui acesso à internet em casa?
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Observações (Opcional):</label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Enviar Dados Anónimos
        </button>

        {/* Mensagens de Feedback */}
        {successMessage && <p className="mt-4 text-center text-green-600">{successMessage}</p>}
        {errorMessage && <p className="mt-4 text-center text-red-600">{errorMessage}</p>}
      </form>
    </div>
  );
}