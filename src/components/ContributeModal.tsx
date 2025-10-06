"use client";

import { useEffect, useState } from "react";

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftName: string;
  startAtMessage?: boolean; // NOVO
}

export default function ContributeModal({
  isOpen,
  onClose,
  giftName,
  startAtMessage = false,
}: ContributeModalProps) {
  const [step, setStep] = useState<"options" | "pix" | "message" | "success">(
    "options"
  );
  const [paymentMethod, setPaymentMethod] = useState<"Pix" | "Cartão" | null>(
    null
  );
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const PIX_KEY = "48999989455"; // 🔒 chave pix não exibida
  const MERCADOPAGO_LINK =
    "https://link.mercadopago.com.br/contribuircomcha";

  useEffect(() => {
    if (isOpen) {
      setStep(startAtMessage ? "message" : "options");
      setPaymentMethod(null);
      setName("");
      setMessage("");
      setFeedback("");
      setCopied(false);
    }
  }, [isOpen, startAtMessage]);

  const close = () => {
    if (sending) return;
    onClose();
  };

  const confirmPayment = () => {
    if (!paymentMethod) {
      setFeedback("Escolha um método de pagamento antes de continuar.");
      return;
    }
    setStep("message");
    setFeedback("");
  };

  const handleSend = async () => {
    if (!name.trim() && !message.trim()) {
      setFeedback("Preencha nome ou mensagem para enviar.");
      return;
    }

    try {
      setSending(true);
      const url = `${process.env.NEXT_PUBLIC_SHEET_WEBAPP_URL}?sheet=mensagens&name=${encodeURIComponent(
        (name || "Anônimo").trim()
      )}&message=${encodeURIComponent(
        (message || "").trim()
      )}&method=${encodeURIComponent(
        paymentMethod || "Envio direto pelo site."
      )}&gift=${encodeURIComponent(giftName)}`;

      const res = await fetch(url, { method: "GET" });
      const data = await res.json();

      if (data.ok) {
        setStep("success");
        setFeedback("");
        setName("");
        setMessage("");
      } else {
        setFeedback("Erro ao salvar a mensagem, tente novamente.");
      }
    } catch {
      setFeedback("Erro de conexão com a planilha.");
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div className="relative bg-white rounded-xl p-6 w-full max-w-lg shadow-xl z-10">
        {/* Escolha de pagamento */}
        {step === "options" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-black">
              Escolha a forma de pagamento:
            </h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setPaymentMethod("Pix");
                  setStep("pix");
                }}
                className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                Pagar com Pix
              </button>
              <a
                href={MERCADOPAGO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setPaymentMethod("Cartão");
                  setStep("message"); // ✅ cartão pula direto para mensagem
                }}
                className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Pagar com Cartão
              </a>
            </div>
          </div>
        )}

        {/* Pagamento via Pix */}
        {step === "pix" && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4 text-black">
              Escaneie o QR Code ou copie a chave Pix:
            </h2>
            <img
              src="/images/qrcode.jpeg"
              alt="QR Code Pix"
              className="mx-auto w-56 h-56 mb-4 rounded-lg shadow"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(PIX_KEY);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // ✅ desaparece em 2s
              }}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-black"
            >
              Copiar chave
            </button>
            {copied && <p className="text-green-600 mt-2">Chave Pix copiada!</p>}
            <div className="mt-6">
              <button
                onClick={confirmPayment}
                className="bg-[#113C58] text-white px-6 py-3 rounded-lg hover:brightness-110 w-full"
              >
                Pagamento realizado!
              </button>
            </div>
          </div>
        )}

        {/* Mensagem */}
        {step === "message" && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4 text-black">
              Deixe uma mensagem para a família:
            </h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome (opcional)"
              className="w-full border rounded-lg px-3 py-2 mb-3 text-black placeholder-black"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Sua mensagem"
              className="w-full border rounded-lg px-3 py-2 mb-3 text-black placeholder-black"
              rows={3}
            />
            {feedback && <p className="text-red-600 mb-3">{feedback}</p>}
            <div className="flex gap-4">
              <button
                onClick={handleSend}
                disabled={sending}
                className="flex-1 bg-[#F2B441] text-[#113C58] py-3 rounded-lg hover:brightness-105 disabled:opacity-70"
              >
                {sending ? "Enviando..." : "Enviar"}
              </button>
              <button
                onClick={close}
                disabled={sending}
                className="flex-1 border border-gray-400 py-3 rounded-lg hover:bg-gray-50 text-black disabled:opacity-70"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Sucesso */}
        {step === "success" && (
          <div className="text-center text-black">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Obrigado!
            </h2>
            <p>Sua mensagem foi enviada com sucesso.</p>
            <button
              onClick={close}
              className="mt-4 bg-[#113C58] text-white px-6 py-2 rounded-lg hover:brightness-110"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}