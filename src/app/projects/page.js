import { Grid, Typography } from '@mui/material';
import ProjectCard from '@/components/ProjectCard';


const projects = [

{
title: 'Reinforcement911',
description: 'Nonprofit website with Stripe donations, Dockerized deploys, and AWS infra.',
href: 'https://reinforcement911.org',
tags: ['Next.js', 'Stripe', 'AWS'],
tilt: { x: -6, y: 10 },
},
{
title: 'Northland Psychological',
description: 'Psychological Clinic website with Dockerized deploys, and AWS infra.',
href: 'https://northlandpsychological.com/',
tags: ['React.js', 'Stripe', 'AWS'],
tilt: { x: -6, y: 10 },
},
{
title: 'Reinforcement Consulting',
description: 'Consulting website with Dockerized deploys, and AWS infra.',
href: 'https://reinforcement911.org',
tags: ['React.js', 'Stripe', 'AWS'],
tilt: { x: -6, y: 10 },
},
{
title: 'FleetPay Audit',
description: 'ETL + analytics for logistics auditing, heavy SQL and Python data wrangling.',
href: 'https://github.com/',
tags: ['Python', 'PostgreSQL', 'Pandas'],
tilt: { x: 10, y: 6 },
},
{
title: 'Mereckos',
description: 'Simple OS (in progress) fat12 file system, C development',
href: 'https://github.com/Mereck600/MereckOS',
tags: ['ASM', 'C','makeFiles'],
tilt: { x: 10, y: 6 },
},
{
title: 'CaseNetsClassifier',
description: 'Experimental case‑based reasoning with Siamese nets and PyTorch.',
href: 'https://github.com/',
tags: ['PyTorch', 'CBR', 'DL'],
tilt: { x: -9, y: -5 },
},
{
title: 'BluetoothPi',
description: 'Raspberry Pi 5 speaker controller with realtime LED effects and a React dashboard.',
href: 'https://github.com/Mereck600/BluetoothPi',
tags: ['Raspberry Pi', 'FastAPI', 'React'],
tilt: { x: 8, y: -8 },
},
];


export default function ProjectsPage() {
return (
<section>
    <Typography variant="h3" fontWeight={700} gutterBottom>Projects</Typography>
    <Grid container spacing={2}>
        {projects.map((p) => (
        <Grid item xs={12} sm={6} md={4} key={p.title}>
        <ProjectCard project={p} />
    </Grid>
    ))}
    </Grid>
</section>
);
}