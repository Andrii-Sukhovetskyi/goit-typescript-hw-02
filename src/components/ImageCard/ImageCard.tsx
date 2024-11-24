import s from "./ImageCard.module.css";
import { Image } from "../../types";

type Props = {
  image: Image;
  openModal: (image: Image) => void;
}


const ImageCard = ({ image, openModal }: Props) => {
  return (
    <div>
      <img className={s.card}
        onClick={() => {
          openModal(image);
        }}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;