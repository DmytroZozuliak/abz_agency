import { LoadingButton } from '@mui/lab';
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import {
  fetchPositions,
  fetchUsers,
  getToken,
  IPostRequest,
  usersUrl,
} from '../../store/ActionCreators/ActionCreators';
import { openErrorSnack, openSuccessSnack } from '../../store/slices/snackSlice';
import validationSchema from '../../utils/validationScema';
import classes from './Form.module.scss';

export const inputFields = ['name', 'email', 'phone'];
export interface IInitialFormValues {
  name: string;
  email: string;
  phone: string;
  file: null;
  position: string;
}
const uploadFileText = 'Upload your photo';

const Form = () => {
  const { isLoadingPositions, positions, token } = useTypedSelector((state) => state.apiSlice);
  const dispatch = useTypedDispatch();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    file: null,
    position: '',
  };

  const [fileName, setFileName] = useState(uploadFileText);

  useEffect(() => {
    dispatch(fetchPositions(null));
  }, [dispatch]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(),
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: IInitialFormValues) {
    const formData = new FormData();
    formData.append('position_id', values.position);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('photo', values.file as unknown as File);

    try {
      await axios.post<IPostRequest>(usersUrl, formData, {
        headers: {
          Token: token,
        },
      });
      dispatch(openSuccessSnack('User created'));

      formik.resetForm();
      setFileName(uploadFileText);

      dispatch(fetchUsers(1));
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(getToken(null));
        } else if (error.response.status === 409) {
          dispatch(openErrorSnack('User with this phone or email already exist'));
        } else if (error.response.status === 422) {
          dispatch(openErrorSnack('Validation failed'));
        } else {
          dispatch(openErrorSnack('Could not get data'));
        }
      } else {
        dispatch(openErrorSnack('Could not get data'));
      }
    }
  }

  return (
    <form className={classes.boxWrapper} onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        className={classes.input}
        classes={{
          root: classes.label,
        }}
        id="name"
        name="name"
        label="Your name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        className={classes.input}
        classes={{
          root: classes.label,
        }}
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        className={classes.input}
        classes={{
          root: classes.label,
        }}
        id="phone"
        name="phone"
        label="Phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={(formik.touched.phone && formik.errors.phone) || '+38 (XXX) XXX - XX - XX'}
      />

      <FormControl>
        <Typography>Select your position</Typography>
        {isLoadingPositions && <CircularProgress />}
        {positions && (
          <>
            <RadioGroup
              aria-labelledby="position-label"
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
            >
              {positions.map((position) => (
                <FormControlLabel
                  key={position.id}
                  value={position.id}
                  control={<Radio color="secondary" />}
                  label={position.name}
                />
              ))}
            </RadioGroup>
            {formik.touched.position && formik.errors.position && (
              <FormHelperText error={true}>{formik.errors.position}</FormHelperText>
            )}
          </>
        )}
      </FormControl>

      <input
        id="fileUpload"
        type="file"
        onChange={(e) => {
          e.target.files && e.target.files[0]
            ? setFileName(e.target.files[0].name)
            : setFileName(uploadFileText);
          formik.setFieldValue('file', e.target.files && e.target.files[0]);
        }}
        accept="image/*"
        hidden
        onBlur={formik.handleBlur}
      />
      <label htmlFor="fileUpload">Upload File</label>
      <span>{fileName}</span>

      {formik.touched.file && Boolean(formik.errors.file) ? (
        <FormHelperText id="file-helper-text" error={true}>
          {formik.errors.file}
        </FormHelperText>
      ) : null}

      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        sx={{ width: '120px' }}
        disabled={!formik.dirty}
        // loading={isLoading}
      >
        Sign up
      </LoadingButton>
    </form>
  );
};

export default Form;
