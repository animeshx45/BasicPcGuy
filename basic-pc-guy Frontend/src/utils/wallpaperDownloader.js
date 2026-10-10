// High-Resolution Wallpaper Exporter & Downloader for Basic PC Guy

export const DEVICE_PRESETS = {
  windows: { id: 'windows', label: 'Windows PC (4K)', width: 3840, height: 2160, aspect: '16:9', res: '3840 × 2160' },
  mac: { id: 'mac', label: 'Mac Studio (5K)', width: 5120, height: 2880, aspect: '16:9', res: '5120 × 2880' },
  mobile: { id: 'mobile', label: 'Phone (Mobile)', width: 1290, height: 2796, aspect: '9:16', res: '1290 × 2796' },
  ultrawide: { id: 'ultrawide', label: 'Ultrawide 21:9', width: 3440, height: 1440, aspect: '21:9', res: '3440 × 1440' },
  surface: { id: 'surface', label: 'Surface (3:2)', width: 2880, height: 1920, aspect: '3:2', res: '2880 × 1920' },
};

function triggerBlobDownload(blob, filename) {
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  }, 2000);
}

function triggerDirectDownload(url, filename) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
  }, 2000);
}

// Find any real high-resolution image URL attached to the wallpaper
export function getWallpaperDownloadUrl(wp, presetKey = 'windows') {
  if (!wp) return null;

  // 1. Direct downloads dictionary (handles object or JSON string)
  if (wp.downloads) {
    let dl = wp.downloads;
    if (typeof dl === 'string') {
      try { dl = JSON.parse(dl.replace(/'/g, '"')); } catch {}
    }
    if (typeof dl === 'object' && dl !== null) {
      if (dl[presetKey]?.url) return dl[presetKey].url;
      if (dl['desktop-4k']?.url) return dl['desktop-4k'].url;
      if (dl['desktop-8k']?.url) return dl['desktop-8k'].url;
      for (const val of Object.values(dl)) {
        if (typeof val === 'string' && val.startsWith('http')) return val;
        if (val?.url) return val.url;
      }
    }
  }

  // 2. Direct wallpaper imageUrl
  if (wp.imageUrl && typeof wp.imageUrl === 'string' && wp.imageUrl.startsWith('http')) return wp.imageUrl;
  if (wp.image && typeof wp.image === 'string' && wp.image.startsWith('http')) return wp.image;
  if (wp.coverImage && typeof wp.coverImage === 'string' && wp.coverImage.startsWith('http')) return wp.coverImage;
  if (wp.poster && typeof wp.poster === 'string' && wp.poster.startsWith('http')) return wp.poster;
  if (typeof wp.bgType === 'string' && wp.bgType.startsWith('http')) return wp.bgType;

  return null;
}

// Render procedural vector artworks directly to a pristine canvas at target resolution
function renderProceduralToCanvas(ctx, bgType, width, height) {
  const type = bgType || 'bliss';

  switch (type) {
    case 'bliss': {
      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.7);
      skyGrad.addColorStop(0, '#0284c7');
      skyGrad.addColorStop(0.5, '#38bdf8');
      skyGrad.addColorStop(1, '#bae6fd');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Clouds glow
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.filter = 'blur(40px)';
      ctx.beginPath();
      ctx.ellipse(width * 0.25, height * 0.25, width * 0.2, height * 0.1, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(width * 0.75, height * 0.3, width * 0.25, height * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Hill Back
      ctx.save();
      const backHillGrad = ctx.createLinearGradient(0, height * 0.4, 0, height);
      backHillGrad.addColorStop(0, '#84cc16');
      backHillGrad.addColorStop(1, '#4d7c0f');
      ctx.fillStyle = backHillGrad;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.55);
      ctx.bezierCurveTo(width * 0.25, height * 0.3, width * 0.5, height * 0.45, width, height * 0.35);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Hill Front
      const frontHillGrad = ctx.createLinearGradient(0, height * 0.45, 0, height);
      frontHillGrad.addColorStop(0, '#a3e635');
      frontHillGrad.addColorStop(0.5, '#65a30d');
      frontHillGrad.addColorStop(1, '#3f6212');
      ctx.fillStyle = frontHillGrad;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.48);
      ctx.bezierCurveTo(width * 0.35, height * 0.2, width * 0.7, height * 0.48, width, height * 0.4);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      break;
    }

    case 'mosaic': {
      // Midnight violet background
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, width, height);

      const scaleX = width / 800;
      const scaleY = height / 500;
      ctx.save();
      ctx.scale(scaleX, scaleY);

      // Rainbow wave
      const gradRainbow = ctx.createLinearGradient(0, 240, 800, 340);
      gradRainbow.addColorStop(0, '#06b6d4');
      gradRainbow.addColorStop(0.3, '#3b82f6');
      gradRainbow.addColorStop(0.6, '#ec4899');
      gradRainbow.addColorStop(1, '#10b981');
      ctx.fillStyle = gradRainbow;
      ctx.beginPath();
      ctx.moveTo(0, 240);
      ctx.bezierCurveTo(150, 180, 300, 260, 450, 230);
      ctx.bezierCurveTo(600, 200, 700, 270, 800, 220);
      ctx.lineTo(800, 340);
      ctx.lineTo(0, 340);
      ctx.closePath();
      ctx.fill();

      // Sun semi-circle
      const gradSun = ctx.createLinearGradient(110, 340, 290, 340);
      gradSun.addColorStop(0, '#ff5722');
      gradSun.addColorStop(1, '#ff9800');
      ctx.fillStyle = gradSun;
      ctx.beginPath();
      ctx.arc(200, 340, 90, Math.PI, 0, false);
      ctx.fill();

      // Arches on top
      const gradCyan = ctx.createLinearGradient(0, 0, 120, 240);
      gradCyan.addColorStop(0, '#06b6d4');
      gradCyan.addColorStop(1, '#10b981');
      ctx.fillStyle = gradCyan;
      ctx.fillRect(0, 0, 120, 240);

      const gradOrange = ctx.createLinearGradient(180, 120, 300, 240);
      gradOrange.addColorStop(0, '#ff5722');
      gradOrange.addColorStop(1, '#ff9800');
      ctx.fillStyle = gradOrange;
      ctx.fillRect(180, 120, 120, 120);

      // Bottom shapes
      const gradPink = ctx.createLinearGradient(0, 340, 800, 500);
      gradPink.addColorStop(0, '#e91e63');
      gradPink.addColorStop(1, '#8b5cf6');
      ctx.fillStyle = gradPink;
      ctx.beginPath();
      ctx.moveTo(0, 340);
      ctx.bezierCurveTo(180, 440, 360, 360, 540, 400);
      ctx.bezierCurveTo(640, 420, 720, 400, 800, 380);
      ctx.lineTo(800, 500);
      ctx.lineTo(0, 500);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
      break;
    }

    case 'silicon': {
      // Pitch obsidian with subtle grid
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Die Frame
      const frameW = width * 0.65;
      const frameH = height * 0.65;
      const frameX = (width - frameW) / 2;
      const frameY = (height - frameH) / 2;

      ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
      ctx.lineWidth = 3;
      ctx.strokeRect(frameX, frameY, frameW, frameH);

      // CCX cores
      const cols = 4;
      const rows = 2;
      const gap = 16;
      const cellW = (frameW - gap * (cols + 1)) / cols;
      const cellH = (frameH - gap * (rows + 1)) / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = frameX + gap + c * (cellW + gap);
          const cy = frameY + gap + r * (cellH + gap);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(cx, cy, cellW, cellH);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
          ctx.strokeRect(cx, cy, cellW, cellH);

          // Core line
          ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
          ctx.fillRect(cx + 8, cy + cellH - 14, cellW - 16, 6);
        }
      }

      // Copper corner accents
      ctx.fillStyle = '#d97706';
      ctx.font = `${Math.round(height * 0.018)}px monospace`;
      ctx.fillText('5nm LITHOGRAPHY // INFINITY FABRIC', frameX, frameY + frameH + 32);
      break;
    }

    case 'trace': {
      // 0-Nit true black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Copper trace lines
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.25);
      ctx.lineTo(width * 0.3, height * 0.25);
      ctx.lineTo(width * 0.45, height * 0.45);
      ctx.lineTo(width * 0.7, height * 0.45);
      ctx.lineTo(width * 0.85, height * 0.65);
      ctx.lineTo(width, height * 0.65);
      ctx.stroke();

      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.3);
      ctx.lineTo(width * 0.28, height * 0.3);
      ctx.lineTo(width * 0.43, height * 0.5);
      ctx.lineTo(width * 0.68, height * 0.5);
      ctx.lineTo(width * 0.83, height * 0.7);
      ctx.lineTo(width, height * 0.7);
      ctx.stroke();

      // Glowing circuit pads
      ctx.fillStyle = '#f59e0b';
      const pads = [
        [width * 0.45, height * 0.45],
        [width * 0.7, height * 0.45],
        [width * 0.85, height * 0.65],
      ];
      for (const [px, py] of pads) {
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'bios': {
      // Award BIOS Teal
      ctx.fillStyle = '#022c22';
      ctx.fillRect(0, 0, width, height);

      // Inner border
      ctx.strokeStyle = 'rgba(13, 148, 136, 0.4)';
      ctx.lineWidth = 3;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      // Text lines
      ctx.fillStyle = '#2dd4bf';
      ctx.font = `bold ${Math.round(height * 0.035)}px monospace`;
      ctx.fillText('PHOENIX - AWARD BIOS v4.51PG', 70, 110);

      ctx.fillStyle = 'rgba(45, 212, 191, 0.7)';
      ctx.font = `${Math.round(height * 0.022)}px monospace`;
      ctx.fillText('MAIN SETUP UTILITY • NO MEMORY ERROR', 70, 160);
      ctx.fillText('Base Memory: 640 KB   Extended Memory: 65472 KB', 70, 220);
      ctx.fillText('> DEL: Enter Setup | F1: Continue Boot', 70, 280);
      break;
    }

    case 'thinkpad': {
      // Classic matte raven black
      ctx.fillStyle = '#121214';
      ctx.fillRect(0, 0, width, height);

      // Keys G and H
      const keySize = Math.min(width, height) * 0.16;
      const kx1 = width / 2 - keySize - 10;
      const kx2 = width / 2 + 10;
      const ky = height / 2 - keySize / 2;

      ctx.fillStyle = '#1a1a1e';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2;

      // Key G
      ctx.fillRect(kx1, ky, keySize, keySize);
      ctx.strokeRect(kx1, ky, keySize, keySize);
      ctx.fillStyle = '#71717a';
      ctx.font = `${Math.round(keySize * 0.35)}px monospace`;
      ctx.fillText('G', kx1 + keySize * 0.35, ky + keySize * 0.6);

      // Key H
      ctx.fillStyle = '#1a1a1e';
      ctx.fillRect(kx2, ky, keySize, keySize);
      ctx.strokeRect(kx2, ky, keySize, keySize);
      ctx.fillStyle = '#71717a';
      ctx.fillText('H', kx2 + keySize * 0.35, ky + keySize * 0.6);

      // The Red Dot TrackPoint in center
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, keySize * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#7f1d1d';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Highlight on TrackPoint
      ctx.fillStyle = '#f87171';
      ctx.beginPath();
      ctx.arc(width / 2 - keySize * 0.06, height / 2 - keySize * 0.06, keySize * 0.07, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'topo': {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        const yOffset = height * (0.2 + i * 0.09);
        ctx.moveTo(0, yOffset);
        ctx.bezierCurveTo(width * 0.3, yOffset - 80 + i * 20, width * 0.6, yOffset + 100 - i * 15, width, yOffset - 30);
        ctx.stroke();
      }
      break;
    }

    default: {
      // Elegant minimal dark horizon
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.5, '#1e1b4b');
      bgGrad.addColorStop(1, '#09090b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle light glow
      ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  // Branding watermark at bottom right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = `${Math.round(height * 0.016)}px sans-serif`;
  ctx.fillText('Basic PC Guy Archive', width - 220, height - 30);
}

// Master Download function
export async function downloadWallpaper(wallpaper, presetKey = 'windows', onShowToast) {
  if (!wallpaper) return false;

  const preset = DEVICE_PRESETS[presetKey] || DEVICE_PRESETS.windows;
  const filename = `BasicPCGuy_${(wallpaper.slug || 'wallpaper').replace(/[^a-zA-Z0-9-_]/g, '')}_${preset.id.toUpperCase()}.png`;
  const realUrl = getWallpaperDownloadUrl(wallpaper, presetKey);

  // Strategy 1: Real remote image URL download
  if (realUrl) {
    try {
      const resp = await fetch(realUrl, { mode: 'cors' });
      if (resp.ok) {
        const blob = await resp.blob();
        triggerBlobDownload(blob, filename);
        if (onShowToast) {
          onShowToast(`Downloaded ${wallpaper.title} (${preset.label})`);
        }
        return true;
      }
    } catch (err) {
      console.warn('Direct fetch failed, falling back to Canvas:', err);
    }

    // Canvas image extraction fallback
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = realUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        setTimeout(() => reject(new Error('Image load timeout')), 8000);
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || preset.width;
      canvas.height = img.naturalHeight || preset.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (blob) {
        triggerBlobDownload(blob, filename);
        if (onShowToast) {
          onShowToast(`Downloaded ${wallpaper.title} (${preset.label})`);
        }
        return true;
      }
    } catch (err2) {
      console.warn('Canvas fallback failed, triggering direct link:', err2);
      triggerDirectDownload(realUrl, filename);
      if (onShowToast) {
        onShowToast(`Opened ${wallpaper.title} for direct download`);
      }
      return true;
    }
  }

  // Strategy 2: Procedural vector wallpaper generation
  try {
    const canvas = document.createElement('canvas');
    canvas.width = preset.width;
    canvas.height = preset.height;
    const ctx = canvas.getContext('2d');

    renderProceduralToCanvas(ctx, wallpaper.bgType, preset.width, preset.height);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (blob) {
      triggerBlobDownload(blob, filename);
      if (onShowToast) {
        onShowToast(`Downloaded ${wallpaper.title} (${preset.label})`);
      }
      return true;
    }
  } catch (canvasErr) {
    console.error('Failed to render wallpaper to canvas:', canvasErr);
  }

  return false;
}
