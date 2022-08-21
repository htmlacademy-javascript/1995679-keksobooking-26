
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadPhotoHandler = (inputElement, previewElement) => {
  inputElement.addEventListener('change', () => {
    const photo = inputElement.files[0];
    const fileName = photo.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewElement.src = URL.createObjectURL(photo);
    }
  });
};

export { uploadPhotoHandler };
