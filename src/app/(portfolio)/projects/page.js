import { Box, Typography, Grid } from '@mui/material';
import ProjectCard from '@/components/ProjectCard';
import { desc } from 'framer-motion/client';
import { DescriptionOutlined } from '@mui/icons-material';

const projects = [
  {
    title: 'Reinforcement911',
    description: 'Nonprofit platform with Stripe donations, Dockerized deploys, and AWS infrastructure for a public safety organization.',
    href: 'https://reinforcement911.org',
    tags: ['Next.js', 'Stripe', 'Docker', 'AWS'],
    category: 'Full-Stack',
  },
  {
    title: 'Northland Psychological',
    description: 'Full-stack clinic website with appointment booking, Dockerized deploys, and AWS hosting.',
    href: 'https://northlandpsychological.com/',
    tags: ['Next.js', 'Docker', 'AWS'],
    category: 'Full-Stack',
  },
  {
    title: 'Reinforcement Consulting',
    description: 'Consulting firm website with modern React frontend, Dockerized deploys, and cloud infrastructure.',
    href: 'https://reinforcement911.org',
    tags: ['React.js', 'Docker', 'AWS'],
    category: 'Full-Stack',
  },
  {
    title:'NearBeer',
    description:'Near Beer is a web app to create pub crawls based on users location and preferences.',
    href:'https://github.com/Mereck600/NearBeer',
    tags:['Next.js','MongoDB','Docker'],
    category:'Full-Stack',
  },
  {
    title: 'DelphiShell',
    description: 'C-based Unix shell with a trainable Transformer neural network built-in to translate natural language to bash commands — part of the DelphiOS project.',
    href: 'https://github.com/Mereck600/DelphiShell',
    tags: ['C', 'Python', 'Transformer', 'ML'],
    category: 'ML / Systems',
  },
  {
    title: 'Evala',
    description: 'Custom Java programming language designed to automatically generate test cases and grade student code submissions.',
    href: 'https://github.com/Mereck600/Evala',
    tags: ['Java', 'Compilers', 'PL Design'],
    category: 'Systems',
  },
   {
    title: 'FleetPay Audit',
    description: 'ETL pipeline and analytics dashboard for logistics fleet auditing. Heavy SQL and Python data wrangling built for Mohawk Industries.',
    href: 'https://github.com/mereck600',
    tags: ['Python', 'PostgreSQL', 'Pandas'],
    category: 'Data',
  },
  {
    title: 'Mereckos',
    description: 'Hobby OS with FAT12 filesystem support, bootloader, and memory management written in x86 Assembly and C.',
    href: 'https://github.com/Mereck600/MereckOS',
    tags: ['x86 ASM', 'C', 'Makefile'],
    category: 'Systems',
  },
  {
    title: 'VR Racing Game',
    description: 'Driving Simulator with custom assets, mechanics and maps.',
    href: 'https://github.com/Mereck600/first-unity-project/tree/main',
    tags: ['C','C#','C++'],
    category: 'Game Development',
  },
  {
    title: 'Legends of Atheria',
    description: '2d Zelda inspired game.',
    href: 'https://github.com/Mereck600/2dGame',
    tags: ['Java'],
    category: 'Game Development',
  },
  {
    title: 'Robotic-Arm-Arduino',
    description: 'Simple robotic arm',
    href: 'https://github.com/Mereck600/Robotic-Arm-Arduino',
    tags: ['C++'],
    category: 'Systems',
  },
  {
    title: 'BluetoothPi',
    description: 'Raspberry Pi 5 Bluetooth speaker controller with real-time LED effects and a live React dashboard.',
    href: 'https://github.com/Mereck600/BluetoothPi',
    tags: ['React', 'FastAPI', 'Raspberry Pi'],
    category: 'Systems',
  },
  
];

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

export default function ProjectsPage() {
  return (
    <Box component="section" sx={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <Box sx={{ mb: 8 }}>
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
          Selected Work
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}
        >
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560 }}>
          A selection of things I&apos;ve built — spanning full-stack web apps, systems
          programming, ML research, and hardware projects.
        </Typography>
      </Box>

      {/* Grid */}
      <Grid container spacing={2.5}>
        {projects.map((p) => (
          <Grid item xs={12} sm={6} lg={4} key={p.title}>
            <ProjectCard project={p} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ height: 80 }} />
    </Box>
  );
}
