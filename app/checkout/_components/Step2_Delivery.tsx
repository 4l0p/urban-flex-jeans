"use client";

import { useState, useEffect } from "react";

interface Address {
  id: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  recipient: string;
}

interface Step2Props {
  currentStep: number;
  completeStep: () => void;
  address: any;
  setAddress: (data: any) => void;
  shippingMethod: "free" | "express";
  setShippingMethod: (method: "free" | "express") => void;
  goToStep: (step: number) => void;
  clientName: string;
}

export default function Step2_Delivery({
  currentStep,
  completeStep,
  address,
  setAddress,
  shippingMethod,
  setShippingMethod,
  goToStep,
  clientName,
}: Step2Props) {
  const [view, setView] = useState<"list" | "form">("form");
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  const [formData, setFormData] = useState<Address>({
    id: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    recipient: clientName || "",
  });

  useEffect(() => {
    if (clientName) {
      setFormData((prev) => ({ ...prev, recipient: clientName }));
    }
  }, [clientName]);

  const [loadingCep, setLoadingCep] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});

  const validators = {
    cep: (value: string) => value.replace(/\D/g, "").length === 8,
    street: (value: string) => value.trim().length > 0,
    number: (value: string) => value.trim().length > 0,
    neighborhood: (value: string) => value.trim().length > 0,
    city: (value: string) => value.trim().length > 0,
    state: (value: string) => value.trim().length > 0,
    recipient: (value: string) => value.trim().length >= 2,
    complement: () => true,
  };

  const handleChange = (field: keyof Address, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const isValid = validators[field as keyof typeof validators]
        ? validators[field as keyof typeof validators]!(value)
        : true;
      setErrors((prev: any) => ({ ...prev, [field]: !isValid }));
    }
  };

  const handleBlur = (field: keyof Address) => {
    setTouched((prev: any) => ({ ...prev, [field]: true }));
    const isValid = validators[field as keyof typeof validators]
      ? validators[field as keyof typeof validators]!(formData[field] || "")
      : true;
    setErrors((prev: any) => ({ ...prev, [field]: !isValid }));
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2");

    setFormData((prev) => ({ ...prev, cep: value }));

    if (touched.cep) {
      const isValid = value.replace(/\D/g, "").length === 8;
      setErrors((prev: any) => ({ ...prev, cep: !isValid }));
    }

    if (value.replace(/\D/g, "").length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(
          `https://viacep.com.br/ws/${value.replace(/\D/g, "")}/json/`,
        );
        const data = await res.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
            cep: value,
          }));

          setTouched((prev: any) => ({
            ...prev,
            street: true,
            neighborhood: true,
            city: true,
            state: true,
            cep: true,
          }));
          setErrors((prev: any) => ({
            ...prev,
            street: false,
            neighborhood: false,
            city: false,
            state: false,
            cep: false,
          }));
        } else {
          setErrors((prev: any) => ({ ...prev, cep: true }));
        }
      } catch (error) {
        setErrors((prev: any) => ({ ...prev, cep: true }));
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleEditAddress = (addr: Address, e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData(addr);
    setTouched({
      cep: true,
      street: true,
      number: true,
      neighborhood: true,
      city: true,
      state: true,
      complement: true,
      recipient: true,
    });
    setErrors({});
    setView("form");
  };

  const handleDeleteAddress = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newList = savedAddresses.filter((addr) => addr.id !== id);
    setSavedAddresses(newList);
    if (selectedAddressId === id) setSelectedAddressId(null);
    if (newList.length === 0) setView("form");
  };

  const handleSaveAddress = () => {
    const cepValid = validators.cep(formData.cep);
    const streetValid = validators.street(formData.street);
    const numberValid = validators.number(formData.number);
    const recipientValid = validators.recipient(formData.recipient);

    setTouched({
      cep: true,
      street: true,
      number: true,
      neighborhood: true,
      city: true,
      state: true,
      complement: true,
      recipient: true,
    });

    setErrors({
      cep: !cepValid,
      street: !streetValid,
      number: !numberValid,
      neighborhood: false,
      city: false,
      state: false,
      recipient: !recipientValid,
    });

    if (!cepValid || !streetValid || !numberValid || !recipientValid) {
      return;
    }

    let newList = [...savedAddresses];
    let savedId = formData.id;

    const existingIndex = savedAddresses.findIndex(
      (addr) => addr.id === formData.id,
    );

    if (existingIndex >= 0) {
      newList[existingIndex] = formData;
    } else {
      const newAddress = { ...formData, id: Date.now().toString() };
      savedId = newAddress.id;
      if (newList.length >= 2) newList.shift();
      newList.push(newAddress);
    }

    setSavedAddresses(newList);
    setSelectedAddressId(savedId);
    setAddress(formData);
    setView("list");

    setFormData({
      id: "",
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      recipient: clientName || "",
    });
    setTouched({});
    setErrors({});
  };

  const RenderCheckIcon = () => (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-in fade-in zoom-in duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  // 1. ESTADO FECHADO (RESUMO FINAL)
  if (currentStep > 2) {
    const activeAddr =
      savedAddresses.find((a) => a.id === selectedAddressId) || address;
    return (
      <div className="bg-card border border-border rounded-2xl p-6 flex items-start justify-between transition-all mt-4">
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="black"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-foreground text-sm uppercase mb-1 pt-1">
              Entrega
            </h3>
            <div className="text-muted-foreground text-sm space-y-0.5">
              {activeAddr && activeAddr.street ? (
                <>
                  <p className="text-foreground font-medium">
                    {activeAddr.street}, {activeAddr.number}
                  </p>
                  <p>
                    {activeAddr.neighborhood} - {activeAddr.city}/
                    {activeAddr.state}
                  </p>
                  <p>{activeAddr.cep}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Destinatário:{" "}
                    <span className="text-foreground">
                      {activeAddr.recipient}
                    </span>
                  </p>
                </>
              ) : (
                <p>Endereço selecionado</p>
              )}
              <p
                className={
                  shippingMethod === "free"
                    ? "text-green-500 font-bold mt-2 text-xs"
                    : "text-sky-500 font-bold mt-2 text-xs"
                }
              >
                {shippingMethod === "free"
                  ? "Frete Grátis"
                  : "SEDEX Expresso - R$ 14,90"}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => goToStep(2)}
          className="p-2 hover:bg-muted rounded-full group transition-colors mt-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-muted-foreground group-hover:text-sky-500 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
    );
  }

  // 2. ESTADO INATIVO
  if (currentStep < 2) {
    return (
      <div className="bg-card border border-border rounded-2xl p-5 mt-4 opacity-50 grayscale select-none pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-background border border-border text-foreground flex items-center justify-center text-xs font-bold">
            2
          </div>
          <h2 className="text-foreground font-bold text-sm tracking-wide uppercase">
            Entrega
          </h2>
        </div>
      </div>
    );
  }

  // 3. ESTADO ATIVO
  return (
    <div
      className={`bg-card border rounded-2xl overflow-hidden transition-all duration-300 mt-4 ${
        currentStep === 2
          ? "border-sky-500 ring-1 ring-sky-500/20 shadow-xl shadow-sky-900/10"
          : "border-border"
      }`}
    >
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-background border border-border text-foreground flex items-center justify-center text-xs font-bold shadow-inner">
            2
          </div>
          <h2 className="text-foreground font-bold text-sm tracking-wide uppercase">
            Entrega
          </h2>
        </div>
      </div>

      <div className="p-5">
        {/* --- MODO LISTA DE ENDEREÇOS --- */}
        {view === "list" && savedAddresses.length > 0 ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
            {savedAddresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => {
                  setSelectedAddressId(addr.id);
                  setAddress(addr);
                }}
                className={`relative p-5 rounded-xl border cursor-pointer transition-all flex items-start gap-4 group ${
                  selectedAddressId === addr.id
                    ? "bg-sky-500/10 border-sky-500"
                    : "bg-background border-border hover:border-muted-foreground"
                }`}
              >
                {/* Ícone de Seleção */}
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    selectedAddressId === addr.id
                      ? "border-sky-500"
                      : "border-muted-foreground"
                  }`}
                >
                  {selectedAddressId === addr.id && (
                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-full"></div>
                  )}
                </div>

                {/* Conteúdo do Card */}
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      {addr.street}, {addr.number} - {addr.neighborhood}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      CEP {addr.cep} - {addr.city}/{addr.state}
                    </p>
                    {addr.complement && (
                      <p className="text-muted-foreground text-[11px] mt-0.5">
                        Comp: {addr.complement}
                      </p>
                    )}
                    <p className="text-muted-foreground text-xs mt-1">
                      Destinatário:{" "}
                      <span className="text-foreground font-medium">
                        {addr.recipient}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Ícones de Ação */}
                <div className="flex flex-col gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleEditAddress(addr, e)}
                    className="text-muted-foreground hover:text-sky-400 transition-colors"
                    title="Editar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleDeleteAddress(addr.id, e)}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                    title="Excluir"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                setFormData({
                  id: "",
                  cep: "",
                  street: "",
                  number: "",
                  complement: "",
                  neighborhood: "",
                  city: "",
                  state: "",
                  recipient: clientName || "",
                });
                setTouched({});
                setErrors({});
                setView("form");
              }}
              className="text-xs text-sky-500 font-bold hover:text-sky-400 flex items-center gap-1 mt-2 transition-colors"
            >
              + Novo endereço
            </button>

            {/* SELEÇÃO FRETE */}
            <div className="pt-6 mt-4 border-t border-border">
              <p className="text-[11px] text-muted-foreground mb-3 uppercase font-bold tracking-wider">
                Escolha a entrega:
              </p>
              <div
                onClick={() => setShippingMethod("free")}
                className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all mb-3 ${
                  shippingMethod === "free"
                    ? "bg-sky-500/10 border-green-500"
                    : "bg-background border-border hover:border-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      shippingMethod === "free"
                        ? "border-green-500"
                        : "border-muted-foreground"
                    }`}
                  >
                    {shippingMethod === "free" && (
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-foreground block">
                      Frete Grátis
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      7 a 15 dias úteis
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-500">Grátis</span>
              </div>
              <div
                onClick={() => setShippingMethod("express")}
                className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                  shippingMethod === "express"
                    ? "bg-sky-500/10 border-sky-500"
                    : "bg-background border-border hover:border-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      shippingMethod === "express"
                        ? "border-sky-500"
                        : "border-muted-foreground"
                    }`}
                  >
                    {shippingMethod === "express" && (
                      <div className="w-2.5 h-2.5 bg-sky-500 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-foreground block">
                      SEDEX Expresso
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      2 a 5 dias úteis
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground">
                  R$ 14,90
                </span>
              </div>
            </div>

            <button
              onClick={completeStep}
              className="group relative w-full mt-6 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-sky-500 hover:to-blue-600 text-white font-bold py-4 rounded-lg uppercase tracking-widest shadow-lg shadow-sky-900/20 transform active:scale-[0.98] transition-all flex items-center justify-center"
            >
              <span className="text-sm">CONTINUAR</span>
              <div className="absolute right-6 flex items-center group-hover:translate-x-1 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </button>
          </div>
        ) : (
          /* --- MODO FORMULÁRIO --- */
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            {savedAddresses.length > 0 && (
              <button
                onClick={() => setView("list")}
                className="mb-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                ← Voltar para lista
              </button>
            )}

            {/* CEP */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">
                CEP
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="00000-000"
                  maxLength={9}
                  className={`w-full h-12 bg-background border rounded-lg px-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all
                  ${
                    touched.cep && !errors.cep
                      ? "border-green-500 focus:border-green-500"
                      : ""
                  }
                  ${
                    touched.cep && errors.cep
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-sky-500"
                  }
                  `}
                  value={formData.cep}
                  onChange={handleCepChange}
                  onBlur={() => handleBlur("cep")}
                />
                {loadingCep && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-sky-500 animate-pulse">
                    BUSCANDO...
                  </span>
                )}
                {!loadingCep && touched.cep && !errors.cep && (
                  <RenderCheckIcon />
                )}
                {touched.cep && errors.cep && (
                  <p className="absolute -bottom-4 right-0 text-[9px] text-red-500 font-bold uppercase tracking-wide animate-pulse">
                    informe um cep válido
                  </p>
                )}
              </div>
            </div>

            {formData.street && (
              <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">
                    Endereço
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled
                      value={formData.street}
                      className="w-full h-12 bg-muted/20 border border-green-500/30 rounded-lg px-4 text-sm text-muted-foreground cursor-not-allowed"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">
                      Número
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        className={`w-full h-12 bg-background border rounded-lg px-4 text-sm text-foreground outline-none transition-all
                            ${
                              touched.number && !errors.number
                                ? "border-green-500 focus:border-green-500"
                                : ""
                            }
                            ${
                              touched.number && errors.number
                                ? "border-red-500 focus:border-red-500"
                                : "border-border focus:border-sky-500"
                            }
                        `}
                        value={formData.number}
                        onChange={(e) => handleChange("number", e.target.value)}
                        onBlur={() => handleBlur("number")}
                      />
                      {touched.number && !errors.number && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 animate-in fade-in zoom-in">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      {touched.number && errors.number && (
                        <p className="absolute -bottom-4 left-0 text-[9px] text-red-500 font-bold uppercase tracking-wide">
                          Obrigatório
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-3 space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">
                      Complemento
                    </label>
                    <input
                      type="text"
                      placeholder="Opcional"
                      className="w-full h-12 bg-background border border-border rounded-lg px-4 text-sm text-foreground focus:border-sky-500 outline-none"
                      value={formData.complement}
                      onChange={(e) =>
                        handleChange("complement", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">
                      Bairro
                    </label>
                    <input
                      type="text"
                      disabled
                      value={formData.neighborhood}
                      className="w-full h-12 bg-muted/20 border border-border rounded-lg px-4 text-sm text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">
                      Cidade
                    </label>
                    <input
                      type="text"
                      disabled
                      value={`${formData.city} - ${formData.state}`}
                      className="w-full h-12 bg-muted/20 border border-border rounded-lg px-4 text-sm text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">
                    Destinatário
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Nome de quem vai receber"
                      className={`w-full h-12 bg-background border rounded-lg px-4 text-sm text-foreground outline-none transition-all
                                ${
                                  touched.recipient && !errors.recipient
                                    ? "border-green-500 focus:border-green-500"
                                    : ""
                                }
                                ${
                                  touched.recipient && errors.recipient
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-border focus:border-sky-500"
                                }
                            `}
                      value={formData.recipient}
                      onChange={(e) =>
                        handleChange("recipient", e.target.value)
                      }
                      onBlur={() => handleBlur("recipient")}
                    />
                    {touched.recipient && !errors.recipient && (
                      <RenderCheckIcon />
                    )}
                    {touched.recipient && errors.recipient && (
                      <p className="absolute -bottom-4 right-0 text-[9px] text-red-500 font-bold uppercase tracking-wide animate-pulse">
                        Informe o Destinatário
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSaveAddress}
                  className="w-full mt-4 h-12 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg uppercase tracking-wider text-xs transition-colors shadow-lg"
                >
                  {formData.id ? "Atualizar Endereço" : "Salvar Endereço"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
