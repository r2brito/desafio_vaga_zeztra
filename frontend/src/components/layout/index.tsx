import { AppBar, Toolbar, Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              href="/dashboard"
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/transactions"
            >
              Transações
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{ flexGrow: 1, padding: 2 }}
      >
        {children}
      </Box>
    </Box>
  );
}
