import { Grid, Paper, Typography, Stack, Box,Chip } from '@mui/material';
import ScrollFadeBackground from '@/components/ScrollFadeBackground';

export default function HomePage() {
  return (
    <>
      {/* Fading background image behind content */}
      <ScrollFadeBackground src="/berry_college.webp" start={40} end={500} blur={0} />

      {/* HERO: full viewport height to ensure scroll into next section */}
      <Box
        component="section"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1, // keep above the background
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Hi, I’m Mereck McGowan.
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mb: 3 }}>
            I’m a software engineer who enjoys building clean UIs, reliable backends, and tinkering with hardware projects.
            This site showcases select work, experiments, and ways to reach me.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2, border: '1px solid', borderColor: 'rgba(255,255,255,0.08)' }}>
                <Typography variant="h6" gutterBottom>What I do</Typography>
                <Typography variant="body2" color="text.secondary">
                  Frontend (React/Next), backend APIs, data pipelines, and cloud deployment with a focus on performance and DX.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2, border: '1px solid', borderColor: 'rgba(255,255,255,0.08)' }}>
                <Typography variant="h6" gutterBottom>Currently</Typography>
                <Typography variant="body2" color="text.secondary">
                  Building full-stack apps, experimenting with realtime UX, and refining developer tooling.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* EDUCATION: placed after hero so the page scrolls */}
      <Box
        component="section"
        sx={{ py: 8, position: 'relative', zIndex: 1 }}
      >
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <Typography variant="overline" sx={{ letterSpacing: 1.5, color: 'text.secondary' }}>
            Education
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            Academic Background
          </Typography>
        </Stack>

        <Paper sx={{ p: 3,mb:3, border: '1px solid', borderColor: 'rgba(255,255,255,0.08)', maxWidth: 800 }}>
          <Typography variant="h6" gutterBottom>
            B.S. in Computer Science
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Berry College — Expected 2026
          </Typography>
          
          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
            <Chip label="Algorithms" size="small" variant="outlined" />
            <Chip label="Operating Systems" size="small" variant="outlined" />
            <Chip label="Databases" size="small" variant="outlined" />
            <Chip label="Data Structures and Algorithms" size="small" variant="outlined" />
            <Chip label="Machine Learning" size="small" variant="outlined" />
          </Stack>
        </Paper>
        <Typography variant="h4" fontWeight={700}>
            Extra Curiculars 
          </Typography>
        <Paper sx={{ p: 3, mt:3,border: '1px solid', borderColor: 'rgba(255,255,255,0.08)', maxWidth: 800 }}>
          <Typography variant="h6" gutterBottom>
            Computer Science Club 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Club President — 2024 - 2026
          </Typography>
          
        </Paper>


      </Box>

      {/*  tiny spacer for extra scroll  */}
      <Box sx={{ height: 120 }} />
    </>
  );
}
