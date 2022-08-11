import { LoadingButton } from '@mui/lab';
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { IInitialFormValues } from '../../interfaces/interfaces';
import { fetchUsers, postUser } from '../../store/ActionCreators/ActionCreators';
import { openErrorSnack, openSuccessSnack } from '../../store/slices/snackSlice';
import validationSchema from '../../utils/validationScema';
import classes from './Form.module.scss';

export const inputFields = ['name', 'email', 'phone'];

const uploadFileText = 'Upload your photo';

const Form = () => {
  const { isLoadingPositions, positions } = useTypedSelector((state) => state.positions);
  const dispatch = useTypedDispatch();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    file: null,
    position: '',
  };

  const [fileName, setFileName] = useState(uploadFileText);

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
      const response = await dispatch(postUser(formData)).unwrap();
      dispatch(openSuccessSnack(response.message));
      formik.resetForm();
      setFileName(uploadFileText);
      dispatch(fetchUsers(1));
    } catch (err) {
      const error = err as string;
      dispatch(openErrorSnack(error));
    }
  }

  return (
    <form className={classes.boxWrapper} onSubmit={formik.handleSubmit}>
      <TextField
        color="secondary"
        fullWidth
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
        color="secondary"
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
        sx={{ marginBottom: '17px' }}
        color="secondary"
        id="phone"
        name="phone"
        label="Phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={(formik.touched.phone && formik.errors.phone) || '+38 (XXX) XXX - XX - XX'}
      />

      <FormControl
        sx={{
          paddingBottom: '40px',
        }}
      >
        <Typography mb="10px">Select your position</Typography>
        {isLoadingPositions && <CircularProgress />}
        {positions && (
          <>
            <RadioGroup
              aria-labelledby="position-label"
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
              className={classes.radios}
            >
              {positions.map((position) => (
                <FormControlLabel
                  key={position.id}
                  value={position.id}
                  sx={{
                    marginLeft: 0,
                    marginBottom: '7px',
                  }}
                  control={
                    <Radio
                      color="secondary"
                      sx={{
                        padding: 0,
                        paddingRight: '12px',
                        '& .MuiSvgIcon-root': {
                          fontSize: '21px',
                        },
                      }}
                    />
                  }
                  label={position.name}
                />
              ))}
            </RadioGroup>
            {formik.touched.position && formik.errors.position && (
              <FormHelperText
                sx={{
                  position: 'absolute',
                  left: 0,
                  bottom: '28px',
                }}
                error={true}
              >
                {formik.errors.position}
              </FormHelperText>
            )}
          </>
        )}
      </FormControl>

      <FormControl>
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
        <Box className={classes.upload}>
          <Box
            component="label"
            htmlFor="fileUpload"
            sx={{
              border: 1,
              borderColor:
                formik.touched.file && Boolean(formik.errors.file) ? 'error.main' : 'text.main',
              borderTopLeftRadius: '4px',
              borderBottomLeftRadius: '4px',
            }}
          >
            Upload
          </Box>
          <Box
            sx={{
              border: 1,
              borderLeft: 0,
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px',
              borderColor:
                formik.touched.file && Boolean(formik.errors.file)
                  ? 'error.main'
                  : 'text.secondary',
              color: uploadFileText === fileName ? 'text.secondary' : 'text.main',
            }}
          >
            {fileName}
          </Box>
        </Box>

        {formik.touched.file && Boolean(formik.errors.file) && (
          <FormHelperText
            id="file-helper-text"
            error={true}
            sx={{
              position: 'absolute',
              left: 0,
              bottom: '28px',
            }}
          >
            {formik.errors.file}
          </FormHelperText>
        )}
      </FormControl>

      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        sx={{ width: '100px', height: '34px', alignSelf: 'center' }}
        disabled={!formik.dirty}
      >
        Sign up
      </LoadingButton>
    </form>
  );
};

export default Form;
