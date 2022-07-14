import * as yup from 'yup';

const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg'];

const validationSchema = () => {
  return yup.object({
    name: yup
      .string()
      .required('username required')
      .test('only letters', 'only letters', (value) => {
        return !/[\&!@#$%\^\*\)\(\[\]\{\}<>,/\/\+\\]/.test(value as string);
      })
      .min(2, 'username should contain 2-60 characters')
      .max(60, 'username should contain 2-60 characters'),
    email: yup.string().trim().required('email required').email('must be a valid email'),
    phone: yup
      .string()
      .trim()
      .required('phone required')
      .test('correct phone', 'required format +38 (XXX) XXX - XX - XX', (value) => {
        return /^[\+]{0,1}380([0-9]{9})$/.test(value as string);
      }),
    file: yup
      .mixed()
      .nullable()
      .required('file required')
      .test('fileSize', 'file too large', (value) => value && value.size <= FILE_SIZE)
      .test(
        'fileFormat',
        'Unsupported Format',
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
    position: yup.string().trim().required('position required'),
  });
};

export default validationSchema;
