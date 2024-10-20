"use client";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/post");
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
      <Box>Cargando...</Box>
    </Box>
  );
}
