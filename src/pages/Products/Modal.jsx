import PropTypes from 'prop-types';

const Modal = ({ isOpen, closeModal }) => {
  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add New Product</p>
          <button className="delete" aria-label="close" onClick={closeModal}></button>
        </header>
      </div>
    </div>
  );
};
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
