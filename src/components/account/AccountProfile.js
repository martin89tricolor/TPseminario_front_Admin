import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import axios from 'axios';

function AccountProfile ({onAvatarChange, ...props}) {

  function handleFileChange(e) {
    const formData = new FormData()
    formData.append("files", e.target.files[0]);
    axios.post('/utils/avatar-upload', formData, {
      headers: {"Content-Type": "multipart/form-data"}
    })
    .then((res) => {
      onAvatarChange(res.data.url);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={props.user.avatar}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {`${props.user.comertialName}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('HH:mm')}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          component="label"
        >
          Cargar Foto
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
      </CardActions>
    </Card>
  );
}

export default AccountProfile;
