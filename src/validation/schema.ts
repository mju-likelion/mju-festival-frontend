import * as yup from 'yup';
import { boothValidationMessages, loginValidationMessages } from './messages';

export const loginSchema = yup.object().shape({
  id: yup.string().required(loginValidationMessages.ID_REQUIRED),
  password: yup.string().required(loginValidationMessages.PASSWORD_REQUIRED),
});

export const boothSchema = yup.object().shape({
  name: yup.string().required(boothValidationMessages.REQUIRED).max(100, boothValidationMessages.NAME_MAX_LENGTH),
  description: yup.string().required(boothValidationMessages.REQUIRED).max(4000, boothValidationMessages.DESCRIPTION_MAX_LENGTH),
  location: yup.string().required(boothValidationMessages.REQUIRED).max(100, boothValidationMessages.LOCATION_MAX_LENGTH),
});
