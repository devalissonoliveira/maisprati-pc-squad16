import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticatedApi } from "../context/AuthContext";
import QRCode from "qrcode.react";
import { useAlert } from "../context/AlertContext";

const QRCodeGenerator = () => {
  const { api } = useAuthenticatedApi();
  const { showAlert } = useAlert();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseUrl = window.location.origin;

  useEffect(() => {
    // Carregar a lista de pets do usuário
    api
      .get("/pets")
      .then(({ data }) => {
        setPets(data);
        console.log("Pets carregados:", data);
      })
      .catch((error) => {
        showAlert("Erro ao carregar seus pets", "error");
        console.error("Erro ao buscar pets:", error);
      });
  }, []);

  // Verificar se o pet selecionado já tem QR code associado
  useEffect(() => {
    if (selectedPet) {
      setLoading(true);
      // Verificar se já existe um QR code para este pet
      api
        .get(`/qrcodes/pet/${selectedPet.petId}`)
        .then(({ data }) => {
          console.log("QR code existente:", data);
          if (
            typeof data === "object" &&
            data !== null &&
            Object.keys(data).length > 0
          ) {
            console.log("ENTROU 1");
            setQrCodeData(data);
          } else {
            console.log("ENTROU 2");
            setQrCodeData(null);
          }
        })
        .catch((error) => {
          // Se retornar 404, significa que não existe QR code para esse pet
          setQrCodeData(null);
          if (error.response && error.response.status !== 404) {
            showAlert("Erro ao verificar QR Code existente", "error");
            console.error("Erro ao verificar QR code:", error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedPet]);

  const handlePetSelect = (petId) => {
    const pet = pets.find((p) => p.petId === parseInt(petId));
    setSelectedPet(pet);
    console.log("Pet selecionado:", pet);
  };

  const generateQRCode = () => {
    if (!selectedPet) {
      showAlert("Por favor, selecione um pet primeiro", "error");
      return;
    }

    setLoading(true);
    setError(null);

    // Payload correto no formato que a API espera
    const payload = { petId: selectedPet.petId };
    console.log("Enviando payload para criar QR code:", payload);

    // Verificar se o token está incluído nos cabeçalhos
    console.log("Token nos cabeçalhos:", api.defaults?.headers?.Authorization);

    api
      .post("/qrcodes", payload)
      .then(({ data }) => {
        console.log("QR code criado com sucesso:", data);
        setQrCodeData(data);
        showAlert("QR Code gerado com sucesso!", "success");

        // Confirmar que o QR code foi criado tentando obtê-lo novamente
        return api.get(`/qrcodes/pet/${selectedPet.petId}`);
      })
      .then(({ data }) => {
        console.log("QR code verificado após criação:", data);
      })
      .catch((error) => {
        console.error("Erro ao gerar QR Code:", error);
        setError(error);

        if (error.response) {
          console.error("Status do erro:", error.response.status);
          console.error("Dados do erro:", error.response.data);
        }

        showAlert(`Erro ao gerar QR Code: ${error.message}`, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("pet-qrcode");
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qrcode-${selectedPet.name}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="container mx-auto p-6 min-h-[calc(100vh-120px)]">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Gerar QR Code para seu Pet
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Selecione um Pet:
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => handlePetSelect(e.target.value)}
            value={selectedPet?.petId || ""}
            disabled={loading}
          >
            <option value="">Selecione um pet</option>
            {pets.map((pet) => (
              <option key={pet.petId} value={pet.petId}>
                {pet.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={generateQRCode}
            className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading || !selectedPet || qrCodeData}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processando...
              </span>
            ) : qrCodeData ? (
              "QR Code Gerado"
            ) : (
              "Gerar QR Code"
            )}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-bold">Erro ao gerar QR Code:</p>
            <p>{error.message}</p>
            <p className="mt-2 text-sm">
              Detalhes técnicos (para desenvolvedor):
              {error.response
                ? `Status ${error.response.status}`
                : "Erro de rede"}
            </p>
          </div>
        )}

        {qrCodeData && selectedPet && (
          <div className="flex flex-col items-center">
            <div className="border-2 border-gray-300 p-4 rounded-md mb-4">
              <QRCode
                id="pet-qrcode"
                value={`${baseUrl}/public/pet/find/${
                  Array.isArray(qrCodeData)
                    ? qrCodeData[0].hashCodes
                    : qrCodeData.hashCodes
                }`}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-center mb-4 text-sm text-gray-600">
              Este QR Code levará para uma página onde a pessoa que encontrou
              seu pet poderá compartilhar sua localização e entrar em contato
              com você.
            </p>
            <p className="text-center mb-4 text-sm font-semibold">
              Código:{" "}
              {Array.isArray(qrCodeData)
                ? qrCodeData[0].hashCodes
                : qrCodeData.hashCodes}
            </p>
            <button
              onClick={downloadQRCode}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
            >
              Baixar QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
