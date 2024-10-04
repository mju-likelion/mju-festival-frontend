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
  description: yup
    .string()
    .required(boothValidationMessages.REQUIRED)
    .max(1000, boothValidationMessages.DESCRIPTION_MAX_LENGTH),
});

export const lostItemSchema = yup.object().shape({
  file: yup
    .mixed<File>()
    .test('imgRequired', lostItemValidationMessages.IMG_REQUIRED, (file) => {
      return file instanceof File;
    }),
  title: yup
    .string()
    .required(lostItemValidationMessages.REQUIRED)
    .max(30, lostItemValidationMessages.TITLE_MAX_LENGTH),
  content: yup
    .string()
    .required(lostItemValidationMessages.REQUIRED)
    .max(1000, lostItemValidationMessages.CONTENT_MAX_LENGTH),
});

export const lostItemEditSchema = yup.object().shape({
  file: yup.mixed<File>(),
  title: yup
    .string()
    .required(lostItemValidationMessages.REQUIRED)
    .max(100, lostItemValidationMessages.TITLE_MAX_LENGTH),
  content: yup
    .string()
    .required(lostItemValidationMessages.REQUIRED)
    .max(4000, lostItemValidationMessages.CONTENT_MAX_LENGTH),
});
