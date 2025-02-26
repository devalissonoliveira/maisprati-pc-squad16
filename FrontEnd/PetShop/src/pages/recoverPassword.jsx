import React, {useState} from "react";

const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (email) {
        setMessage('Instruções para recuperação de senha foram enviadas para seu e-mail.');
      } else {
        setMessage('Por favor, insira um e-mail válido.');
      }
    };
  
    return (
      <div className="flex justify-center items-center h-screen box-border">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Recuperar Senha</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">E-mail</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Enviar Instruções
            </button>
          </form>
          {message && (
            <div className="mt-4 text-center text-sm text-gray-600">
              {message}
            </div> 
          )}
        </div>
      </div>
    );
};
  
export default RecoverPassword;
