'use client';

import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import PdfViewer from '@/components/PDFViewer';

const items = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mereck-mcgowan-3b68232b6/' },
  { label: 'GitHub', href: 'https://github.com/mereck600' },
];
//let width = document.documentElement.clientWidth || document.body.clientWidth;

export default function ContactPage() {

  const handleClick = (item) => {
    if (item.href?.startsWith('http')) {
      window.open(item.href, '_blank');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        textAlign: 'center',
      }}
    >

      {/* TITLE */}
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Contact
      </Typography>

      {/* DESCRIPTION */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 600, mb: 4 }}
      >
        The fastest way to reach me is through LinkedIn. You can also find my resume and social links below.
      </Typography>

      {/* BUTTONS */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ maxWidth: 500, mb: 6 }} // 🔥 keeps them centered & not too wide
      >
        {items.map((it) => (
          <Grid item xs={12} key={it.label}>
            <Paper sx={{ p: 1 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleClick(it)}
              >
                {it.label}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* RESUME (WIDER) */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',   
          mb: 10,
        }}
      >
        <PdfViewer
          src="/Mereck_McGowan_Resume_2.pdf"
          title="Resume"
        />
      </Box>

    </Box>
  );
}