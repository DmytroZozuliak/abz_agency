import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import { Field, useFormik } from 'formik';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { fetchPositions, fetchUsers, postForm } from '../../store/ActionCreators/ActionCreators';
import validationSchema from '../../utils/validationScema';
import classes from './PostRequest.module.scss';

export const inputFields = ['name', 'email', 'phone'];

export interface IInitialFormValues {
  name: string;
  email: string;
  phone: string;
  file: null;
  position: string;
}
const uploadFileText = 'Upload your photo';

const PostRequest = forwardRef<HTMLDivElement>((props, ref) => {
  const { isLoadingPositions, errorPositions, positions, token } = useTypedSelector(
    (state) => state.apiSlice
  );
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
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(),
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: IInitialFormValues) {
    console.log('values', values);

    const formData = new FormData(); // file from input type='file'
    formData.append('position_id', values.position);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('photo', values.file as unknown as File);

    const postOptions = {
      formData,
      token,
    };

    await dispatch(postForm(postOptions));

    // try {

    //   .unwrap()
    //   .then((res: { token: string }) => {
    //     const { id } = jwt<{ id: string }>(res.token);
    //     dispatch(setToken({ isLogged: true, id }));
    //     localStorage.setItem('token-rss', res.token);
    //   });
    // dispatch(openSuccessSnack(t('forms.auth.success')));
    // } catch (e) {}
    formik.resetForm();
    setFileName(uploadFileText);

    await dispatch(fetchUsers(1));
  }

  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <Container maxWidth="lg">
      <Box ref={ref} className={classes.container}>
        <Typography id="post-request" variant="h1" component="h2" marginBottom="50px">
          Working with POST request
        </Typography>

        <form className={classes.boxWrapper} onSubmit={formik.handleSubmit}>
          <TextField
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
      </Box>
    </Container>
  );
});

export default PostRequest;
