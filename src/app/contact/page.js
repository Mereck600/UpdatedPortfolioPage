import { Grid, Link, Paper, Typography } from '@mui/material';


const items = [
{ label: 'Resume (PDF)', href: '/Mereck_McGowan_Resume.pdf' },
{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/mereck-mcgowan-3b68232b6/' },
{ label: 'GitHub', href: 'https://github.com/mereck600' },
{ label: 'Email', href: 'mailto:mereck@example.com' },
];


export default function ContactPage() {
return (
<section>
<Typography variant="h3" fontWeight={700} gutterBottom>Contact</Typography>
<Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mb: 3 }}>
The fastest way to reach me is email. You can also find my resume and social links below.
</Typography>
<Grid container spacing={2}>
{items.map((it) => (
<Grid item xs={12} sm={6} key={it.label}>
<Paper sx={{ p: 2, border: '1px solid', borderColor: 'rgba(255,255,255,0.08)' }}>
<Link href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} underline="none" color="inherit">
{it.label}
</Link>
</Paper>
</Grid>
))}
</Grid>
</section>
);
}