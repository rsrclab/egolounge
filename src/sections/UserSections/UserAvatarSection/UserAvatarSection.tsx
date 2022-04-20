import * as S from "./elements";
import { ImageProps } from "next/image";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "~/context";
import { updateUserAvatar } from "~/lib";
import AvatarEditor from "react-avatar-editor";
import { fileToBase64 } from "~/utils";
import * as nsfwjs from "nsfwjs";

const defaultAvatar: ImageProps = {
  src: "/static/img/defaultAvatar.png",
  width: 125,
  height: 125,
  alt: "Default avatar"
};

export const UserAvatarSection: React.FC = ({ ...props }) => {
  const { user, setUserField } = useContext(UserContext);
  const [error, setError] = useState<boolean | string>(false);
  const [scale, setScale] = useState(1);
  const [showEditor, setShowEditor] = useState(false);
  const [editor, setEditor] = useState<AvatarEditor | undefined>(undefined);
  const [uploadedImage, setUploadedImage] = useState("");

  const handleTriggerEditor = async e => {
    error && setError(false);

    if (e.target.files[0]) {
      const imageFile = e.target.files[0];

      const sizeInKb = imageFile.size * 0.001;
      if (sizeInKb <= 100) {
        const imageBase64 = await fileToBase64(imageFile);
        setUploadedImage(imageBase64);
        setShowEditor(true);
      } else {
        setError("Image size must be less than 100Kb");
      }
    }
  };

  const handleOnClickSaveAvatarToDB = async () => {
    if (editor) {
      const model = await nsfwjs.load();
      let isNSFW = false;

      model.classify(editor.getImage()).then(response => {
        const pornPrediction = response.find(x => x.className === "Porn");
        const hentaiPrediction = response.find(x => x.className === "Hentai");

        if (pornPrediction && hentaiPrediction) {
          isNSFW = pornPrediction?.probability > 0.1 || hentaiPrediction?.probability > 0.1;
        }

        if (!isNSFW) {
          editor.getImageScaledToCanvas().toBlob(async (blob: Blob | null) => {
            if (blob) {
              const blobSrc = await updateUserAvatar(user.id, blob);
              setUserField("image", blobSrc as string);
            }
          });
          setShowEditor(false);
          setError("");
        } else {
          setError("NSFW image detected.");
          setShowEditor(false);
        }
      });
    }
  };

  const handleScaleAvatar = e => {
    setScale(e.target.value);
  };

  const setEditorRef = editor => {
    try {
      setEditor(editor);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  return (
    <S.SectionContainer>
      <S.FullInfoContainer {...props}>
        <S.Container>
          {showEditor ? (
            <S.AvatarEditorContainer show={showEditor}>
              <S.ScaleInput
                step='0.01'
                min={1}
                max={2}
                name='scale'
                value={scale}
                onChange={handleScaleAvatar}
              />
              <AvatarEditor
                ref={setEditorRef}
                image={uploadedImage}
                width={125}
                height={125}
                scale={+scale}
                borderRadius={15}
                border={0}
              />
            </S.AvatarEditorContainer>
          ) : (
            <S.UserAvatar {...defaultAvatar} {...(user?.image && { src: user?.image })} />
          )}
        </S.Container>
        <S.InfoContainer>
          <S.Title>Avatar</S.Title>
          <S.MaxSize>100kb Maximum</S.MaxSize>
          <S.EditContainer>
            {showEditor ? (
              <>
                <S.IconContainer>
                  <S.CheckmarkIcon onClick={handleOnClickSaveAvatarToDB} width={20} height={20} />
                </S.IconContainer>
                <S.IconContainer>
                  <S.CloseIcon onClick={handleCloseEditor} width={20} height={20} />
                </S.IconContainer>
              </>
            ) : (
              <S.IconContainer>
                <S.Edit type='file' accept='image/*' onChange={handleTriggerEditor} />
                <S.PencilIcon />
              </S.IconContainer>
            )}
          </S.EditContainer>
        </S.InfoContainer>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.FullInfoContainer>
    </S.SectionContainer>
  );
};
