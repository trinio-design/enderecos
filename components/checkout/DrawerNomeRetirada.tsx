"use client";

/**
 * Bottom sheet drawer: "Quem vai retirar o pedido?"
 * Exibe campos de Nome e CPF do retirador + botões Atualizar / Cancelar.
 */
export default function DrawerNomeRetirada({
  name = "JOSÉ OLIVEIRA",
  cpf = "093.675.113-99",
  onUpdate,
  onCancel,
}: {
  name?: string;
  cpf?: string;
  onUpdate?: () => void;
  onCancel?: () => void;
}) {
  return (
    <div className="flex w-full flex-col">
      {/* drag handle */}
      <div className="flex items-center justify-center rounded-tl-[12px] rounded-tr-[12px] bg-white pb-2 pt-4">
        <div className="h-[4px] w-[45px] rounded-full bg-gray-200" />
      </div>

      {/* body */}
      <div className="flex flex-col gap-6 bg-white p-6">
        {/* icon */}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(247,158,27,0.16)" }}
        >
          {/* User / Single / Check icon */}
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* person silhouette */}
            <circle cx="19" cy="13" r="6" fill="#F79E1B" />
            <path
              d="M7 32c0-6.627 5.373-12 12-12h0c4.142 0 7.793 2.097 9.95 5.285"
              stroke="#F79E1B"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* check badge */}
            <circle cx="28" cy="29" r="6" fill="#F79E1B" />
            <path
              d="M25 29l2 2 4-4"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* title + fields */}
        <div className="flex flex-col gap-6">
          <h2 className="text-[24px] font-bold leading-tight text-black">
            Quem vai retirar o pedido?
          </h2>

          <div className="flex flex-col gap-3">
            {/* Nome field */}
            <div className="flex flex-col rounded-[4px] bg-gray-100 px-3 py-1">
              <span className="text-[12px] font-bold leading-[16px] text-black">
                Nome
              </span>
              <span className="text-[16px] font-normal leading-[24px] text-black">
                {name}
              </span>
            </div>

            {/* CPF field */}
            <div className="flex flex-col rounded-[4px] bg-gray-100 px-3 py-1">
              <span className="text-[12px] font-bold leading-[16px] text-black">
                CPF
              </span>
              <span className="text-[16px] font-normal leading-[24px] text-black">
                {cpf}
              </span>
            </div>
          </div>
        </div>

        {/* action buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onUpdate}
            className="flex h-12 w-full items-center justify-center rounded-[4px] bg-black text-[16px] font-bold text-white"
          >
            Atualizar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex h-12 w-full items-center justify-center rounded-[4px] bg-gray-100 text-[16px] font-bold text-black"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
