import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../utils/api";
import { petTagTranslation } from "../pages/ListPets";
import { useAlert } from "../context/AlertContext";

const PetFoundPage = () => {
  const { hashCode } = useParams();
  const { api } = useApi();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("Aguardando permissão de localização...");
  const [contactForm, setContactForm] = useState({
    finderName: "",
    finderPhone: "",
    message: "",
  });

  useEffect(() => {
    // Carregar informações do pet usando o hashCode do QR code
    if (hashCode) {
      setLoading(true);
      api
        .get(`/qrcodes/public/${hashCode}`)
        .then(({ data }) => {
          setPet(data);
        })
        .catch((error) => {
          showAlert("QR Code inválido ou expirado", "error");
          console.error("Erro ao buscar informações do pet:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // Obter localização do usuário
    if (navigator.geolocation) {
      setLocationStatus("Obtendo sua localização...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setLocationStatus("Localização obtida com sucesso!");
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          setLocationStatus("Não foi possível obter sua localização. Por favor, permita o acesso à localização.");
        }
      );
    } else {
      setLocationStatus("Seu navegador não suporta geolocalização.");
    }
  }, [hashCode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!contactForm.finderName || !contactForm.finderPhone) {
      showAlert("Por favor, preencha seu nome e telefone", "error");
      return;
    }

    if (!userLocation) {
      showAlert("Não foi possível obter sua localização. Permita o acesso à localização ou tente novamente mais tarde.", "error");
      return;
    }

    // Enviar informações para o backend
    const petFoundData = {
      contactInfo: String(contactForm),
      latitude: Number(userLocation.latitude),
      longitude: Number(userLocation.longitude),
    };

    setLoading(true);
    console.log("Enviando informações:", petFoundData);
    api
      .post("/public/pet/found/" + hashCode, petFoundData)
      .then(() => {
        showAlert("Informações enviadas com sucesso! O dono do pet entrará em contato com você.", "success");
        setContactForm({ finderName: "", finderPhone: "", message: "" });
      })
      .catch((error) => {
        showAlert("Erro ao enviar informações. Tente novamente.", "error");
        console.error(error.response.data); 
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="container mx-auto p-6 min-h-[calc(100vh-120px)] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">QR Code inválido</h1>
        <p className="mb-4">O QR Code escaneado não está associado a nenhum pet ou expirou.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-[calc(100vh-120px)]">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Você encontrou um pet!</h1>
          <p className="text-gray-600">
            Este QR code está registrado para um pet perdido. Por favor, ajude o dono a
            encontrá-lo fornecendo algumas informações.
          </p>
        </div>   

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Sua Localização</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="mb-2">{locationStatus}</p>
            {userLocation && (
              <p className="text-green-600">
                ✓ Localização detectada e será compartilhada com o dono
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Informações de Contato</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Seu Nome*
              </label>
              <input
                type="text"
                name="finderName"
                value={contactForm.finderName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Seu Telefone*
              </label>
              <input
                type="tel"
                name="finderPhone"
                value={contactForm.finderPhone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mensagem (opcional)
              </label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descreva onde você encontrou o pet ou qualquer outra informação útil"
                rows="4"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : "Enviar Informações"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetFoundPage;