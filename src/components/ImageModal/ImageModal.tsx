import Modal from "react-modal";
import s from "./ImageModal.module.css";
import { Image } from "../../types";

type Props = {
  modalIsOpen: boolean;
  closeModal: () => void;
  image: Image | null;
}

Modal.setAppElement("#root");

const ImageModal = ({ modalIsOpen, closeModal, image }: Props) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      {image && <img className={s.modalImg} src={image.urls.regular} alt={image.alt_description} />}
    </Modal>
  );
};

export default ImageModal;