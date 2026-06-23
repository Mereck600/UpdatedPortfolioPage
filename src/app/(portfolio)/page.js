import { Box, Typography, Stack, Chip, Grid } from '@mui/material';
import FlyAroundButton from '@/components/FlyAroundButton';

const skills = [
  {
    category: 'Frontend',
    color: '#8b5cf6',
    items: ['React', 'Next.js', 'TypeScript', 'CSS', 'MUI', 'Framer Motion'],
  },
  {
    category: 'Backend',
    color: '#3b82f6',
    items: ['Node.js', 'FastAPI', 'PostgreSQL','MongoDB', 'Docker', 'AWS', 'REST APIs','Java','Python'],
  },
  {
    category: 'ML / AI',
    color: '#22d3ee',
    items: ['Python', 'PyTorch', 'Transformers', 'Scikit-learn', 'Pandas', 'NumPy'],
  },
  {
    category: 'Systems',
    color: '#f59e0b',
    items: ['C','C++', 'x86 Assembly', 'Linux', 'Make'],
  },
];

const education = [
  {
    degree: 'B.S. Computer Science',
    school: 'Berry College',
    period: '2022 – 2026',
    courses: [
      'Algorithms', 'Operating Systems', 'Programming Languages',
      'Databases', 'Data Structures', 'Machine Learning',
      'Artificial Intelligence', 'Web Development', 'Extended Reality',
    ],
  },
];

const activities = [
  { title: 'CS Club President', period: '2024 – 2026', note: "Berry College's Computer Science Club" },
  { title: "Men's Lacrosse", period: '2022 – 2024', note: 'Berry College Student Athlete' },
];

const tagSx = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.72rem',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'text.secondary',
  height: 26,
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <Box
        component="section"
        sx={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.15em',
            mb: 3,
            opacity: 0.9,
          }}
        >
          hello, world i&apos;m ...
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem' },
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            mb: 1,
            background: 'linear-gradient(135deg, #e2e8f0 30%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Mereck
          <br />
          McGowan
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
          {['Full-Stack Developer', 'ML Researcher', 'Systems Engineer'].map((r) => (
            <Box
              key={r}
              sx={{
                px: 1.5,
                py: 0.4,
                border: '1px solid rgba(139,92,246,0.35)',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--accent-purple)',
                background: 'rgba(139,92,246,0.06)',
              }}
            >
              {r}
            </Box>
          ))}
        </Stack>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: 560,
            mb: 5,
            fontSize: '1.05rem',
            lineHeight: 1.8,
          }}
        >
          I build elegant web applications, scalable backend systems, and
          push the boundaries of machine learning research. Currently working on interpertable AI and website consulting.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Box
            component="a"
            href="/projects"
            sx={{
              px: 3,
              py: 1.25,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              color: '#fff',
              fontWeight: 500,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'opacity 0.15s, transform 0.15s',
              '&:hover': { opacity: 0.88, transform: 'translateY(-1px)' },
            }}
          >
            View Projects
          </Box>
          <FlyAroundButton />
          <Box
            component="a"
            href="/contact"
            sx={{
              px: 3,
              py: 1.25,
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'text.primary',
              fontWeight: 500,
              fontSize: '0.9rem',
              textDecoration: 'none',
              background: 'rgba(255,255,255,0.03)',
              transition: 'border-color 0.15s, background 0.15s, transform 0.15s',
              '&:hover': {
                borderColor: 'rgba(139,92,246,0.4)',
                background: 'rgba(139,92,246,0.06)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Contact Me
          </Box>
        </Stack>

        {/* scroll hint */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            opacity: 0.35,
          }}
        >
          <Box
            sx={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, rgba(139,92,246,0), rgba(139,92,246,0.8))',
            }}
          />
        </Box>
      </Box>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <Box component="section" sx={{ py: 10, position: 'relative', zIndex: 1 }}>
        <SectionLabel>Skills &amp; Stack</SectionLabel>
        <Typography variant="h3" sx={{ mb: 6, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
          What I work with
        </Typography>

        <Grid container spacing={3}>
          {skills.map(({ category, color, items }) => (
            <Grid item xs={12} sm={6} key={category}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(8px)',
                  height: '100%',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: `${color}44` },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.72rem',
                    color,
                    letterSpacing: '0.12em',
                    mb: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  {category}
                </Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {items.map((t) => (
                    <Chip key={t} label={t} size="small" variant="outlined" sx={tagSx} />
                  ))}
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ── EDUCATION ────────────────────────────────────────────────────── */}
      <Box component="section" sx={{ py: 10, position: 'relative', zIndex: 1 }}>
        <SectionLabel>Background</SectionLabel>
        <Typography variant="h3" sx={{ mb: 6, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
          Education &amp; Activities
        </Typography>

        {education.map((e) => (
          <Box
            key={e.degree}
            sx={{
              p: 3.5,
              mb: 3,
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.02)',
              maxWidth: 760,
            }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'flex-start' }} mb={1}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{e.degree}</Typography>
              <Typography
                sx={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.78rem',
                  color: 'var(--accent-cyan)',
                  mt: { xs: 0.5, sm: 0 },
                }}
              >
                {e.period}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {e.school}
            </Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {e.courses.map((c) => (
                <Chip key={c} label={c} size="small" variant="outlined" sx={tagSx} />
              ))}
            </Stack>
          </Box>
        ))}

        <Grid container spacing={2} sx={{ maxWidth: 760 }}>
          {activities.map((a) => (
            <Grid item xs={12} sm={6} key={a.title}>
              <Box
                sx={{
                  p: 2.5,
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <Stack direction="column" spacing={0.5} sx={{ mb: 0.5 }}>
                  <Typography variant="body1" fontWeight={600}>{a.title}</Typography>
                  <Typography
                    sx={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.72rem',
                      color: 'var(--accent-purple)',
                    }}
                  >
                    {a.period}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {a.note}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ── RESEARCH ─────────────────────────────────────────────────────── */}
      <Box component="section" sx={{ py: 10, position: 'relative', zIndex: 1 }}>
        <SectionLabel>Research</SectionLabel>
        <Typography variant="h3" sx={{ mb: 6, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
          Publications
        </Typography>

        <Box
          sx={{
            p: 3.5,
            maxWidth: 760,
            border: '1px solid rgba(34,211,238,0.2)',
            borderRadius: '14px',
            background: 'rgba(34,211,238,0.03)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.6), transparent)',
            },
          }}
        >
          {/* Venue badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                px: 1.25, py: 0.35,
                borderRadius: '6px',
                background: 'rgba(34,211,238,0.1)',
                border: '1px solid rgba(34,211,238,0.3)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
                color: 'var(--accent-cyan)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              IJCAI 2026
            </Box>
            <Box
              sx={{
                px: 1.25, py: 0.35,
                borderRadius: '6px',
                background: 'rgba(139,92,246,0.1)',
                border: '1px solid rgba(139,92,246,0.3)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
                color: 'var(--accent-purple)',
                letterSpacing: '0.1em',
              }}
            >
              Accepted ✓
            </Box>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem', mb: 1, lineHeight: 1.4 }}>
            NN-kNN for Regression: Accurate Prediction from Interpretable Retrieval
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              color: 'text.secondary',
              mb: 2,
              lineHeight: 1.7,
            }}
          >
            Xiaomeng Ye, Yu Wang, David Leake, David Crandall, Great Abhieyighan,{' '}
            <Box component="span" sx={{ color: 'var(--accent-cyan)' }}>Mereck McGowan</Box>
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.75, fontSize: '0.875rem' }}>
            Neural Network k-Nearest Neighbor (NN-kNN) was proposed as an interpretable network model
            that learns feature weights and similarity to retrieve relevant cases for classification.
            This paper extends it to regression with the goal of generating accurate predictions based
            on neighboring cases with similar labels. We introduce three modular components: an attention
            mechanism that weights retrieved cases, a locality-aware regularizer that favors label-similar
            neighbors, and an optional case adaptation module. Across synthetic and standard tabular
            regression benchmarks, NN-kNN achieves competitive predictive error against strong baselines
            while providing interpretable label-similar case explanations and supporting manual knowledge
            injection through human-comprehensible feature weights.
          </Typography>

          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }}>
            {['Machine Learning', 'Interpretable AI', 'Case-Based Reasoning', 'Regression', 'Neural Networks'].map((t) => (
              <Chip key={t} label={t} size="small" variant="outlined" sx={tagSx} />
            ))}
          </Stack>
        </Box>
      </Box>

      <Box sx={{ height: 80 }} />
    </>
  );
}

function SectionLabel({ children }) {
  return (
    <Typography
      sx={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.72rem',
        color: 'var(--accent-purple)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        mb: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        '&::before': {
          content: '""',
          display: 'inline-block',
          width: 24,
          height: 1,
          background: 'var(--accent-purple)',
          opacity: 0.6,
        },
      }}
    >
      {children}
    </Typography>
  );
}
