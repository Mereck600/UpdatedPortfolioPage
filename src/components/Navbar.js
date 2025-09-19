'use client';


import NextLink from 'next/link';
import { AppBar, Toolbar, Typography, Stack, Link, Box } from '@mui/material';
import { usePathname } from 'next/navigation';


const links = [
{ href: '/', label: 'Home' },
{ href: '/projects', label: 'Projects' },
{ href: '/contact', label: 'Contact' },
];


export default function Navbar() {
const pathname = usePathname();


return (
<AppBar position="sticky" color="transparent" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
    <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Typography component={NextLink} href="/" variant="subtitle1" sx={{ color: 'text.primary', textDecoration: 'none', fontWeight: 600 }}>
            Mereck McGowan
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={1}>
            {links.map((l) => (
            <Link
                key={l.href}
                component={NextLink}
                href={l.href}
                underline="none"
                sx={{
                px: 1.5,
                py: 0.75,
                borderRadius: 999,
                color: pathname === l.href ? 'black' : 'text.secondary',
                bgcolor: pathname === l.href ? 'common.white' : 'transparent',
                '&:hover': { bgcolor: pathname === l.href ? 'common.white' : 'rgba(255,255,255,0.06)', color: 'text.primary' },
                }}
                >
                {l.label}
            </Link>
            ))}
    </Stack>
    </Toolbar>
</AppBar>
);
}