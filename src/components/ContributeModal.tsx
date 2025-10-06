"use client";

import { useEffect, useState } from "react";

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftName: string;
  startAtMessage?: boolean;
  onContributeSuccess?: () => void;
  fixedValue?: number; // 🆕 valor fixo (se o presente for direto)
}

export default function ContributeModal({
  isOpen,
  onClose,
  giftName,
  startAtMessage = false,
  onContributeSuccess,
  fixedValue,
}: ContributeModalProps) {
  const [step, setStep] = useState<"options" | "form" | "payment" | "success">(
    "options"
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "Pix" | "Cartão" | "Outro" | "Já contribuiu" | null
  >(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [value, setValue] = useState(fixedValue ? String(fixedValue) : "");
  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [alreadyContributed, setAlreadyContributed] = useState(false);

  const PIX_KEY = "48999989455";
  const MERCADOPAGO_LINK = "https://link.mercadopago.com.br/contribuircomcha";
  const WHATSAPP_LINK =
    "https://wa.me/5548999989455?text=Oi,%20quero%20fazer%20uma%20contribui%C3%A7%C3%A3o%20direta!";

  useEffect(() => {
    if (isOpen) {
      setStep(startAtMessage ? "form" : "options");
      setPaymentMethod(null);
      setAlreadyContributed(false);
      setName("");
      setMessage("");
      setValue(fixedValue ? String(fixedValue) : "");
      setFeedback("");
      setCopied(false);
    }
  }, [isOpen, startAtMessage, fixedValue]);

  const close = () => {
    if (sending) return;
    onClose();
  };

  const handleSend = async () => {
    if (!name.trim() && !message.trim()) {
      setFeedback("Por favor, preencha seu nome ou uma mensagem.");
      return;
    }

    // Mensagem simples
    if (startAtMessage) {
      await sendToSheet({
        method: alreadyContributed ? "Já contribuiu" : "",
        value: "",
        gift: "",
      });
      return;
    }

    // Contribuição com valor
    if (!paymentMethod) {
      setFeedback("Escolha uma forma de pagamento.");
      return;
    }

    if (!value.trim() && paymentMethod !== "Outro") {
      setFeedback("Informe o valor da contribuição.");
      return;
    }

    await sendToSheet({
      method: paymentMethod,
      value: value || "",
      gift: giftName,
    });
  };

  const sendToSheet = async ({
    method,
    value,
    gift,
  }: {
    method: string;
    value: string;
    gift: string;
  }) => {
    try {
      setSending(true);
      const url = `${process.env.NEXT_PUBLIC_SHEET_WEBAPP_URL}?sheet=mensagens&name=${encodeURIComponent(
        (name || "Anônimo").trim()
      )}&message=${encodeURIComponent(
        (message || "").trim()
      )}&method=${encodeURIComponent(method)}&value=${encodeURIComponent(
        value
      )}&gift=${encodeURIComponent(gift)}`;

      const res = await fetch(url, { method: "GET" });
      const data = await res.json();

      if (data.ok) {
        if (onContributeSuccess) onContributeSuccess();
        if (startAtMessage) setStep("success");
        else setStep("payment");
      } else {
        setFeedback("Erro ao salvar a mensagem, tente novamente.");
      }
    } catch {
      setFeedback("Erro de conexão com o banco de dados.");
    } finally {
      setSending(false);
    }
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div className="relative bg-white rounded-xl p-6 w-full max-w-lg shadow-xl z-10 text-black transition-all duration-300">
        {/* Etapa 1 - Escolha do método */}
        {step === "options" && (
          <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">
              Como você quer contribuir?
            </h2>
            <div className="flex flex-col gap-4">
              {["Pix", "Cartão", "Outro"].map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m as any)}
                  className={`py-3 rounded-lg border-2 transition-all ${
                    paymentMethod === m
                      ? "bg-[#113C58] text-white border-[#113C58]"
                      : "border-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => setStep("form")}
                disabled={!paymentMethod}
                className="bg-[#113C58] text-white px-6 py-3 rounded-lg hover:brightness-110 disabled:opacity-70 w-full"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Etapa 2 - Formulário */}
        {step === "form" && (
          <div className="text-center animate-fade-in">
            <h2 className="text-xl font-bold mb-4">
              {startAtMessage
                ? "Deixe uma mensagem para a família:"
                : "Deixe uma mensagem e registre sua contribuição:"}
            </h2>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full border rounded-lg px-3 py-2 mb-3 placeholder-gray-600"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                startAtMessage
                  ? "Sua mensagem:"
                  : "Mensagem para a família (opcional)"
              }
              className="w-full border rounded-lg px-3 py-2 mb-3 placeholder-gray-600"
              rows={3}
            />

            {/* Campo de valor */}
            {!startAtMessage && paymentMethod !== "Outro" && (
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Valor da contribuição (ex: 100)"
                className="w-full border rounded-lg px-3 py-2 mb-3 placeholder-gray-600"
                readOnly={!!fixedValue} // 🆕 bloqueia o campo se for valor fixo
              />
            )}

            {/* Check: já contribuiu */}
            {startAtMessage && (
              <div className="flex items-center gap-2 justify-center mb-4">
                <input
                  type="checkbox"
                  checked={alreadyContributed}
                  onChange={(e) => setAlreadyContributed(e.target.checked)}
                />
                <label className="text-sm text-gray-700">
                  Já fiz minha contribuição.
                </label>
              </div>
            )}

            {/* Link para contribuição direta */}
            {!startAtMessage && paymentMethod === "Outro" && (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-600 text-white py-3 rounded-lg mb-3 hover:bg-green-700 transition"
              >
                Quero fazer uma contribuição direta (opcional).
              </a>
            )}

            {!startAtMessage && (
              <>
                <p className="text-sm text-gray-600 mb-2">
                  Presente: <strong>{giftName}</strong>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Forma de pagamento:{" "}
                  <strong>{paymentMethod || "Não selecionado"}</strong>
                </p>
              </>
            )}

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
                className="flex-1 border border-gray-400 py-3 rounded-lg hover:bg-gray-50 disabled:opacity-70"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Etapa 3 - Pagamento */}
        {step === "payment" && (
          <div className="text-center animate-fade-in">
            {paymentMethod === "Pix" && (
              <>
                <h2 className="text-xl font-bold mb-4">
                  Escaneie o QR Code ou copie a chave Pix:
                </h2>
                <img
                  src="/images/qrcode.jpeg"
                  alt="QR Code Pix"
                  className="mx-auto w-56 h-56 mb-4 rounded-lg shadow"
                />
                <button
                  onClick={copyPixKey}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-black"
                >
                  Copiar chave
                </button>
                {copied && (
                  <p className="text-green-600 mt-2">Chave Pix copiada!</p>
                )}
              </>
            )}

            {paymentMethod === "Cartão" && (
              <>
                <h2 className="text-xl font-bold mb-4">Clique abaixo para ser direcionado ao Mercado Pago:</h2>
                <a
                  href={MERCADOPAGO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 inline-block"
                >
                  Realizar Pagamento 💳
                </a>
              </>
            )}

            <div className="mt-6">
              <button
                onClick={() => setStep("success")}
                className="bg-[#113C58] text-white px-6 py-3 rounded-lg hover:brightness-110"
              >
                Finalizar
              </button>
            </div>
          </div>
        )}

        {/* Etapa 4 - Sucesso */}
        {step === "success" && (
          <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Obrigado!
            </h2>
            <p>Agradecemos novamente a sua participação!</p>
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