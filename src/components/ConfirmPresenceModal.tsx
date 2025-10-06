"use client";

import { useState } from "react";

export default function ConfirmPresenceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "success" | null; text: string | null }>({
    type: null,
    text: null,
  });
  const [sending, setSending] = useState(false);

  const open = () => {
    setMessage({ type: null, text: null });
    setIsOpen(true);
  };

  const close = () => {
    if (sending) return;
    setIsOpen(false);
    setName("");
    setMessage({ type: null, text: null });
  };

  const handleSend = async () => {
    if (!name.trim()) {
      setMessage({ type: "error", text: "Por favor, preencha seu nome para confirmar presença." });
      return;
    }

    try {
      setSending(true);
      const url = `${process.env.NEXT_PUBLIC_SHEET_WEBAPP_URL}?sheet=presencas&name=${encodeURIComponent(
        name
      )}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.ok) {
        setMessage({
          type: "success",
          text: "Sua presença está confirmada, ficaremos felizes em te receber!",
        });
        setName("");
      } else {
        setMessage({ type: "error", text: "Houve um problema, tente novamente." });
      }
    } catch {
      setMessage({ type: "error", text: "Erro de conexão, tente novamente mais tarde." });
    } finally {
      setSending(false);
    }
  };

  const whatsappDoubtsUrl =
    "https://wa.me/5548999989455?text=Oi,%20eu%20tenho%20uma%20d%C3%BAvida%20sobre%20o%20Ch%C3%A1%20de%20Casa%20Nova!";

  return (
    <>
      <button
        onClick={open}
        className="inline-block bg-white font-semibold py-3.5 px-9 rounded-xl text-xl transition-all hover:scale-105 hover:shadow-lg"
        style={{ color: "#1e5175" }}
      >
        Confirmar Presença
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={close} />
          <div className="relative z-10 w-full max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start justify-between mb-6">
              <h3 className="font-display text-3xl font-bold text-[#113C58]">Eu vou participar!</h3>
              <button onClick={close} className="text-lg text-gray-500 hover:text-gray-700">
                Fechar
              </button>
            </div>

            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="name">
              Insira seu nome:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3.5 mb-4 focus:outline-none focus:ring-2 focus:ring-[#113C58] text-black placeholder-black"
              placeholder="Digite seu nome"
            />

            {message.text && (
              <p
                className={`${
                  message.type === "error" ? "text-red-600" : "text-[#113C58]"
                } text-lg mb-4`}
              >
                {message.text}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-3">
              <button
                onClick={handleSend}
                disabled={sending}
                className="flex-1 bg-[#F2B441] text-white font-semibold py-3.5 px-6 rounded-lg transition-colors hover:brightness-95 disabled:opacity-70"
              >
                {sending ? "Enviando..." : "Enviar"}
              </button>
              <a
                href={whatsappDoubtsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-transparent text-[#113C58] border border-[#113C58] font-semibold py-3.5 px-6 rounded-lg transition-colors hover:bg-gray-50"
              >
                Tirar Dúvidas
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}