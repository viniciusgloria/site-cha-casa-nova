"use client";
import Image from "next/image";
import { Gift } from "../data/gifts";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import ContributeModal from "./ContributeModal";

interface GiftCardProps {
  gift: Gift;
}

export default function GiftCard({ gift }: GiftCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startAtMessage, setStartAtMessage] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
        <div className="relative h-48 w-full">
          <Image
            src={gift.image}
            alt={gift.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {gift.name}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {gift.description}
          </p>

          {gift.isFixedPrice ? (
            // Layout para produtos com preço fixo
            <div className="mb-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-amber-700 mb-1">
                  R$ {gift.fixedPrice?.toLocaleString("pt-BR")}
                </div>
                <div className="text-sm text-amber-600">Valor aproximado.</div>
              </div>
            </div>
          ) : (
            // Layout para produtos com meta de arrecadação
            <>
              <div className="mb-4">
                <ProgressBar
                  current={gift.raisedAmount}
                  target={gift.targetAmount}
                />
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-emerald-600">
                    {gift.supporters}
                  </span>{" "}
                  apoiadores
                </div>
                <div className="text-sm text-gray-600">
                  Meta:{" "}
                  <span className="font-semibold">
                    R$ {gift.targetAmount.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </>
          )}

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

      {/* Modal renderizado FORA do card */}
      <ContributeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setStartAtMessage(false);
        }}
        giftName={gift.name}
        startAtMessage={startAtMessage}
      />
    </>
  );
}