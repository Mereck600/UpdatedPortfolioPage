import { Stack, Typography,Box } from '@mui/material';
import ProjectCard from '@/components/ProjectCard';


const projects = [
{
title: 'DelphiShell',
description: 'C based shell with trainable Transformer based NN built-in to assist users with commands and simple tasks. Shell for DelphiOS',
href: 'https://github.com/Mereck600/DelphiShell',
tags: ['C', 'Python', 'Make'],
tilt: { x: -6, y: 10 },
},
{
title: 'Evala',
description: 'Java based programming language to designed to generate test cases and grade code.',
href: 'https://github.com/Mereck600/Evala',
tags: ['Java'],
tilt: { x: -7, y: 10 },
},
{
title: 'Reinforcement911',
description: 'Nonprofit website with Stripe donations, Dockerized deploys, and AWS infra.',
href: 'https://reinforcement911.org',
tags: ['Next.js', 'Stripe', 'AWS'],
tilt: { x: -5, y: 10 },
},
{
title: 'Northland Psychological',
description: 'Psychological Clinic website with Dockerized deploys, and AWS infra.',
href: 'https://northlandpsychological.com/',
tags: ['React.js', 'Stripe', 'AWS'],
tilt: { x: -6, y: 12 },
},
{
title: 'Reinforcement Consulting',
description: 'Consulting website with Dockerized deploys, and AWS infra.',
href: 'https://reinforcement911.org',
tags: ['React.js', 'Stripe', 'AWS'],
tilt: { x: -3, y: 7 },
},
{
title: 'Mereckos',
description: 'Simple OS (in progress) fat12 file system, C development',
href: 'https://github.com/Mereck600/MereckOS',
tags: ['ASM', 'C','makeFiles'],
tilt: { x: 10, y: 6 },
},
{
title: 'BluetoothPi',
description: 'Raspberry Pi 5 speaker controller with realtime LED effects and a React dashboard.',
href: 'https://github.com/Mereck600/BluetoothPi',
tags: ['Raspberry Pi', 'FastAPI', 'React'],
tilt: { x: 8, y: -8 },
},
{
title: 'FleetPay Audit',
description: 'ETL + analytics for logistics auditing, heavy SQL and Python data wrangling, created for Mohawk Industries.',
href: 'https://github.com/mereck600',
tags: ['Python', 'PostgreSQL', 'Pandas'],
tilt: { x: 10, y: 6 },
},
];





export default function ProjectsPage() {
  return (
    <section>
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
        Projects
      </Typography>

      {/* DESCRIPTION */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 600, mb: 4 }}
      >
        Feel free to check out some of my recent projects!
      </Typography>
      <Stack spacing={3}>
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </Stack>

      </Box>
      
      
     
    </section>
  );
}