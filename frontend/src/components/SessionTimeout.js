import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ModalExpiracion from "./ModalExpiracion";

const SessionTimeout = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const avisoRef = useRef(null);
  const cierreRef = useRef(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  const iniciarTemporizadores = useCallback(() => {
    clearTimeout(avisoRef.current);
    clearTimeout(cierreRef.current);

    avisoRef.current = setTimeout(() => setShowModal(true), 12 * 60 * 1000);
    cierreRef.current = setTimeout(() => handleLogout(), 15 * 60 * 1000);
  }, [handleLogout]);

  const continuarSesion = () => {
    setShowModal(false);
    iniciarTemporizadores();
  };

  useEffect(() => {
    iniciarTemporizadores();
    return () => {
      clearTimeout(avisoRef.current);
      clearTimeout(cierreRef.current);
    };
  }, [iniciarTemporizadores]);

  return (
    <ModalExpiracion
      visible={showModal}
      onContinuar={continuarSesion}
      onSalir={handleLogout}
    />
  );
};

export default SessionTimeout;
