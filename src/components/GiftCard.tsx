"use client";
import Image from "next/image";
import { Gift } from "../data/gifts";
import ProgressBar from "./ProgressBar";
import { useState, useEffect } from "react";
import ContributeModal from "./ContributeModal";

interface GiftCardProps {
  gift: Gift;
}

export default function GiftCard({ gift }: GiftCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startAtMessage, setStartAtMessage] = useState(false);
  const [raised, setRaised] = useState(gift.raisedAmount || 0);
  const [supporters, setSupporters] = useState(gift.supporters || 0);
  const [lastDonor, setLastDonor] = useState<string | null>(null);
  const [lastDate, setLastDate] = useState<string | null>(null);
  const [highlight, setHighlight] = useState(false);

  const fetchTotals = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SHEET_WEBAPP_URL}?sheet=totais`);
      const data = await res.json();

      if (data.ok && data.totals && data.totals[gift.name]) {
        const info = data.totals[gift.name];
        if (info.total !== raised) {
          setHighlight(true);
          setTimeout(() => setHighlight(false), 1500);
        }
        setRaised(info.total);
        setSupporters(info.count);
        setLastDonor(info.lastDonor);
        setLastDate(info.lastDate);
      }
    } catch (err) {
      console.error("Erro ao buscar totais:", err);
    }
  };

  useEffect(() => {
    if (!gift.isFixedPrice) {
      fetchTotals();
      const interval = setInterval(fetchTotals, 10000);
      return () => clearInterval(interval);
    }
  }, [gift.name]);

  const getElapsedTime = (dateString: string | null) => {
    if (!dateString) return null;
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
        {/* 🖼️ Imagem ajustada para exibir inteira */}
        <div className="relative w-full bg-white flex items-center justify-center aspect-[4/3]">
          <Image
            src={gift.image}
            alt={gift.name}
            fill
            className="object-contain p-3"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{gift.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{gift.description}</p>

          {/* 🎯 Valor fixo ou meta */}
          {gift.isFixedPrice ? (
            <div className="mb-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-amber-700 mb-1">
                  R$ {gift.fixedPrice?.toLocaleString("pt-BR")}
                </div>
                <div className="text-sm text-amber-600">Valor aproximado.</div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <ProgressBar current={raised} target={gift.targetAmount} />
              </div>

              <div
                className={`flex justify-between items-center mb-2 text-sm text-gray-700 transition-all ${
                  highlight ? "animate-pulse text-emerald-700" : ""
                }`}
              >
                <span>
                  <strong className="text-emerald-600">{supporters}</strong> apoiadores
                </span>
                <span>
                  R$ {raised.toLocaleString("pt-BR")} /{" "}
                  <strong>R$ {gift.targetAmount.toLocaleString("pt-BR")}</strong>
                </span>
              </div>

              {lastDonor && (
                <p className="text-xs text-gray-500 italic mb-3">
                  Última contribuição: {lastDonor} ({getElapsedTime(lastDate)})
                </p>
              )}
            </>
          )}

          {/* Botões */}
          <button
            onClick={() => {
              setStartAtMessage(false);
              setIsModalOpen(true);
            }}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Contribuir
          </button>

          <button
            onClick={() => {
              setStartAtMessage(true);
              setIsModalOpen(true);
            }}
            className="w-full mt-2 bg-[#113C58] hover:brightness-110 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Enviar mensagem à família!
          </button>
        </div>
      </div>

      {/* Modal unificado */}
      <ContributeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setStartAtMessage(false);
        }}
        giftName={gift.name}
        startAtMessage={startAtMessage}
        onContributeSuccess={fetchTotals}
        fixedValue={gift.isFixedPrice ? gift.fixedPrice : undefined}
      />
    </>
  );
}