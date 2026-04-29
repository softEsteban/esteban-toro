"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SceneObject {
  id: number;
  label: string;
  type: ObjectType;
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  mesh?: THREE.Mesh;
}

type ObjectType =
  | "wall" | "floor" | "roof" | "door" | "window" | "room"
  | "furniture" | "stairs" | "column" | "beam" | "foundation"
  | "pool" | "garden" | "garage" | "structure" | "generic";

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<ObjectType | string, number> = {
  wall: 0x8899aa,
  floor: 0x6b7c6a,
  roof: 0xb05a3a,
  door: 0x8b5e3c,
  window: 0x87ceeb,
  room: 0x9baebb,
  furniture: 0xd4a853,
  stairs: 0xb0b0b0,
  pool: 0x3a9fbf,
  garden: 0x5a9c45,
  garage: 0x778899,
  column: 0xc0b090,
  beam: 0xa09080,
  foundation: 0x888888,
  structure: 0x6688aa,
  generic: 0x7a8fa6,
};

const SYSTEM_PROMPT = `Eres un generador de planos 3D para prototipos de construcciones.
El usuario describe lo que quiere y tú devuelves SOLO un JSON con una lista de objetos 3D.

Plano cartesiano: X = ancho, Y = alto (base en 0), Z = profundidad.

Cada objeto:
{
  "label": "nombre descriptivo",
  "type": "wall|floor|roof|door|window|room|furniture|stairs|column|beam|foundation|pool|garden|garage|structure|generic",
  "x": number, "y": number, "z": number,
  "w": number, "h": number, "d": number
}

Usa metros simulados: paredes 0.2 grosor, 2.5 alto; habitaciones 4x4; genera suficientes objetos para que se vea reconocible.
Responde SOLO con JSON válido: {"objects": [...]}
Sin texto antes ni después.`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function PrototypeBuilder3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);

  // orbit state
  const orbitRef = useRef({ theta: 0.7, phi: 0.6, radius: 20, panX: 0, panZ: 0 });
  const mouseRef = useRef({ down: false, right: false, lastX: 0, lastY: 0 });

  const [objects, setObjects] = useState<SceneObject[]>([]);
  const objectsRef = useRef<SceneObject[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedIdRef = useRef<number | null>(null);

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Describe tu prototipo y presiona Generar");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("claude_api_key");
    if (stored) setApiKey(stored);
  }, []);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyDraft, setKeyDraft] = useState("");

  // slider state for selected object
  const [props, setProps] = useState({ x: 0, y: 0, z: 0, w: 1, h: 1, d: 1 });

  // keep refs in sync
  useEffect(() => { objectsRef.current = objects; }, [objects]);
  useEffect(() => { selectedIdRef.current = selectedId; }, [selectedId]);

  // ── Three.js setup ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const W = el.clientWidth, H = el.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080c18);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 300);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const dir = new THREE.DirectionalLight(0xfff5e0, 0.95);
    dir.position.set(15, 20, 10);
    dir.castShadow = true;
    dir.shadow.mapSize.set(2048, 2048);
    scene.add(dir);
    const fill = new THREE.DirectionalLight(0xd0e8ff, 0.3);
    fill.position.set(-10, 5, -10);
    scene.add(fill);

    // Grid
    scene.add(new THREE.GridHelper(40, 40, 0x111a2e, 0x0d1525));
    scene.add(new THREE.AxesHelper(3));

    updateCamera();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const W = el.clientWidth, H = el.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  const updateCamera = useCallback(() => {
    const cam = cameraRef.current;
    if (!cam) return;
    const { theta, phi, radius, panX, panZ } = orbitRef.current;
    cam.position.x = panX + radius * Math.sin(phi) * Math.sin(theta);
    cam.position.y = radius * Math.cos(phi);
    cam.position.z = panZ + radius * Math.sin(phi) * Math.cos(theta);
    cam.lookAt(panX, 0, panZ);
  }, []);

  // ── Mouse / Orbit ────────────────────────────────────────────────────────────

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const onDown = (e: MouseEvent) => {
      if (e.button === 2) mouseRef.current.right = true;
      else mouseRef.current.down = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };
    const onUp = () => { mouseRef.current.down = false; mouseRef.current.right = false; };
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseRef.current.lastX;
      const dy = e.clientY - mouseRef.current.lastY;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
      const o = orbitRef.current;
      if (mouseRef.current.down) {
        o.theta -= dx * 0.008;
        o.phi = Math.max(0.1, Math.min(Math.PI / 2.1, o.phi + dy * 0.008));
        updateCamera();
      }
      if (mouseRef.current.right) {
        o.panX -= dx * 0.02 * Math.cos(o.theta);
        o.panZ -= dx * 0.02 * (-Math.sin(o.theta));
        updateCamera();
      }
    };
    const onWheel = (e: WheelEvent) => {
      orbitRef.current.radius = Math.max(3, Math.min(60, orbitRef.current.radius + e.deltaY * 0.03));
      updateCamera();
    };
    const onClick = (e: MouseEvent) => {
      if (Math.abs(e.movementX) > 3 || Math.abs(e.movementY) > 3) return;
      const rect = el.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current!);
      const meshes = objectsRef.current.map(o => o.mesh!).filter(Boolean);
      const hits = raycaster.intersectObjects(meshes, true);
      if (hits.length) {
        let hit = hits[0].object as THREE.Object3D;
        while (hit.parent && !meshes.includes(hit as THREE.Mesh)) hit = hit.parent;
        const found = objectsRef.current.find(o => o.mesh === hit);
        if (found) selectObject(found.id);
      }
    };
    const onContext = (e: Event) => e.preventDefault();

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("click", onClick);
    el.addEventListener("contextmenu", onContext);

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("click", onClick);
      el.removeEventListener("contextmenu", onContext);
    };
  }, [updateCamera]);

  // ── Object helpers ────────────────────────────────────────────────────────────

  const buildMesh = (obj: SceneObject): THREE.Mesh => {
    const geo = new THREE.BoxGeometry(obj.w, obj.h, obj.d);
    const mat = new THREE.MeshLambertMaterial({
      color: TYPE_COLORS[obj.type] ?? TYPE_COLORS.generic,
      transparent: obj.type === "window",
      opacity: obj.type === "window" ? 0.45 : 1,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(obj.x, obj.y + obj.h / 2, obj.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.18 })
    );
    mesh.add(edges);
    return mesh;
  };

  const addObjects = useCallback((rawList: Omit<SceneObject, "id" | "mesh">[]) => {
    const scene = sceneRef.current!;
    // clear existing
    objectsRef.current.forEach(o => { if (o.mesh) scene.remove(o.mesh); });

    const next: SceneObject[] = rawList.map((raw, i) => {
      const obj: SceneObject = { ...raw, id: Date.now() + i };
      obj.mesh = buildMesh(obj);
      scene.add(obj.mesh);
      return obj;
    });

    setObjects(next);
    setSelectedId(null);

    // auto camera
    let maxD = 0;
    next.forEach(o => { maxD = Math.max(maxD, Math.abs(o.x), Math.abs(o.z), o.h); });
    const r = Math.max(maxD * 2.2, 12);
    orbitRef.current.radius = r;
    orbitRef.current.panX = 0;
    orbitRef.current.panZ = 0;
    updateCamera();
  }, [updateCamera]);

  const selectObject = useCallback((id: number) => {
    const objs = objectsRef.current;
    // reset emissive on old
    objs.forEach(o => {
      if (o.mesh) (o.mesh.material as THREE.MeshLambertMaterial).emissive?.setHex(0x000000);
    });
    const found = objs.find(o => o.id === id);
    if (found?.mesh) {
      (found.mesh.material as THREE.MeshLambertMaterial).emissive = new THREE.Color(0x1a3c6e);
    }
    setSelectedId(id);
    if (found) setProps({ x: found.x, y: found.y, z: found.z, w: found.w, h: found.h, d: found.d });
  }, []);

  const updateProp = useCallback((key: keyof typeof props, val: number) => {
    const id = selectedIdRef.current;
    if (id == null) return;

    setObjects(prev => {
      const next = prev.map(o => {
        if (o.id !== id) return o;
        const updated = { ...o, [key]: val };
        if (o.mesh) {
          if (["w", "h", "d"].includes(key)) {
            o.mesh.geometry.dispose();
            o.mesh.geometry = new THREE.BoxGeometry(updated.w, updated.h, updated.d);
            const edges = o.mesh.children[0] as THREE.LineSegments;
            if (edges) {
              edges.geometry.dispose();
              edges.geometry = new THREE.EdgesGeometry(o.mesh.geometry);
            }
          }
          o.mesh.position.set(updated.x, updated.y + updated.h / 2, updated.z);
        }
        return updated;
      });
      objectsRef.current = next;
      return next;
    });

    setProps(p => ({ ...p, [key]: val }));
  }, []);

  const removeObject = useCallback((id: number) => {
    const obj = objectsRef.current.find(o => o.id === id);
    if (obj?.mesh) sceneRef.current?.remove(obj.mesh);
    setObjects(prev => {
      const next = prev.filter(o => o.id !== id);
      objectsRef.current = next;
      return next;
    });
    if (selectedIdRef.current === id) setSelectedId(null);
  }, []);

  const clearScene = useCallback(() => {
    objectsRef.current.forEach(o => { if (o.mesh) sceneRef.current?.remove(o.mesh); });
    setObjects([]);
    objectsRef.current = [];
    setSelectedId(null);
    setStatus("Escena limpiada");
  }, []);

  // ── API call ─────────────────────────────────────────────────────────────────

  const generate = useCallback(async () => {
    if (!prompt.trim()) return;
    if (!apiKey) { setShowKeyInput(true); return; }

    setLoading(true);
    setStatus("Interpretando descripción con IA...");

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 2000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const text = (data.content as { type: string; text?: string }[])
        .map(b => b.text ?? "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean) as { objects: Omit<SceneObject, "id" | "mesh">[] };

      addObjects(parsed.objects);
      setStatus(`${parsed.objects.length} objetos generados — haz clic para editar`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      setStatus(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, [prompt, apiKey, addObjects]);

  // ── API Key modal ─────────────────────────────────────────────────────────────

  const saveKey = () => {
    const trimmed = keyDraft.trim();
    if (!trimmed) return;
    setApiKey(trimmed);
    localStorage.setItem("claude_api_key", trimmed);
    setShowKeyInput(false);
    setKeyDraft("");
  };

  // ── Selected object ────────────────────────────────────────────────────────────

  const selected = objects.find(o => o.id === selectedId);

  // ── Render ─────────────────────────────────────────────────────────────────────

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", background: "#080c18" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 270, minWidth: 270, display: "flex", flexDirection: "column",
        background: "#0e1424", borderRight: "1px solid #1e2a40", overflow: "hidden",
      }}>

        {/* Header */}
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #1e2a40" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#e2eaf8", letterSpacing: "0.05em" }}>
            PROTO<span style={{ color: "#4f8ef7" }}>3D</span>
          </div>
          <div style={{ fontSize: 10, color: "#4a5a74", marginTop: 2 }}>generador de planos con IA</div>
        </div>

        {/* API Key */}
        <div style={{ padding: "10px 14px", borderBottom: "1px solid #1e2a40", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 10, color: apiKey ? "#3a9c5c" : "#e24b4a" }}>
            {apiKey ? "● API key configurada" : "● Sin API key"}
          </div>
          <button
            onClick={() => { setShowKeyInput(true); setKeyDraft(apiKey); }}
            style={{
              fontSize: 10, padding: "3px 8px", cursor: "pointer",
              background: "transparent", color: "#4f8ef7",
              border: "1px solid #1e3a6e", borderRadius: 4,
            }}
          >
            {apiKey ? "cambiar" : "configurar"}
          </button>
        </div>

        {/* Prompt */}
        <div style={{ padding: "12px 14px", borderBottom: "1px solid #1e2a40" }}>
          <div style={{ fontSize: 10, color: "#4a5a74", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
            Descripción
          </div>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) generate(); }}
            placeholder={"una casa con sala, cocina,\ndos habitaciones y baño..."}
            rows={4}
            style={{
              width: "100%", resize: "none", fontSize: 12,
              background: "#080c18", color: "#c8d8f0",
              border: "1px solid #1e2a40", borderRadius: 6,
              padding: "8px 10px", fontFamily: "inherit",
              lineHeight: 1.5,
            }}
          />
          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            style={{
              width: "100%", marginTop: 8, padding: "8px 0", fontSize: 12,
              fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              background: loading ? "#1a2a44" : "#1a3a7a",
              color: loading ? "#4a5a74" : "#7ab2ff",
              border: "1px solid " + (loading ? "#1e2a40" : "#2a5aaa"),
              borderRadius: 6, letterSpacing: "0.04em", transition: "all 0.15s",
            }}
          >
            {loading ? "generando..." : "Generar ↗"}
          </button>
          <div style={{ fontSize: 10, color: "#3a4a60", marginTop: 5, textAlign: "right" }}>
            Ctrl+Enter
          </div>
        </div>

        {/* Objects list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px" }}>
          <div style={{ fontSize: 10, color: "#4a5a74", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
            Escena ({objects.length})
          </div>
          {objects.length === 0 && (
            <div style={{ fontSize: 11, color: "#2a3a54", textAlign: "center", marginTop: 20 }}>
              sin objetos
            </div>
          )}
          {objects.map(obj => {
            const hex = "#" + (TYPE_COLORS[obj.type] ?? TYPE_COLORS.generic).toString(16).padStart(6, "0");
            const isSel = obj.id === selectedId;
            return (
              <div
                key={obj.id}
                onClick={() => selectObject(obj.id)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "5px 8px", marginBottom: 3, borderRadius: 5, cursor: "pointer",
                  background: isSel ? "#0e2040" : "transparent",
                  border: "1px solid " + (isSel ? "#2a5aaa" : "#1a2434"),
                  transition: "all 0.1s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: isSel ? "#90c0ff" : "#8898b8" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: hex, flexShrink: 0 }} />
                  {obj.label}
                </div>
                <button
                  onClick={e => { e.stopPropagation(); removeObject(obj.id); }}
                  style={{
                    background: "none", border: "none", color: "#3a4a60",
                    cursor: "pointer", fontSize: 14, lineHeight: 1, padding: "0 2px",
                  }}
                >×</button>
              </div>
            );
          })}
        </div>

        {/* Clear */}
        <button
          onClick={clearScene}
          style={{
            margin: "0 14px 12px", padding: "6px 0", fontSize: 11, cursor: "pointer",
            background: "transparent", color: "#4a5a74",
            border: "1px solid #1a2434", borderRadius: 6,
          }}
        >
          Limpiar escena
        </button>

        {/* Props editor */}
        <div style={{ padding: "10px 14px 14px", borderTop: "1px solid #1e2a40", background: "#0b1020" }}>
          <div style={{ fontSize: 10, color: "#4a5a74", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
            {selected ? `Editando: ${selected.label}` : "Selecciona un objeto"}
          </div>
          {(["x","y","z","w","h","d"] as (keyof typeof props)[]).map(key => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
              <span style={{ fontSize: 10, color: "#4f8ef7", width: 14, fontWeight: 600 }}>{key.toUpperCase()}</span>
              <input
                type="range"
                min={["y","w","h","d"].includes(key) ? 0.1 : -10}
                max={["y","w","h","d"].includes(key) ? 10 : 10}
                step={0.1}
                value={props[key]}
                disabled={!selected}
                onChange={e => updateProp(key, parseFloat(e.target.value))}
                style={{ flex: 1, accentColor: "#4f8ef7" }}
              />
              <span style={{ fontSize: 10, color: "#6a7a94", width: 28, textAlign: "right" }}>
                {props[key].toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Canvas ── */}
      <div style={{ flex: 1, position: "relative" }}>
        <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

        {/* Controls hint */}
        <div style={{
          position: "absolute", top: 12, right: 14,
          fontSize: 10, color: "rgba(255,255,255,0.25)", lineHeight: 1.8, textAlign: "right",
        }}>
          Rotar · clic + arrastrar<br />
          Zoom · scroll<br />
          Pan · clic derecho
        </div>

        {/* Status bar */}
        <div style={{
          position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
          background: "rgba(8,12,24,0.85)", color: "#6a8aac",
          fontSize: 11, padding: "5px 14px", borderRadius: 20,
          border: "1px solid #1e2a40", whiteSpace: "nowrap",
        }}>
          {loading ? "⏳ " : ""}{status}
        </div>
      </div>


      {/* ── API Key Modal ── */}
      {showKeyInput && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
        }}>
          <div style={{
            background: "#0e1424", border: "1px solid #2a3a58",
            borderRadius: 10, padding: 24, width: 360,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#e2eaf8", marginBottom: 4 }}>
              Claude API Key
            </div>
            <div style={{ fontSize: 11, color: "#4a5a74", marginBottom: 14 }}>
              Consíguela en console.anthropic.com. Se guarda localmente.
            </div>
            <input
              type="password"
              value={keyDraft}
              onChange={e => setKeyDraft(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") saveKey(); }}
              placeholder="sk-ant-..."
              autoFocus
              style={{
                width: "100%", padding: "9px 12px", fontSize: 12,
                background: "#080c18", color: "#c8d8f0",
                border: "1px solid #2a3a58", borderRadius: 6,
                fontFamily: "inherit", marginBottom: 12,
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={saveKey}
                style={{
                  flex: 1, padding: "8px 0", fontSize: 12, cursor: "pointer",
                  background: "#1a3a7a", color: "#7ab2ff",
                  border: "1px solid #2a5aaa", borderRadius: 6,
                }}
              >
                Guardar
              </button>
              <button
                onClick={() => setShowKeyInput(false)}
                style={{
                  padding: "8px 16px", fontSize: 12, cursor: "pointer",
                  background: "transparent", color: "#4a5a74",
                  border: "1px solid #1a2434", borderRadius: 6,
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}