import React, { useMemo } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";

/**
 * PdfViewer
 * - Shows a PDF in an <embed> with a sticky toolbar.
 * - Props:
 *    - src: string | undefined  → PDF url or path (optional if you use ?file=)
 *    - title: string | undefined → Optional title in the toolbar
 * - You can also pass a file via URL param: ?file=/docs/my.pdf
 *
 * Tips:
 *  - If the PDF is inside /public, use src="/my-file.pdf" or "/docs/my.pdf"
 *  - For GitHub raw: "https://raw.githubusercontent.com/USER/REPO/BRANCH/path/to/file.pdf"
 */
export default function PdfViewer({ src, title }) {
  const pdfUrl = useMemo(() => {
    const p = new URLSearchParams(window.location.search);
    const fromQuery = p.get("file");
    return fromQuery ? decodeURIComponent(fromQuery) : src || "";
  }, [src]);

  const fileName = useMemo(() => {
    try {
      return (pdfUrl?.split("/").pop() || "/Mereck_McGowan_Resume.pdf").split("?")[0];
    } catch {
      return "/Mereck_McGowan_Resume.pdf";
    }
  }, [pdfUrl]);

  const displayTitle = title || fileName;

  return (
    <Box sx={{ height: "100dvh", display: "grid", gridTemplateRows: "auto 1fr", bgcolor: "background.default" }}>
      <AppBar position="sticky" elevation={0} color="default">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="subtitle1" noWrap sx={{ flex: 1 }}>
            {displayTitle}
          </Typography>
          
          <Button
            variant="contained"
            href={pdfUrl}
            download={fileName}
          >
            Download
          </Button>
          <Button
            variant="outlined"
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in New Tab
          </Button>
          <Button
            variant="outlined"
            href="{pdfUrl}"
            
            rel="noopener noreferrer"
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>

      {/* PDF area */}
      {pdfUrl ? (
        <embed
          src={pdfUrl}
          type="application/pdf"
          style={{ width: "100%", height: "100%", border: 0, background: "rgba(0,0,0,0.04)" }}
        />
      ) : (
        <Container
          sx={{
            height: "100%",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            color: "text.secondary",
          }}
        >
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
