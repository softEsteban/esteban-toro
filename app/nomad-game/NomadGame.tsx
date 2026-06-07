"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

// ─── Shared constants ─────────────────────────────────────────────────────────

const TILE  = 40;
const COLS  = 20;
const ROWS  = 15;
const PW    = 18;
const PH    = 24;
const SPEED = 2.5;
const MT    = 10;

// ─── Main-world tile IDs ──────────────────────────────────────────────────────

const G = 0, T = 1, S = 2, W = 3, P = 4, H = 5, K = 6, L = 7, A = 8;
const IMPASSABLE_MAIN = new Set([T, W]);

const MAP: number[][] = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,L,L,L,L,T,T,T,T,T],
  [T,G,G,G,G,G,G,G,T,T,G,L,L,L,L,T,T,T,T,T],
  [T,G,A,A,G,G,G,G,T,G,G,G,G,G,G,G,G,G,G,T],
  [T,G,A,A,G,P,P,P,P,P,P,G,G,G,G,G,G,G,G,T],
  [T,G,G,G,G,P,G,G,G,G,P,G,G,K,K,K,K,G,G,T],
  [T,T,G,G,G,P,G,G,G,G,P,G,G,K,K,K,K,G,G,T],
  [T,T,G,G,P,P,P,P,P,P,P,G,G,H,H,H,P,G,G,T],
  [T,T,G,G,P,G,G,G,G,G,G,G,G,H,H,H,P,G,G,T],
  [T,T,T,G,G,G,G,G,G,G,G,G,G,G,G,G,P,G,G,T],
  [T,T,T,G,G,G,G,G,G,G,G,G,G,G,G,G,P,G,G,T],
  [T,T,T,G,G,P,P,P,P,P,P,P,P,P,P,P,P,G,G,T],
  [T,T,T,G,S,S,S,S,S,S,S,S,S,S,S,S,S,S,G,T],
  [T,T,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,T],
  [W,W,W,S,S,S,S,S,S,S,S,S,S,S,S,S,S,W,W,W],
];

const ZONES = [
  { name: "Water Collection", emoji: "💧", col: 1,  row: 2,  w: 4,  h: 4 },
  { name: "Solar System",     emoji: "☀️", col: 10, row: 1,  w: 6,  h: 3 },
  { name: "Ancestral House",  emoji: "🏠", col: 12, row: 6,  w: 5,  h: 4 },
  { name: "Workshop",         emoji: "⚙️", col: 12, row: 4,  w: 5,  h: 3 },
  { name: "Beach",            emoji: "🏖️", col: 3,  row: 12, w: 15, h: 3 },
];

const COIN_POSITIONS: [number, number][] = [
  [5,4],[7,4],[3,5],[8,5],[7,7],
  [14,7],[6,9],[12,9],
  [8,11],[12,11],[16,11],
  [6,12],[11,12],[15,12],
];
const TOTAL_COINS = COIN_POSITIONS.length;

const COMPUTER_COL = 10;
const COMPUTER_ROW = 2;

const PORTAL_MAIN_ROWS = [5, 6, 7];
const PORTAL_MAIN_COLS = [17, 18];

// ─── Digital-world tile IDs ───────────────────────────────────────────────────

const DV = 0, DT = 1, DS = 2, DN = 3, DC = 4, DH = 5, DF = 6, DX = 7;
const IMPASSABLE_DIGITAL = new Set([DV, DS]);

const MAP_D: number[][] = [
  [DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV],
  [DV,DT,DT,DT,DT,DV,DV,DV,DV,DV,DS,DS,DS,DS,DV,DV,DV,DV,DV,DV],
  [DV,DT,DT,DT,DT,DN,DN,DN,DN,DN,DS,DS,DS,DS,DV,DV,DV,DV,DV,DV],
  [DV,DT,DT,DT,DT,DN,DC,DC,DC,DN,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV],
  [DV,DV,DV,DV,DV,DN,DC,DH,DH,DN,DN,DN,DN,DN,DN,DN,DN,DV,DV,DV],
  [DV,DV,DV,DV,DV,DN,DC,DH,DH,DN,DV,DV,DV,DN,DN,DN,DN,DN,DX,DV],
  [DV,DV,DV,DV,DV,DN,DC,DH,DH,DN,DV,DV,DV,DN,DN,DN,DN,DN,DX,DV],
  [DV,DV,DV,DV,DN,DN,DN,DN,DN,DN,DN,DN,DN,DN,DN,DN,DN,DN,DX,DV],
  [DV,DV,DV,DV,DN,DC,DC,DC,DC,DC,DC,DC,DC,DN,DV,DV,DV,DV,DV,DV],
  [DV,DV,DV,DV,DN,DC,DC,DC,DC,DC,DC,DC,DC,DN,DV,DV,DV,DV,DV,DV],
  [DV,DV,DV,DV,DN,DN,DN,DN,DN,DN,DN,DN,DN,DN,DV,DV,DV,DV,DV,DV],
  [DV,DV,DV,DV,DC,DC,DF,DF,DF,DF,DF,DF,DC,DC,DV,DV,DV,DV,DV,DV],
  [DV,DV,DV,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DV,DV,DV,DV,DV],
  [DV,DV,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DV,DV,DV,DV],
  [DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV],
];

const DIGITAL_ZONES = [
  { name: "Terminal",    emoji: "💻", col: 1, row: 1, w: 4, h: 3 },
  { name: "Server Room", emoji: "🖥️", col: 5, row: 1, w: 5, h: 3 },
  { name: "Network Hub", emoji: "🌐", col: 6, row: 3, w: 4, h: 5 },
  { name: "Code Lab",    emoji: "⌨️", col: 5, row: 7, w: 9, h: 4 },
  { name: "Firewall",    emoji: "🔥", col: 3, row: 11, w: 13, h: 3 },
];

// ─── Zone Challenges ──────────────────────────────────────────────────────────

type WorldMap = "main" | "digital";

interface ZoneChallenge {
  zoneKey: string;
  world: WorldMap;
  title: string;
  items: [number, number][];
  story: string;
  reward: number;
  color: string;
}

const ZONE_CHALLENGES: ZoneChallenge[] = [
  {
    zoneKey: "💧 Water Collection",
    world: "main",
    title: "Install the Rainwater System",
    items: [[2,3],[3,2],[1,5]],
    story: "Built a 500-litre rainwater harvesting system from scratch — learned plumbing, filtration, and gravity-fed pressure on the fly. The property now runs for months without any municipal infrastructure.",
    reward: 30,
    color: "#40a8ff",
  },
  {
    zoneKey: "☀️ Solar System",
    world: "main",
    title: "Wire Up the Solar Array",
    items: [[11,2],[13,1],[14,2]],
    story: "Installed 12 solar panels and a battery bank to achieve full energy independence. Calculated loads, wired the inverter, and solved the off-grid power equation from first principles — no electrician required.",
    reward: 40,
    color: "#ffe040",
  },
  {
    zoneKey: "⚙️ Workshop",
    world: "main",
    title: "Build the First Product",
    items: [[13,4],[15,5],[16,4]],
    story: "Designed and built the first portable solar charging station in this workshop. Six months of failed prototypes before the first unit held up reliably in the field. The lesson: iteration beats perfection.",
    reward: 35,
    color: "#a0b8c8",
  },
  {
    zoneKey: "🏠 Ancestral House",
    world: "main",
    title: "Restore the Foundation",
    items: [[13,7],[15,8],[16,7]],
    story: "Rebuilt the ancestral home from ruin using the same stone walls great-grandparents laid. Mixed concrete by hand and preserved every original wall. A structure in ruin became a place worth living in again.",
    reward: 45,
    color: "#d08060",
  },
  {
    zoneKey: "🏖️ Beach",
    world: "main",
    title: "Launch the Remote Life",
    items: [[5,13],[9,14],[13,14]],
    story: "Signed the first remote contract sitting on this beach — laptop open, no fixed address, no office to return to. The decision to work from anywhere started here, and it never stopped.",
    reward: 25,
    color: "#f0d888",
  },
];

const DIGITAL_CHALLENGES: ZoneChallenge[] = [
  {
    zoneKey: "💻 Terminal",
    world: "digital",
    title: "Ship the First SaaS",
    items: [[2,1],[3,2],[1,2]],
    story: "Pushed the first SaaS product to production at 3 AM, solo, no team. Watched the first user sign up the next morning. The compounding started that day — it never would have if the deploy was delayed another week.",
    reward: 30,
    color: "#40ff80",
  },
  {
    zoneKey: "🖥️ Server Room",
    world: "digital",
    title: "Survive the First Outage",
    items: [[5,2],[7,2],[9,3]],
    story: "First major server crash with paying customers watching. Diagnosed the root cause, patched, and restored in under 4 hours. Learned more in that single incident than in months of smooth operation.",
    reward: 35,
    color: "#4080ff",
  },
  {
    zoneKey: "🌐 Network Hub",
    world: "digital",
    title: "Build the Community",
    items: [[7,4],[8,5],[6,6]],
    story: "Grew the first online community to 1,000 members starting with a WhatsApp group and a daily voice note. No budget, no paid ads — just consistency over two years. Showed up every day before anyone was watching.",
    reward: 30,
    color: "#c040ff",
  },
  {
    zoneKey: "⌨️ Code Lab",
    world: "digital",
    title: "Launch the AI Agent",
    items: [[6,8],[9,9],[11,8]],
    story: "Built and shipped the first AI agent product live with paying customers as the spec. Learned prompt engineering, tool use, and API design in real-time — guided by what users actually needed, not a roadmap written in advance.",
    reward: 40,
    color: "#40ffff",
  },
  {
    zoneKey: "🔥 Firewall",
    world: "digital",
    title: "Block the First Attack",
    items: [[5,11],[9,12],[12,13]],
    story: "Detected a credential-stuffing attack against the platform and shut it down overnight. Added rate limiting, enforced 2FA, and wired up monitoring before sunrise. Built the wall after the first knock, not after the break-in.",
    reward: 45,
    color: "#ff6030",
  },
];

const ALL_CHALLENGES = [...ZONE_CHALLENGES, ...DIGITAL_CHALLENGES];

// ─── Tile color tables ────────────────────────────────────────────────────────

const TILE_BASE: Record<number, string> = {
  [G]:"#3d7a4f",[T]:"#1e3d1a",[S]:"#c49a50",[W]:"#1a5a9e",
  [P]:"#8b7355",[H]:"#8b3a1e",[K]:"#607080",[L]:"#0d0d1e",[A]:"#3a7aa8",
};
const TILE_ALT: Record<number, string> = {
  [G]:"#4a7c59",[T]:"#2d5a27",[S]:"#d4aa6a",[W]:"#2e6fad",
  [P]:"#9a8365",[H]:"#a0522d",[K]:"#708090",[L]:"#1a1a2e",[A]:"#4a8ab8",
};
const DTILE_BASE: Record<number, string> = {
  [DV]:"#000000",[DT]:"#031a03",[DS]:"#0a0a18",[DN]:"#020a10",
  [DC]:"#041408",[DH]:"#08021a",[DF]:"#180200",[DX]:"#050028",
};
const DTILE_ALT: Record<number, string> = {
  [DV]:"#030303",[DT]:"#062206",[DS]:"#12122a",[DN]:"#04141e",
  [DC]:"#061c0c",[DH]:"#100432",[DF]:"#240400",[DX]:"#09003c",
};

// ─── Utilities ────────────────────────────────────────────────────────────────

function rgba(hex: string, a: number): string {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

// ─── Drawing helpers ──────────────────────────────────────────────────────────

function drawTileMain(ctx: CanvasRenderingContext2D, col: number, row: number, type: number) {
  const px = col*TILE, py = row*TILE;
  ctx.fillStyle = (col+row)%2===0 ? (TILE_BASE[type]??"#3d7a4f") : (TILE_ALT[type]??"#4a7c59");
  ctx.fillRect(px,py,TILE,TILE);
  switch (type) {
    case G:
      ctx.fillStyle="#2d5a27";
      if((col*7+row*3)%5===0){ctx.fillRect(px+4,py+6,2,5);ctx.fillRect(px+5,py+5,1,2);}
      if((col*3+row*7)%5===0){ctx.fillRect(px+20,py+18,2,5);ctx.fillRect(px+21,py+17,1,2);}
      if((col*5+row*2)%7===0){ctx.fillRect(px+32,py+8,2,5);ctx.fillRect(px+33,py+7,1,2);}
      break;
    case T:
      ctx.fillStyle="#1a2e18";ctx.fillRect(px+2,py+2,TILE-4,TILE-4);
      ctx.fillStyle="#2a4a24";ctx.fillRect(px+5,py+5,TILE-10,TILE-10);
      ctx.fillStyle="#3a6e32";ctx.fillRect(px+10,py+10,TILE-20,TILE-20);
      ctx.fillStyle="#4e8a44";ctx.fillRect(px+14,py+14,TILE-28,TILE-28);
      break;
    case S:
      ctx.fillStyle="#e8c57e";
      if((col*4+row*6)%5===0)ctx.fillRect(px+8,py+12,3,3);
      if((col*6+row*4)%7===0)ctx.fillRect(px+25,py+5,3,3);
      break;
    case W:
      ctx.fillStyle="#3a7fc0";ctx.fillRect(px,py+8,TILE,3);ctx.fillRect(px,py+22,TILE,3);
      ctx.fillStyle="#6aaae8";ctx.fillRect(px+4,py+10,8,1);ctx.fillRect(px+20,py+24,6,1);
      break;
    case P:
      ctx.fillStyle="#6a5535";
      if((col*5+row*3)%4===0)ctx.fillRect(px+10,py+10,3,3);
      if((col*3+row*5)%4===0)ctx.fillRect(px+25,py+22,3,3);
      break;
    case H:
      ctx.fillStyle="#7a2d10";
      for(let i=0;i<TILE;i+=10)ctx.fillRect(px+i,py,1,TILE);
      ctx.fillStyle="#c06030";ctx.fillRect(px+2,py+2,TILE-4,2);
      break;
    case K:
      ctx.fillStyle="#506070";
      for(let i=0;i<TILE;i+=10)ctx.fillRect(px,py+i,TILE,1);
      ctx.fillStyle="#8090a8";ctx.fillRect(px+2,py+2,4,4);ctx.fillRect(px+TILE-6,py+2,4,4);
      break;
    case L: {
      ctx.fillStyle="#080818";ctx.fillRect(px+2,py+2,TILE-4,TILE-4);
      const h2=Math.floor(TILE/2)-4;
      ctx.fillStyle="#202862";
      ctx.fillRect(px+4,py+4,h2,h2);ctx.fillRect(px+TILE/2+2,py+4,h2,h2);
      ctx.fillRect(px+4,py+TILE/2+2,h2,h2);ctx.fillRect(px+TILE/2+2,py+TILE/2+2,h2,h2);
      ctx.fillStyle="#7080c0";ctx.fillRect(px+5,py+5,3,3);ctx.fillRect(px+TILE/2+3,py+5,3,3);
      break;
    }
    case A:
      ctx.fillStyle="#5aaae0";ctx.fillRect(px+4,py+4,TILE-8,TILE-8);
      ctx.fillStyle="#3a7aa8";ctx.fillRect(px+7,py+7,TILE-14,TILE-14);
      ctx.fillStyle="#80c8f8";ctx.fillRect(px+9,py+16,TILE-18,3);
      ctx.fillStyle="#aae0ff";ctx.fillRect(px+11,py+18,4,1);
      break;
  }
}

function drawTileDigital(ctx: CanvasRenderingContext2D, col: number, row: number, type: number) {
  const px=col*TILE, py=row*TILE;
  ctx.fillStyle=(col+row)%2===0?(DTILE_BASE[type]??"#000"):(DTILE_ALT[type]??"#030303");
  ctx.fillRect(px,py,TILE,TILE);
  switch(type){
    case DT:
      ctx.fillStyle="rgba(0,255,65,0.06)";
      for(let i=0;i<TILE;i+=4)ctx.fillRect(px,py+i,TILE,2);
      ctx.fillStyle="rgba(0,255,65,0.12)";
      ctx.fillRect(px+4,py+4,TILE-8,2);ctx.fillRect(px+4,py+10,TILE-16,2);
      ctx.fillRect(px+4,py+16,TILE-12,2);ctx.fillRect(px+4,py+22,TILE-20,2);
      break;
    case DS:
      ctx.fillStyle="#1a1a30";
      for(let i=2;i<TILE-2;i+=8)ctx.fillRect(px+2,py+i,TILE-4,6);
      ctx.fillStyle="rgba(0,255,100,0.5)";ctx.fillRect(px+TILE-8,py+5,3,3);
      ctx.fillStyle="rgba(255,100,0,0.5)";ctx.fillRect(px+TILE-8,py+13,3,3);
      ctx.fillStyle="rgba(0,150,255,0.5)";ctx.fillRect(px+TILE-8,py+21,3,3);
      break;
    case DN:
      ctx.strokeStyle="rgba(0,220,255,0.25)";ctx.lineWidth=0.5;
      ctx.beginPath();ctx.moveTo(px,py+TILE/2);ctx.lineTo(px+TILE,py+TILE/2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(px+TILE/2,py);ctx.lineTo(px+TILE/2,py+TILE);ctx.stroke();
      ctx.fillStyle="rgba(0,220,255,0.1)";ctx.fillRect(px+TILE/2-1,py+TILE/2-1,2,2);
      break;
    case DC:
      ctx.fillStyle="rgba(0,180,60,0.08)";ctx.fillRect(px+2,py+2,TILE-4,TILE-4);
      ctx.strokeStyle="rgba(0,220,80,0.2)";ctx.lineWidth=1;
      if((col+row)%3===0){
        ctx.beginPath();ctx.moveTo(px+4,py+TILE/2);ctx.lineTo(px+TILE-4,py+TILE/2);ctx.stroke();
        ctx.beginPath();ctx.moveTo(px+TILE/2,py+4);ctx.lineTo(px+TILE/2,py+TILE-4);ctx.stroke();
      }
      ctx.fillStyle="rgba(0,255,80,0.15)";
      if((col*3+row*5)%4===0)ctx.fillRect(px+8,py+8,4,4);
      break;
    case DH:
      ctx.fillStyle="rgba(140,60,255,0.15)";ctx.fillRect(px+2,py+2,TILE-4,TILE-4);
      ctx.fillStyle="rgba(180,100,255,0.4)";ctx.fillRect(px+TILE/2-3,py+TILE/2-3,6,6);
      ctx.fillStyle="rgba(220,160,255,0.2)";ctx.fillRect(px+TILE/2-6,py+TILE/2-6,12,12);
      break;
    case DF:
      ctx.fillStyle="rgba(255,60,0,0.08)";ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle="rgba(255,120,0,0.15)";
      for(let i=0;i<TILE;i+=8)ctx.fillRect(px+i,py,2,TILE);
      ctx.fillStyle="rgba(255,60,0,0.25)";
      ctx.fillRect(px+2,py+2,TILE-4,2);ctx.fillRect(px+2,py+TILE-4,TILE-4,2);
      break;
    case DX:
      ctx.fillStyle="rgba(80,40,255,0.2)";ctx.fillRect(px,py,TILE,TILE);
      ctx.fillStyle="rgba(120,100,255,0.3)";ctx.fillRect(px+4,py+4,TILE-8,TILE-8);
      ctx.fillStyle="rgba(200,180,255,0.15)";ctx.fillRect(px+8,py+8,TILE-16,TILE-16);
      break;
  }
}

function drawMainMap(ctx: CanvasRenderingContext2D) {
  for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++) drawTileMain(ctx,c,r,MAP[r][c]);
  ctx.strokeStyle="rgba(0,0,0,0.15)";ctx.lineWidth=0.5;
  for(let c=0;c<=COLS;c++){ctx.beginPath();ctx.moveTo(c*TILE,0);ctx.lineTo(c*TILE,ROWS*TILE);ctx.stroke();}
  for(let r=0;r<=ROWS;r++){ctx.beginPath();ctx.moveTo(0,r*TILE);ctx.lineTo(COLS*TILE,r*TILE);ctx.stroke();}
}

function drawDigitalMap(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle="#000005";ctx.fillRect(0,0,COLS*TILE,ROWS*TILE);
  for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++) drawTileDigital(ctx,c,r,MAP_D[r][c]);
  ctx.strokeStyle="rgba(0,200,255,0.04)";ctx.lineWidth=0.5;
  for(let c=0;c<=COLS;c++){ctx.beginPath();ctx.moveTo(c*TILE,0);ctx.lineTo(c*TILE,ROWS*TILE);ctx.stroke();}
  for(let r=0;r<=ROWS;r++){ctx.beginPath();ctx.moveTo(0,r*TILE);ctx.lineTo(COLS*TILE,r*TILE);ctx.stroke();}
}

function drawMiniMapTerrain(canvas: HTMLCanvasElement, digital: boolean) {
  const ctx=canvas.getContext("2d");if(!ctx)return;
  ctx.imageSmoothingEnabled=false;
  const mapData=digital?MAP_D:MAP;
  const base=digital?DTILE_BASE:TILE_BASE;
  const alt=digital?DTILE_ALT:TILE_ALT;
  for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++){
    ctx.fillStyle=(c+r)%2===0?(base[mapData[r][c]]??"#333"):(alt[mapData[r][c]]??"#444");
    ctx.fillRect(c*MT,r*MT,MT,MT);
  }
  const zones=digital?DIGITAL_ZONES:ZONES;
  const tints: Record<string,string>=digital
    ?{"Terminal":"rgba(0,255,65,0.25)","Server Room":"rgba(0,100,255,0.25)","Network Hub":"rgba(140,60,255,0.3)","Code Lab":"rgba(0,200,80,0.2)","Firewall":"rgba(255,60,0,0.3)"}
    :{"Water Collection":"rgba(74,138,184,0.35)","Solar System":"rgba(32,40,98,0.4)","Ancestral House":"rgba(160,82,45,0.4)","Workshop":"rgba(112,128,144,0.4)","Beach":"rgba(212,170,106,0.3)"};
  for(const z of zones){
    ctx.fillStyle=tints[z.name]??"transparent";
    ctx.fillRect(z.col*MT,z.row*MT,z.w*MT,z.h*MT);
  }
  ctx.strokeStyle=digital?"rgba(0,255,255,0.12)":"rgba(0,0,0,0.2)";ctx.lineWidth=0.5;
  for(let c=0;c<=COLS;c++){ctx.beginPath();ctx.moveTo(c*MT,0);ctx.lineTo(c*MT,ROWS*MT);ctx.stroke();}
  for(let r=0;r<=ROWS;r++){ctx.beginPath();ctx.moveTo(0,r*MT);ctx.lineTo(COLS*MT,r*MT);ctx.stroke();}
}

function drawCoin(ctx: CanvasRenderingContext2D, col: number, row: number, frame: number, idx: number) {
  const cx=col*TILE+TILE/2, cy=row*TILE+TILE/2+Math.sin(frame*0.05+idx*0.8)*3;
  const grd=ctx.createRadialGradient(cx,cy,2,cx,cy,14);
  grd.addColorStop(0,"rgba(255,210,0,0.5)");grd.addColorStop(1,"rgba(255,210,0,0)");
  ctx.fillStyle=grd;ctx.beginPath();ctx.arc(cx,cy,14,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#ffd700";ctx.fillRect(cx-6,cy-6,12,12);
  ctx.fillStyle="#fff8c0";ctx.fillRect(cx-5,cy-5,5,5);
  ctx.fillStyle="#c89800";ctx.fillRect(cx+1,cy-5,5,12);ctx.fillRect(cx-5,cy+1,11,5);
  ctx.fillStyle="#a07800";
  ctx.fillRect(cx-2,cy-3,5,2);ctx.fillRect(cx-3,cy-1,2,4);ctx.fillRect(cx-2,cy+1,5,2);
}

function drawComputerCoin(ctx: CanvasRenderingContext2D, col: number, row: number, frame: number) {
  const cx=col*TILE+TILE/2, cy=row*TILE+TILE/2+Math.sin(frame*0.03)*2;
  const grd=ctx.createRadialGradient(cx,cy,2,cx,cy,18);
  grd.addColorStop(0,"rgba(0,220,255,0.55)");grd.addColorStop(1,"rgba(0,100,255,0)");
  ctx.fillStyle=grd;ctx.beginPath();ctx.arc(cx,cy,18,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#2a2a40";ctx.fillRect(cx-9,cy,18,7);
  ctx.fillStyle="#1a1a30";ctx.fillRect(cx-8,cy-10,16,11);
  const hue=(frame*2)%360;
  ctx.fillStyle=`hsla(${hue},100%,60%,0.75)`;ctx.fillRect(cx-7,cy-9,14,9);
  ctx.fillStyle="rgba(255,255,255,0.5)";
  ctx.fillRect(cx-5,cy-8,8,1);ctx.fillRect(cx-5,cy-6,6,1);
  ctx.fillRect(cx-5,cy-4,7,1);ctx.fillRect(cx-5,cy-2,5,1);
  ctx.fillStyle="#3a3a5a";ctx.fillRect(cx-8,cy-1,16,2);
  ctx.fillStyle="#3a3a60";
  for(let i=0;i<5;i++)ctx.fillRect(cx-7+i*3,cy+2,2,2);
}

function drawZoneItem(ctx: CanvasRenderingContext2D, col: number, row: number, frame: number, color: string, idx: number) {
  const cx=col*TILE+TILE/2;
  const cy=row*TILE+TILE/2+Math.sin(frame*0.045+idx*1.1)*3;
  // Outer glow
  const grd=ctx.createRadialGradient(cx,cy,1,cx,cy,17);
  grd.addColorStop(0,rgba(color,0.5));grd.addColorStop(1,rgba(color,0));
  ctx.fillStyle=grd;ctx.beginPath();ctx.arc(cx,cy,17,0,Math.PI*2);ctx.fill();
  // Rotating diamond
  ctx.save();
  ctx.translate(cx,cy);
  ctx.rotate(Math.PI/4+(frame*0.009)%(Math.PI*2));
  ctx.fillStyle=color;
  ctx.fillRect(-7,-7,14,14);
  ctx.fillStyle="rgba(255,255,255,0.45)";
  ctx.fillRect(-6,-6,6,6);
  ctx.fillStyle="rgba(0,0,0,0.3)";
  ctx.fillRect(0,0,6,6);
  ctx.restore();
  // Small dot ring (3 orbiting dots)
  for(let i=0;i<3;i++){
    const angle=(frame*0.03+i*((Math.PI*2)/3))%(Math.PI*2);
    const dx=Math.cos(angle)*11, dy=Math.sin(angle)*11;
    ctx.fillStyle=rgba(color,0.55);
    ctx.fillRect(cx+dx-1,cy+dy-1,2,2);
  }
}

function drawPortalOverlay(ctx: CanvasRenderingContext2D, col: number, row: number, frame: number) {
  const px=col*TILE, py=row*TILE;
  const t=(frame*0.06)%(Math.PI*2);
  ctx.fillStyle=`rgba(60,20,180,${0.35+Math.sin(t)*0.1})`;ctx.fillRect(px,py,TILE,TILE);
  ctx.fillStyle=`rgba(80,60,255,${0.45+Math.sin(t+1)*0.1})`;ctx.fillRect(px+5,py+5,TILE-10,TILE-10);
  ctx.fillStyle=`rgba(120,100,255,${0.5+Math.sin(t+2)*0.1})`;ctx.fillRect(px+10,py+10,TILE-20,TILE-20);
  ctx.fillStyle=`rgba(180,160,255,${0.4+Math.sin(t*2)*0.15})`;ctx.fillRect(px+15,py+15,TILE-30,TILE-30);
  const g=ctx.createRadialGradient(px+TILE/2,py+TILE/2,0,px+TILE/2,py+TILE/2,TILE*0.8);
  g.addColorStop(0,"rgba(80,40,255,0.2)");g.addColorStop(1,"rgba(0,0,255,0)");
  ctx.fillStyle=g;ctx.fillRect(px-TILE/2,py-TILE/2,TILE*2,TILE*2);
}

function drawPlayer(ctx: CanvasRenderingContext2D, px: number, py: number, facing: string, frame: number, moving: boolean, digital: boolean) {
  const x=Math.round(px), y=Math.round(py);
  const wf=moving?Math.floor(frame/7)%2:0;
  ctx.save();
  ctx.globalAlpha=0.28;ctx.fillStyle="#000";
  ctx.beginPath();ctx.ellipse(x+PW/2,y+PH+2,PW/2-1,3,0,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha=1;
  if(digital){ctx.globalAlpha=0.35;ctx.fillStyle="#40c8ff";ctx.fillRect(x-1,y-4,PW+2,PH+8);ctx.globalAlpha=1;}
  ctx.fillStyle="#c8993a";ctx.fillRect(x-1,y+1,PW+2,4);
  ctx.fillStyle="#a07828";ctx.fillRect(x+2,y-3,PW-4,6);
  ctx.fillStyle="#7a4e10";ctx.fillRect(x+2,y+1,PW-4,2);
  ctx.fillStyle="#e8c4a0";ctx.fillRect(x+3,y+4,PW-6,7);
  ctx.fillStyle="#2a1a0a";
  if(facing==="left")ctx.fillRect(x+3,y+7,2,2);
  else if(facing==="right")ctx.fillRect(x+PW-5,y+7,2,2);
  else if(facing==="down"){ctx.fillRect(x+4,y+7,2,2);ctx.fillRect(x+PW-6,y+7,2,2);}
  ctx.fillStyle=digital?"#4ae0ff":"#c8812a";ctx.fillRect(x+2,y+11,PW-4,8);
  ctx.fillStyle=digital?"#80f0ff":"#d4914e";ctx.fillRect(x+4,y+11,PW-8,3);
  ctx.fillStyle="#e8c4a0";ctx.fillRect(x,y+11,2,6);ctx.fillRect(x+PW-2,y+11,2,6);
  const lY=wf===0?1:-1, rY=-lY;
  ctx.fillStyle="#3a2d22";ctx.fillRect(x+3,y+19+lY,5,5);ctx.fillRect(x+PW-8,y+19+rY,5,5);
  ctx.fillStyle="#c8a06a";ctx.fillRect(x+2,y+23+lY,6,3);ctx.fillRect(x+PW-8,y+23+rY,6,3);
  ctx.restore();
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NomadGame() {
  const canvasRef          = useRef<HTMLCanvasElement>(null);
  const miniMapRef         = useRef<HTMLCanvasElement>(null);
  const offMainRef         = useRef<HTMLCanvasElement | null>(null);
  const offDigitalRef      = useRef<HTMLCanvasElement | null>(null);
  const miniMainRef        = useRef<HTMLCanvasElement | null>(null);
  const miniDigitalRef     = useRef<HTMLCanvasElement | null>(null);
  const animRef            = useRef<number>(0);
  const frameRef           = useRef(0);
  const keysRef            = useRef<Set<string>>(new Set());
  const posRef             = useRef({ x: 5*TILE+TILE/2-PW/2, y: 7*TILE+TILE/2-PH/2 });
  const facingRef          = useRef("down");
  const collectedRef       = useRef<Set<number>>(new Set());
  const computerFoundRef   = useRef(false);
  const visitedMainRef     = useRef<Set<string>>(new Set());
  const visitedDigitalRef  = useRef<Set<string>>(new Set());
  const currentMapRef      = useRef<WorldMap>("main");
  const portalCooldownRef  = useRef(0);
  const zoneItemsRef       = useRef<Record<string,Set<number>>>({});
  const conqueredRef       = useRef<Set<string>>(new Set());
  const storyCardRef       = useRef<ZoneChallenge | null>(null);

  const [score,          setScore]          = useState(0);
  const [xp,             setXp]             = useState(0);
  const [location,       setLocation]       = useState("🌿 Nomad Map");
  const [collected,      setCollected]      = useState(0);
  const [computerFound,  setComputerFound]  = useState(false);
  const [currentMap,     setCurrentMap]     = useState<WorldMap>("main");
  const [visitedMain,    setVisitedMain]    = useState<Set<string>>(new Set());
  const [visitedDigital, setVisitedDigital] = useState<Set<string>>(new Set());
  const [conquered,      setConquered]      = useState<Set<string>>(new Set());
  const [storyCard,      setStoryCard]      = useState<ZoneChallenge | null>(null);
  const [message,        setMessage]        = useState("");
  const [won,            setWon]            = useState(false);
  const msgTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = useCallback((msg: string) => {
    setMessage(msg);
    if(msgTimerRef.current)clearTimeout(msgTimerRef.current);
    msgTimerRef.current=setTimeout(()=>setMessage(""),2500);
  }, []);

  const showCard = useCallback((ch: ZoneChallenge) => {
    storyCardRef.current=ch;
    setStoryCard(ch);
  }, []);

  const dismissCard = useCallback(() => {
    storyCardRef.current=null;
    setStoryCard(null);
  }, []);

  // Dismiss story card with keyboard
  useEffect(() => {
    if(!storyCard)return;
    const handler=(e: KeyboardEvent)=>{
      if(["Enter"," ","Escape"].includes(e.key)){e.preventDefault();dismissCard();}
    };
    window.addEventListener("keydown",handler);
    return ()=>window.removeEventListener("keydown",handler);
  },[storyCard,dismissCard]);

  const canWalk = useCallback((x: number, y: number, world: WorldMap): boolean => {
    const m=3;
    const mapData=world==="digital"?MAP_D:MAP;
    const imp=world==="digital"?IMPASSABLE_DIGITAL:IMPASSABLE_MAIN;
    return ([[x+m,y+m],[x+PW-m,y+m],[x+m,y+PH-m],[x+PW-m,y+PH-m]] as [number,number][])
      .every(([cx,cy])=>{
        const c=Math.floor(cx/TILE),r=Math.floor(cy/TILE);
        if(r<0||r>=ROWS||c<0||c>=COLS)return false;
        return !imp.has(mapData[r][c]);
      });
  },[]);

  const getZone = useCallback((x: number, y: number, world: WorldMap): string => {
    const pc=Math.floor((x+PW/2)/TILE), pr=Math.floor((y+PH/2)/TILE);
    const zones=world==="digital"?DIGITAL_ZONES:ZONES;
    for(const z of zones)
      if(pc>=z.col&&pc<z.col+z.w&&pr>=z.row&&pr<z.row+z.h)
        return `${z.emoji} ${z.name}`;
    return world==="digital"?"💻 Digital World":"🌿 Nomad Map";
  },[]);

  const isOnMainPortal = useCallback((x: number, y: number): boolean => {
    if(!computerFoundRef.current)return false;
    const pc=Math.floor((x+PW/2)/TILE), pr=Math.floor((y+PH/2)/TILE);
    return PORTAL_MAIN_COLS.includes(pc)&&PORTAL_MAIN_ROWS.includes(pr);
  },[]);

  const isOnDigitalPortal = useCallback((x: number, y: number): boolean => {
    const pc=Math.floor((x+PW/2)/TILE), pr=Math.floor((y+PH/2)/TILE);
    return pc>=18&&PORTAL_MAIN_ROWS.includes(pr);
  },[]);

  const checkCoins = useCallback((x: number, y: number) => {
    if(currentMapRef.current!=="main")return;
    const pcx=x+PW/2, pcy=y+PH/2;
    COIN_POSITIONS.forEach(([col,row],idx)=>{
      if(collectedRef.current.has(idx))return;
      const cx=col*TILE+TILE/2, cy=row*TILE+TILE/2;
      if(Math.sqrt((cx-pcx)**2+(cy-pcy)**2)<22){
        collectedRef.current=new Set([...collectedRef.current,idx]);
        const n=collectedRef.current.size;
        setCollected(n);setScore(s=>s+10);
        flash("🦀 +1 Carb Claw!");
        if(n===TOTAL_COINS)setWon(true);
      }
    });
    if(!computerFoundRef.current){
      const cx=COMPUTER_COL*TILE+TILE/2, cy=COMPUTER_ROW*TILE+TILE/2;
      if(Math.sqrt((cx-pcx)**2+(cy-pcy)**2)<26){
        computerFoundRef.current=true;setComputerFound(true);setScore(s=>s+50);
        flash("💻 Computer found! Digital World unlocked! →");
      }
    }
  },[flash]);

  const checkZoneItems = useCallback((x: number, y: number, world: WorldMap) => {
    const challenges=world==="digital"?DIGITAL_CHALLENGES:ZONE_CHALLENGES;
    const pcx=x+PW/2, pcy=y+PH/2;
    for(const ch of challenges){
      if(conqueredRef.current.has(ch.zoneKey))continue;
      if(!zoneItemsRef.current[ch.zoneKey]) zoneItemsRef.current[ch.zoneKey]=new Set();
      const itemsCollected=zoneItemsRef.current[ch.zoneKey];
      ch.items.forEach(([col,row],idx)=>{
        if(itemsCollected.has(idx))return;
        const cx=col*TILE+TILE/2, cy=row*TILE+TILE/2;
        if(Math.sqrt((cx-pcx)**2+(cy-pcy)**2)<22){
          itemsCollected.add(idx);
          if(itemsCollected.size===ch.items.length){
            conqueredRef.current=new Set([...conqueredRef.current,ch.zoneKey]);
            setConquered(new Set(conqueredRef.current));
            setXp(prev=>prev+ch.reward);
            showCard(ch);
          }
        }
      });
    }
  },[showCard]);

  const setKey = useCallback((key: string, val: boolean) => {
    if(val)keysRef.current.add(key);else keysRef.current.delete(key);
  },[]);

  const reset = useCallback(()=>{
    collectedRef.current=new Set();computerFoundRef.current=false;
    visitedMainRef.current=new Set();visitedDigitalRef.current=new Set();
    conqueredRef.current=new Set();zoneItemsRef.current={};
    storyCardRef.current=null;currentMapRef.current="main";
    posRef.current={x:5*TILE+TILE/2-PW/2,y:7*TILE+TILE/2-PH/2};
    facingRef.current="down";portalCooldownRef.current=0;
    setCollected(0);setScore(0);setXp(0);setComputerFound(false);setCurrentMap("main");
    setVisitedMain(new Set());setVisitedDigital(new Set());setConquered(new Set());
    setLocation("🌿 Nomad Map");setWon(false);setMessage("");setStoryCard(null);
  },[]);

  useEffect(()=>{
    const canvas=canvasRef.current, miniMap=miniMapRef.current;
    if(!canvas||!miniMap)return;
    const ctx=canvas.getContext("2d");if(!ctx)return;
    ctx.imageSmoothingEnabled=false;

    const make=(w:number,h:number)=>{const c=document.createElement("canvas");c.width=w;c.height=h;return c;};
    const offMain=make(COLS*TILE,ROWS*TILE);const omc=offMain.getContext("2d")!;omc.imageSmoothingEnabled=false;drawMainMap(omc);offMainRef.current=offMain;
    const offDig=make(COLS*TILE,ROWS*TILE);const odc=offDig.getContext("2d")!;odc.imageSmoothingEnabled=false;drawDigitalMap(odc);offDigitalRef.current=offDig;
    const mMain=make(COLS*MT,ROWS*MT);drawMiniMapTerrain(mMain,false);miniMainRef.current=mMain;
    const mDig=make(COLS*MT,ROWS*MT);drawMiniMapTerrain(mDig,true);miniDigitalRef.current=mDig;

    const mmCtx=miniMap.getContext("2d")!;mmCtx.imageSmoothingEnabled=false;
    mmCtx.drawImage(mMain,0,0);

    const onKeyDown=(e:KeyboardEvent)=>{keysRef.current.add(e.key);if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key))e.preventDefault();};
    const onKeyUp=(e:KeyboardEvent)=>keysRef.current.delete(e.key);
    window.addEventListener("keydown",onKeyDown);window.addEventListener("keyup",onKeyUp);

    let lastZone="🌿 Nomad Map";

    const loop=()=>{
      frameRef.current++;
      if(storyCardRef.current){animRef.current=requestAnimationFrame(loop);return;}
      const keys=keysRef.current, pos=posRef.current, world=currentMapRef.current;
      let dx=0,dy=0;
      if(keys.has("ArrowLeft")||keys.has("a")){dx-=SPEED;facingRef.current="left";}
      if(keys.has("ArrowRight")||keys.has("d")){dx+=SPEED;facingRef.current="right";}
      if(keys.has("ArrowUp")||keys.has("w")){dy-=SPEED;facingRef.current="up";}
      if(keys.has("ArrowDown")||keys.has("s")){dy+=SPEED;facingRef.current="down";}
      const moving=dx!==0||dy!==0;
      const nx=Math.max(0,Math.min(COLS*TILE-PW,pos.x+dx));
      const ny=Math.max(0,Math.min(ROWS*TILE-PH,pos.y+dy));
      if(canWalk(nx,pos.y,world))posRef.current.x=nx;
      if(canWalk(posRef.current.x,ny,world))posRef.current.y=ny;

      checkCoins(posRef.current.x,posRef.current.y);
      checkZoneItems(posRef.current.x,posRef.current.y,world);

      if(portalCooldownRef.current>0)portalCooldownRef.current--;
      if(portalCooldownRef.current===0){
        if(world==="main"&&isOnMainPortal(posRef.current.x,posRef.current.y)){
          currentMapRef.current="digital";setCurrentMap("digital");
          posRef.current={x:15*TILE,y:6*TILE};portalCooldownRef.current=60;
          lastZone="💻 Digital World";setLocation("💻 Digital World");
          flash("⚡ Entering Digital World...");
        } else if(world==="digital"&&isOnDigitalPortal(posRef.current.x,posRef.current.y)){
          currentMapRef.current="main";setCurrentMap("main");
          posRef.current={x:16*TILE,y:6*TILE};portalCooldownRef.current=60;
          lastZone="🌿 Nomad Map";setLocation("🌿 Nomad Map");
          flash("🌿 Back to Nomad Map...");
        }
      }

      const curWorld=currentMapRef.current;
      const zone=getZone(posRef.current.x,posRef.current.y,curWorld);
      if(zone!==lastZone){
        lastZone=zone;setLocation(zone);
        const def=curWorld==="digital"?"💻 Digital World":"🌿 Nomad Map";
        if(zone!==def){
          if(curWorld==="main"&&!visitedMainRef.current.has(zone)){visitedMainRef.current=new Set([...visitedMainRef.current,zone]);setVisitedMain(new Set(visitedMainRef.current));}
          else if(curWorld==="digital"&&!visitedDigitalRef.current.has(zone)){visitedDigitalRef.current=new Set([...visitedDigitalRef.current,zone]);setVisitedDigital(new Set(visitedDigitalRef.current));}
        }
      }

      // ── Render ───────────────────────────────────────
      const offscreen=curWorld==="digital"?offDigitalRef.current:offMainRef.current;
      if(offscreen)ctx.drawImage(offscreen,0,0);

      if(curWorld==="main"&&computerFoundRef.current){
        for(const r of PORTAL_MAIN_ROWS) for(const c of PORTAL_MAIN_COLS) drawPortalOverlay(ctx,c,r,frameRef.current);
        ctx.save();ctx.fillStyle="rgba(100,60,255,0.9)";ctx.fillRect(PORTAL_MAIN_COLS[0]*TILE-2,PORTAL_MAIN_ROWS[0]*TILE-16,88,14);
        ctx.fillStyle="#d0c0ff";ctx.font="bold 9px monospace";ctx.fillText("▶ DIGITAL PORTAL",PORTAL_MAIN_COLS[0]*TILE+1,PORTAL_MAIN_ROWS[0]*TILE-5);ctx.restore();
      }
      if(curWorld==="digital"){
        for(const r of PORTAL_MAIN_ROWS) drawPortalOverlay(ctx,18,r,frameRef.current);
        ctx.save();ctx.fillStyle="rgba(60,40,200,0.9)";ctx.fillRect(18*TILE-2,PORTAL_MAIN_ROWS[0]*TILE-16,76,14);
        ctx.fillStyle="#c0b0ff";ctx.font="bold 9px monospace";ctx.fillText("◀ EXIT PORTAL",18*TILE+1,PORTAL_MAIN_ROWS[0]*TILE-5);ctx.restore();
      }

      // Carb Claw coins
      if(curWorld==="main"){
        COIN_POSITIONS.forEach(([col,row],idx)=>{if(!collectedRef.current.has(idx))drawCoin(ctx,col,row,frameRef.current,idx);});
        if(!computerFoundRef.current) drawComputerCoin(ctx,COMPUTER_COL,COMPUTER_ROW,frameRef.current);
      }

      // Zone challenge items
      const challenges=curWorld==="digital"?DIGITAL_CHALLENGES:ZONE_CHALLENGES;
      for(const ch of challenges){
        if(conqueredRef.current.has(ch.zoneKey))continue;
        const done=zoneItemsRef.current[ch.zoneKey]??new Set<number>();
        ch.items.forEach(([col,row],idx)=>{if(!done.has(idx))drawZoneItem(ctx,col,row,frameRef.current,ch.color,idx);});
      }

      drawPlayer(ctx,posRef.current.x,posRef.current.y,facingRef.current,frameRef.current,moving,curWorld==="digital");

      // ── Mini-map ─────────────────────────────────────
      const miniTerrain=curWorld==="digital"?miniDigitalRef.current:miniMainRef.current;
      if(miniTerrain){
        mmCtx.drawImage(miniTerrain,0,0);
        if(curWorld==="main"){
          COIN_POSITIONS.forEach(([col,row],idx)=>{if(collectedRef.current.has(idx))return;mmCtx.fillStyle="#ffd700";mmCtx.fillRect(col*MT+3,row*MT+3,4,4);});
          if(!computerFoundRef.current){mmCtx.fillStyle="#00e5ff";mmCtx.fillRect(COMPUTER_COL*MT+3,COMPUTER_ROW*MT+3,4,4);}
          if(computerFoundRef.current){
            const blink=frameRef.current%30<20;
            if(blink){mmCtx.fillStyle="rgba(100,60,255,0.8)";for(const r of PORTAL_MAIN_ROWS) for(const c of PORTAL_MAIN_COLS) mmCtx.fillRect(c*MT,r*MT,MT,MT);}
          }
          // Zone item dots on mini-map
          for(const ch of ZONE_CHALLENGES){
            if(conqueredRef.current.has(ch.zoneKey))continue;
            const done=zoneItemsRef.current[ch.zoneKey]??new Set<number>();
            ch.items.forEach(([col,row],idx)=>{if(done.has(idx))return;mmCtx.fillStyle=ch.color;mmCtx.fillRect(col*MT+2,row*MT+2,3,3);});
          }
        } else {
          const blink=frameRef.current%30<20;
          if(blink){mmCtx.fillStyle="rgba(80,40,255,0.8)";for(const r of PORTAL_MAIN_ROWS) mmCtx.fillRect(18*MT,r*MT,MT,MT);}
          for(const ch of DIGITAL_CHALLENGES){
            if(conqueredRef.current.has(ch.zoneKey))continue;
            const done=zoneItemsRef.current[ch.zoneKey]??new Set<number>();
            ch.items.forEach(([col,row],idx)=>{if(done.has(idx))return;mmCtx.fillStyle=ch.color;mmCtx.fillRect(col*MT+2,row*MT+2,3,3);});
          }
        }
        const dotX=Math.round((posRef.current.x+PW/2)*MT/TILE);
        const dotY=Math.round((posRef.current.y+PH/2)*MT/TILE);
        if(frameRef.current%30<22){
          mmCtx.fillStyle=curWorld==="digital"?"#00e5ff":"#ff4400";mmCtx.fillRect(dotX-3,dotY-3,6,6);
          mmCtx.fillStyle=curWorld==="digital"?"#80f0ff":"#ff8866";mmCtx.fillRect(dotX-1,dotY-1,2,2);
        }
      }

      animRef.current=requestAnimationFrame(loop);
    };

    animRef.current=requestAnimationFrame(loop);
    return ()=>{cancelAnimationFrame(animRef.current);window.removeEventListener("keydown",onKeyDown);window.removeEventListener("keyup",onKeyUp);};
  },[canWalk,checkCoins,checkZoneItems,getZone,isOnMainPortal,isOnDigitalPortal,flash]);

  // ─── Panel data ───────────────────────────────────────────────────────────
  const activeZones    = currentMap==="digital"?DIGITAL_ZONES:ZONES;
  const activeChallenges = currentMap==="digital"?DIGITAL_CHALLENGES:ZONE_CHALLENGES;
  const activeVisited  = currentMap==="digital"?visitedDigital:visitedMain;
  const worldLabel     = currentMap==="digital"?"💻 DIGITAL":"🌿 MAIN";
  const worldColor     = currentMap==="digital"?"#00e5ff":"#ffd700";
  const totalConquered = activeChallenges.filter(ch=>conquered.has(ch.zoneKey)).length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8" style={{background:currentMap==="digital"?"#000008":"#0c0a09",transition:"background 1s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .pf{font-family:'Press Start 2P',monospace;}
        @keyframes pfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes pdot{0%,100%{opacity:1}50%{opacity:.2}}
        @keyframes pslide{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}
        @keyframes worldIn{from{opacity:0;transform:scale(1.02)}to{opacity:1;transform:scale(1)}}
        @keyframes cardIn{from{opacity:0;transform:translateY(16px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .coin-float{animation:pfloat 1.2s ease-in-out infinite;display:inline-block;}
        .zone-blink{animation:pdot 1s ease-in-out infinite;}
        .zone-slide{animation:pslide .3s ease both;}
        .world-in{animation:worldIn .5s ease both;}
        .card-in{animation:cardIn .25s ease both;}
      `}</style>

      {/* Top bar */}
      <div className="w-full mb-3 flex items-center justify-between" style={{maxWidth:COLS*TILE+16+220}}>
        <Link href="/" className="pf text-[9px] text-amber-400 hover:text-amber-300 transition-colors">← Back</Link>
        <h1 className="pf text-[10px] tracking-wider" style={{color:worldColor}}>NOMAD WORLD</h1>
        <div className="flex gap-3 items-center">
          <span className="pf text-[7px] text-green-400">{xp} XP</span>
          <span className="pf text-[9px]" style={{color:worldColor}}>{score} PTS</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 w-full items-start" style={{maxWidth:COLS*TILE+16+220}}>

        {/* ── Canvas ── */}
        <div className="relative flex-1 min-w-0 world-in" style={{maxWidth:COLS*TILE}}>
          <div className="absolute inset-0 pointer-events-none z-10" style={{boxShadow:`0 0 0 4px ${worldColor}, 0 0 0 8px ${worldColor}55, 0 0 24px ${worldColor}33`}}/>
          <canvas ref={canvasRef} width={COLS*TILE} height={ROWS*TILE} style={{display:"block",width:"100%",imageRendering:"pixelated"}}/>
          <div className="absolute top-2 left-2 z-20 bg-black/80 px-3 py-1.5" style={{border:`2px solid ${worldColor}55`}}>
            <p className="pf text-[7px]" style={{color:worldColor}}>{location}</p>
          </div>
          {currentMap==="main"&&(
            <div className="absolute top-2 right-2 z-20 bg-black/80 px-3 py-1.5" style={{border:"2px solid #ffd70066"}}>
              <p className="pf text-[7px] text-amber-300">🦀 {collected}/{TOTAL_COINS}</p>
            </div>
          )}
          <div className="absolute bottom-2 left-2 z-20 bg-black/80 px-2 py-1" style={{border:`1px solid ${worldColor}44`}}>
            <p className="pf text-[6px]" style={{color:worldColor}}>{worldLabel} WORLD</p>
          </div>
          {message&&(
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-black/90 px-5 py-3" style={{border:`3px solid ${worldColor}`}}>
              <p className="pf text-[9px] whitespace-nowrap" style={{color:worldColor}}>{message}</p>
            </div>
          )}
          {won&&(
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/70">
              <div className="bg-stone-900 p-8 text-center" style={{border:"4px solid #ffd700"}}>
                <p className="pf text-sm text-amber-400 mb-4">YOU WIN!</p>
                <div className="coin-float text-3xl mb-4">🦀</div>
                <p className="pf text-[8px] text-stone-300 mb-2">All Carb Claws collected!</p>
                <p className="pf text-[10px] text-amber-400 mb-1">{score} pts</p>
                <p className="pf text-[8px] text-green-400 mb-6">{xp} xp</p>
                <button onClick={reset} className="pf text-[8px] bg-amber-500 text-stone-900 px-4 py-2 hover:bg-amber-400 transition-colors">Play Again</button>
              </div>
            </div>
          )}
        </div>

        {/* ── Panel ── */}
        <div className="w-full lg:w-[220px] flex-shrink-0 flex flex-col" style={{background:"#0c0a09",border:`4px solid ${worldColor}88`,boxShadow:`0 0 0 2px ${worldColor}44, 0 0 16px ${worldColor}22`,transition:"border-color 1s, box-shadow 1s"}}>

          <div className="px-3 py-2 flex items-center justify-between" style={{borderBottom:`2px solid ${worldColor}33`,background:"#120e00"}}>
            <p className="pf text-[8px]" style={{color:worldColor}}>📍 MAP</p>
            <p className="pf text-[7px] text-stone-600">{activeVisited.size}/{activeZones.length}</p>
          </div>

          {/* Mini-map */}
          <div className="p-2" style={{borderBottom:`2px solid ${worldColor}22`}}>
            <canvas ref={miniMapRef} width={COLS*MT} height={ROWS*MT} style={{display:"block",width:"100%",imageRendering:"pixelated"}}/>
            <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5">
              {[
                {color:currentMap==="digital"?"#00e5ff":"#ff4400",label:"You"},
                {color:"#ffd700",label:"Coin"},
                {color:currentMap==="digital"?"#40ffff":"#40a8ff",label:"Quest"},
                ...(computerFound&&currentMap==="main"?[{color:"#8844ff",label:"Portal"}]:[]),
                ...(currentMap==="main"&&!computerFound?[{color:"#00e5ff",label:"💻??"}]:[]),
              ].map(({color,label})=>(
                <div key={label} className="flex items-center gap-1">
                  <div className="h-2 w-2 shrink-0" style={{background:color}}/>
                  <span className="pf text-[6px] text-stone-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* World switcher */}
          {computerFound&&(
            <div className="px-3 py-2 flex items-center gap-2" style={{borderBottom:`2px solid ${worldColor}22`,background:"#08040c"}}>
              <div className="flex gap-1 flex-wrap">
                {(["main","digital"] as WorldMap[]).map(w=>(
                  <div key={w} className="pf text-[6px] px-2 py-1" style={{background:currentMap===w?`${worldColor}22`:"transparent",border:`1px solid ${currentMap===w?worldColor:"#333"}`,color:currentMap===w?worldColor:"#444"}}>
                    {w==="main"?"🌿 MAIN":"💻 DIGITAL"}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Discoveries */}
          <div className="px-3 py-2" style={{borderBottom:`2px solid ${worldColor}22`,background:"#120e00"}}>
            <div className="flex items-center justify-between">
              <p className="pf text-[7px] text-stone-500 tracking-widest">QUESTS</p>
              <p className="pf text-[6px] text-green-500">{totalConquered}/{activeChallenges.length} done</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {activeZones.map((z)=>{
              const key=`${z.emoji} ${z.name}`;
              const challenge=activeChallenges.find(ch=>ch.zoneKey===key);
              const isConquered=conquered.has(key);
              const isVisited=activeVisited.has(key);
              const isCurrent=location===key;
              const itemsDone=zoneItemsRef.current[key]?.size??0;
              const itemsTotal=challenge?.items.length??0;
              const partialProgress=!isConquered&&itemsDone>0;
              return (
                <div key={z.name} className={`px-3 py-2.5 ${isVisited&&!isConquered?"zone-slide":""}`}
                  style={{borderBottom:"1px solid #1a1200",background:isCurrent?"#180e0a":"transparent",transition:"background .3s"}}>
                  <div className="flex items-center gap-2">
                    <span className="pf text-[9px] shrink-0 w-3" style={{color:isConquered?"#ffd700":isCurrent?worldColor:isVisited?"#86efac":"#2a2a2a"}}>
                      {isConquered?"⭐":isCurrent?"▶":isVisited?"○":"·"}
                    </span>
                    <span className="text-base shrink-0" style={{opacity:isVisited||isCurrent?1:0.2,filter:isVisited||isCurrent?"none":"grayscale(1)"}}>
                      {z.emoji}
                    </span>
                    <span className="pf text-[7px] truncate flex-1" style={{color:isConquered?"#ffd700":isCurrent?worldColor:isVisited?"#86efac":"#2a2a2a"}}>
                      {z.name}
                    </span>
                    {isCurrent&&!isConquered&&<span className="zone-blink h-1.5 w-1.5 rounded-full shrink-0" style={{background:worldColor}}/>}
                  </div>
                  {/* Quest progress bar */}
                  {challenge&&(isVisited||isCurrent)&&!isConquered&&(
                    <div className="mt-1.5 ml-5">
                      <p className="pf text-[5px] text-stone-600 mb-0.5 truncate">{challenge.title}</p>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1" style={{background:"#1a1200",border:`1px solid ${challenge.color}33`}}>
                          <div className="h-full" style={{width:`${(itemsDone/itemsTotal)*100}%`,background:challenge.color,transition:"width .4s"}}/>
                        </div>
                        <span className="pf text-[5px]" style={{color:challenge.color}}>{itemsDone}/{itemsTotal}</span>
                      </div>
                    </div>
                  )}
                  {isConquered&&challenge&&(
                    <div className="mt-1 ml-5">
                      <p className="pf text-[5px] text-yellow-600 truncate">⭐ {challenge.title}</p>
                      <p className="pf text-[5px] text-green-700 mt-0.5">+{challenge.reward} XP earned</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Computer hint */}
          {!computerFound&&(
            <div className="px-3 py-2" style={{borderTop:"2px solid #1e1800",background:"#08040c"}}>
              <p className="pf text-[6px] text-stone-700 leading-relaxed">🔍 Find the<br/><span className="text-cyan-900">💻 computer</span><br/>to unlock the<br/>Digital World</p>
            </div>
          )}

          {/* Footer stats */}
          <div className="px-3 py-3" style={{borderTop:`2px solid ${worldColor}22`}}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="pf text-[6px] text-stone-600">CONQUERED</p>
              <p className="pf text-[7px]" style={{color:worldColor}}>{totalConquered}/{activeChallenges.length}</p>
            </div>
            <div className="h-2 w-full" style={{background:"#1a1400",border:`1px solid ${worldColor}33`}}>
              <div className="h-full" style={{width:`${(totalConquered/activeChallenges.length)*100}%`,background:`linear-gradient(90deg, ${worldColor}88, ${worldColor})`,transition:"width .5s ease"}}/>
            </div>
            {currentMap==="main"&&(
              <div className="mt-2 flex items-center justify-between">
                <p className="pf text-[6px] text-stone-600">🦀 CLAWS</p>
                <p className="pf text-[7px] text-amber-500">{collected}/{TOTAL_COINS}</p>
              </div>
            )}
            <div className="mt-1 flex items-center justify-between">
              <p className="pf text-[6px] text-stone-600">TOTAL XP</p>
              <p className="pf text-[7px] text-green-400">{xp}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="pf text-[7px] text-stone-600 mt-4 text-center">
        Arrow keys / WASD · collect 🦀 · find quest ◆ items · find 💻 for digital world
      </p>

      {/* Mobile D-pad */}
      <div className="mt-4 grid grid-cols-3 gap-2 lg:hidden select-none">
        <div/>
        <button className="bg-stone-800 border-2 border-stone-700 pf text-xs text-white h-12 w-12 flex items-center justify-center mx-auto active:bg-stone-700 active:border-amber-500"
          onPointerDown={()=>setKey("ArrowUp",true)} onPointerUp={()=>setKey("ArrowUp",false)} onPointerLeave={()=>setKey("ArrowUp",false)}>▲</button>
        <div/>
        <button className="bg-stone-800 border-2 border-stone-700 pf text-xs text-white h-12 w-12 flex items-center justify-center mx-auto active:bg-stone-700 active:border-amber-500"
          onPointerDown={()=>setKey("ArrowLeft",true)} onPointerUp={()=>setKey("ArrowLeft",false)} onPointerLeave={()=>setKey("ArrowLeft",false)}>◄</button>
        <button className="bg-stone-800 border-2 border-stone-700 pf text-xs text-white h-12 w-12 flex items-center justify-center mx-auto active:bg-stone-700 active:border-amber-500"
          onPointerDown={()=>setKey("ArrowDown",true)} onPointerUp={()=>setKey("ArrowDown",false)} onPointerLeave={()=>setKey("ArrowDown",false)}>▼</button>
        <button className="bg-stone-800 border-2 border-stone-700 pf text-xs text-white h-12 w-12 flex items-center justify-center mx-auto active:bg-stone-700 active:border-amber-500"
          onPointerDown={()=>setKey("ArrowRight",true)} onPointerUp={()=>setKey("ArrowRight",false)} onPointerLeave={()=>setKey("ArrowRight",false)}>►</button>
      </div>

      {/* ── Story Card Modal ── */}
      {storyCard&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
          <div className="card-in w-full max-w-sm" style={{background:"#0a0804",border:`4px solid ${storyCard.color}`,boxShadow:`0 0 0 2px ${storyCard.color}44, 0 0 32px ${storyCard.color}33`}}>
            {/* Card header */}
            <div className="px-5 py-4" style={{borderBottom:`2px solid ${storyCard.color}33`,background:"#120e00"}}>
              <div className="flex items-center justify-between mb-2">
                <p className="pf text-[8px]" style={{color:storyCard.color}}>ZONE CONQUERED</p>
                <span className="text-lg">⭐</span>
              </div>
              <p className="pf text-[7px] text-stone-400">{storyCard.zoneKey}</p>
            </div>
            {/* Challenge name */}
            <div className="px-5 pt-4 pb-2">
              <p className="pf text-[9px] leading-relaxed" style={{color:storyCard.color}}>{storyCard.title}</p>
            </div>
            {/* Story */}
            <div className="px-5 pb-4">
              <p className="text-[11px] text-stone-300 leading-relaxed" style={{fontFamily:"monospace"}}>
                {storyCard.story}
              </p>
            </div>
            {/* XP reward */}
            <div className="px-5 pb-4 flex items-center gap-3">
              <div className="h-px flex-1" style={{background:`${storyCard.color}33`}}/>
              <p className="pf text-[8px] text-green-400">+{storyCard.reward} XP</p>
              <div className="h-px flex-1" style={{background:`${storyCard.color}33`}}/>
            </div>
            {/* Continue button */}
            <div className="px-5 pb-5">
              <button
                onClick={dismissCard}
                className="w-full pf text-[8px] py-3 transition-all hover:opacity-90"
                style={{background:storyCard.color,color:"#0a0804"}}
              >
                Continue →
              </button>
              <p className="pf text-[6px] text-stone-700 text-center mt-2">Press Enter / Space to continue</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
