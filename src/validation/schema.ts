import * as yup from 'yup';
import {
  boothValidationMessages,
  loginValidationMessages,
  lostItemValidationMessages,
} from './messages';

export const loginSchema = yup.object().shape({
  id: yup.string().required(loginValidationMessages.ID_REQUIRED),
  password: yup.string().required(loginValidationMessages.PASSWORD_REQUIRED),
});

export const boothSchema = yup.object().shape({
  name: yup
    .string()
    .required(boothValidationMessages.REQUIRED)
    .max(100, boothValidationMessages.NAME_MAX_LENGTH),
  description: yup
    .string()
    .required(boothValidationMessages.REQUIRED)
    .max(4000, boothValidationMessages.DESCRIPTION_MAX_LENGTH),
  location: yup
    .string()
    .required(boothValidationMessages.REQUIRED)
    .max(100, boothValidationMessages.LOCATION_MAX_LENGTH),
});

export const lostItemSchema = yup.object().shape({
  file: yup
    .mixed<File>()
    .test('imgRequired', lostItemValidationMessages.IMG_REQUIRED, (file) => {
      return file instanceof File;
    })

    // 파일 validation 프론트 필요 여부 확인
    .test(
      'fileSize',
      lostItemValidationMessages.FILE_SIZE,
      (value) => !value || (value && value.size <= 10 * 1024 * 1024) // 상수화 고민
    )
    .test(
      'fileType',
      lostItemValidationMessages.FILE_TYPE,
      (value) =>
        !value ||
        (value &&
          ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(
            value.type
          ))
      // 상수화 고민
    ),

  title: yup
    .string()
    .required(lostItemValidationMessages.REQUIRED)
    .max(100, lostItemValidationMessages.TITLE_MAX_LENGTH),
  content: yup
    .string()
    .required(lostItemValidationMessages.REQUIRED)
    .max(4000, lostItemValidationMessages.CONTENT_MAX_LENGTH),
});
