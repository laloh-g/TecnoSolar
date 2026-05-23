import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Increase request size limit for base64 image uploads (e.g., 50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Admin Password setting - dynamic with customized default
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'TecnoSolarSCZ2026';

// Helper to verify admin credentials
function verifyAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const passwordInBody = req.body.password;
  
  let receivedPassword = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    receivedPassword = authHeader.substring(7);
  } else if (passwordInBody) {
    receivedPassword = passwordInBody;
  }

  if (receivedPassword === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: "Contraseña de administrador incorrecta" });
  }
}

// 1. Catálogo API routes first
app.get("/api/productos", (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "public", "productos.json");
    if (!fs.existsSync(filePath)) {
      return res.json([]);
    }
    const data = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err: any) {
    res.status(500).json({ error: "No se pudo leer el archivo de productos: " + err.message });
  }
});

// Verify admin authentication
app.post("/api/admin/verify", verifyAdmin, (req, res) => {
  res.json({ success: true, message: "Sesión autorizada" });
});

// Save updated catalog
app.post("/api/admin/save-catalog", verifyAdmin, (req, res) => {
  try {
    const { catalog } = req.body;
    if (!Array.isArray(catalog)) {
      return res.status(400).json({ error: "El catálogo debe ser un arreglo de productos" });
    }

    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const filePath = path.join(publicDir, "productos.json");
    fs.writeFileSync(filePath, JSON.stringify(catalog, null, 2), "utf-8");

    // Also write to dist/productos.json if it exists to maintain sync
    const distFilePath = path.join(process.cwd(), "dist", "productos.json");
    if (fs.existsSync(path.dirname(distFilePath))) {
      fs.writeFileSync(distFilePath, JSON.stringify(catalog, null, 2), "utf-8");
    }

    res.json({ success: true, message: "Catálogo guardado correctamente" });
  } catch (err: any) {
    res.status(500).json({ error: "Error al guardar el catálogo: " + err.message });
  }
});

// Save metadata setting (site title, description)
app.post("/api/admin/save-metadata", verifyAdmin, (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Nombre y descripción son obligatorios" });
    }

    const metadataPath = path.join(process.cwd(), "metadata.json");
    let metadata = { name: "TecnoSolar Santa Cruz", description: "", requestFramePermissions: [], majorCapabilities: ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"] };
    
    if (fs.existsSync(metadataPath)) {
      try {
        metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
      } catch (e) {}
    }

    metadata.name = name;
    metadata.description = description;

    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), "utf-8");
    res.json({ success: true, message: "Ajustes de la página guardados correctamente" });
  } catch (err: any) {
    res.status(500).json({ error: "Error al guardar el título: " + err.message });
  }
});

// Upload product image (base64 handler)
app.post("/api/admin/upload-image", verifyAdmin, (req, res) => {
  try {
    const { fileName, fileData } = req.body;
    if (!fileName || !fileData) {
      return res.status(400).json({ error: "Falta nombre de archivo o datos base64" });
    }

    // Ensure uploads directory exists
    const uploadsPath = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath, { recursive: true });
    }

    // Clean up file name to prevent directory traversal
    const safeFileName = `${Date.now()}-${path.basename(fileName).replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const destination = path.join(uploadsPath, safeFileName);

    // Extract base64 clean data
    const base64Data = fileData.replace(/^data:image\/\w+;base64,/, "");
    const decodedBuffer = Buffer.from(base64Data, 'base64');

    fs.writeFileSync(destination, decodedBuffer);

    // Also write to dist/uploads if dist exists
    const distUploadsPath = path.join(process.cwd(), "dist", "uploads");
    if (fs.existsSync(path.dirname(distUploadsPath))) {
      if (!fs.existsSync(distUploadsPath)) {
        fs.mkdirSync(distUploadsPath, { recursive: true });
      }
      fs.writeFileSync(path.join(distUploadsPath, safeFileName), decodedBuffer);
    }

    res.json({ success: true, url: `/uploads/${safeFileName}` });
  } catch (err: any) {
    res.status(500).json({ error: "Error al cargar la imagen: " + err.message });
  }
});

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

// Serve produtos.json directly (to avoid any possible html fallback issues)
app.get("/productos.json", (req, res) => {
  const filePath = path.join(process.cwd(), "public", "productos.json");
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/json');
    return res.sendFile(filePath);
  }
  res.status(404).json({ error: "productos.json no encontrado" });
});

// Bootstrapping function
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
