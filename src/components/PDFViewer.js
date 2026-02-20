'use client';

import React, { useEffect, useMemo, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import Link from "next/link";

export default function PdfViewer({ src, title }) {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    // window is safe here (client only)
    const p = new URLSearchParams(window.location.search);
    const fromQuery = p.get("file");
    setPdfUrl(fromQuery ? decodeURIComponent(fromQuery) : (src || ""));
  }, [src]);

  const fileName = useMemo(() => {
    const fallback = "Resume.pdf";
    const last = (pdfUrl?.split("/").pop() || fallback).split("?")[0];
    return last || fallback;
  }, [pdfUrl]);

  const displayTitle = title || fileName;

  return (
    <Box sx={{ height: "100dvh", display: "grid", gridTemplateRows: "auto 1fr", bgcolor: "background.default" }}>
      <AppBar position="sticky" elevation={0} color="default">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="subtitle1" noWrap sx={{ flex: 1 }}>
            {displayTitle}
          </Typography>

          <Button variant="contained" {...(pdfUrl ? { href: pdfUrl, download: fileName } : {})} disabled={!pdfUrl}>
            Download
          </Button>

        
        </Toolbar>
      </AppBar>

      {pdfUrl ? (
        <embed src={pdfUrl} type="application/pdf" style={{ width: "100%", height: "100%", border: 0 }} />
      ) : (
        <Container sx={{ height: "100%", display: "grid", placeItems: "center", textAlign: "center", color: "text.secondary" }}>
          <Box>
            <Typography variant="h6" gutterBottom>No PDF provided</Typography>
            <Typography variant="body2">
              Pass a <code>?file=</code> query param or provide the <code>src</code> prop.
            </Typography>
          </Box>
        </Container>
      )}
    </Box>
  );
}