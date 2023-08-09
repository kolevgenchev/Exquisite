import { Container, Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#000', color: '#fff', padding: '30px 0', width: '100%', margin: '0' }}>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
          <Box display="flex" flexDirection="column" gap="15px">
            <Typography variant="body1">About Us</Typography>
            <Typography variant="body1">Privacy Policy</Typography>
            <Typography variant="body1">Contact Us</Typography>
          </Box>
          <Typography variant="body1" textAlign="right">Copyright © Exquisite 2023</Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
