// src/components/ModalExpiracion.jsx
import React from 'react';

const ModalExpiracion = ({ visible, onContinuar, onSalir }) => {
  if (!visible) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-warning text-white">
            <h5 className="modal-title"><i className="fas fa-exclamation-triangle me-2"></i>Sesión por expirar</h5>
          </div>
          <div className="modal-body">
            <p>Tu sesión está a punto de expirar en 3 minutos. ¿Deseas continuar?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onSalir}>
              <i className="fas fa-sign-out-alt me-1"></i> Cerrar sesión
            </button>
            <button className="btn btn-primary" onClick={onContinuar}>
              <i className="fas fa-clock me-1"></i> Continuar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalExpiracion;
