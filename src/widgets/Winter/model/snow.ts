const CAP_STEP = 3;
const REFRESH_MS = 350;
const PAD_X = 2;
const PAD_TOP = 3;
const PAD_BOTTOM = 10;

export interface StageView {
    id: number;
    ground: boolean;
    open: boolean;
    element: Element;
    x: number;
    y: number;
    vx: number;
    vy: number;
    width: number;
    inset: number;
    step: number;
    heights: Float32Array;
}

export interface SnowEngine {
    stages(): readonly Readonly<StageView>[];
    stage(id: number): Readonly<StageView> | null;
    layerWidth(): number;
    sweep(id: number, x: number, width: number, strength: number, dx: number): number;
    burst(id: number, x: number, count: number): void;
    onFrame(callback: (dt: number) => void): void;
    stop(): void;
}

interface Surface extends StageView {
    max: number;
    shown: boolean;
    seed: number;
    canvas: HTMLCanvasElement;
    paint: CanvasRenderingContext2D;
    dirty: boolean;
    sizedFor: number;
    placedAt: string;
    displayed: boolean;
}

interface Flake {
    x: number;
    y: number;
    z: number;
    size: number;
    vy: number;
    sway: number;
    swayFreq: number;
    phase: number;
    rot: number;
    vr: number;
    alpha: number;
    sprite: HTMLCanvasElement;
    crystal: boolean;
    lands: boolean;
}

interface Puff {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    total: number;
    size: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

const makeCanvas = (size: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    return canvas;
};

const softSprite = (blurred: boolean) => {
    const size = 64;
    const canvas = makeCanvas(size);
    const ctx = canvas.getContext('2d')!;
    if (blurred) {
        const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, 'rgba(255,255,255,0.75)');
        g.addColorStop(0.5, 'rgba(236,243,253,0.5)');
        g.addColorStop(0.85, 'rgba(200,214,238,0.16)');
        g.addColorStop(1, 'rgba(200,214,238,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);
        return canvas;
    }
    const shadow = ctx.createRadialGradient(34, 35, 0, 34, 35, 26);
    shadow.addColorStop(0, 'rgba(40,62,120,0.28)');
    shadow.addColorStop(1, 'rgba(40,62,120,0)');
    ctx.fillStyle = shadow;
    ctx.fillRect(0, 0, size, size);
    const g = ctx.createRadialGradient(27, 26, 1, 32, 32, 21);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(0.55, '#eef3fc');
    g.addColorStop(0.86, '#c3d1ea');
    g.addColorStop(1, 'rgba(195,209,234,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(32, 32, 21, 0, Math.PI * 2);
    ctx.fill();
    return canvas;
};

const crystalSprite = (variant: number) => {
    const size = 96;
    const canvas = makeCanvas(size);
    const ctx = canvas.getContext('2d')!;
    const R = 40;
    const branches = [
        [0.38, 0.62],
        [0.3, 0.52, 0.72],
        [0.48, 0.7],
    ][variant % 3];
    const draw = (width: number, color: string) => {
        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        for (let k = 0; k < 6; k++) {
            ctx.rotate(Math.PI / 3);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -R);
            for (const b of branches) {
                const len = R * (0.34 - b * 0.18);
                ctx.moveTo(0, -R * b);
                ctx.lineTo(len * Math.sin(Math.PI / 3), -R * b - len * Math.cos(Math.PI / 3));
                ctx.moveTo(0, -R * b);
                ctx.lineTo(-len * Math.sin(Math.PI / 3), -R * b - len * Math.cos(Math.PI / 3));
            }
            ctx.stroke();
        }
        ctx.restore();
    };
    draw(5, 'rgba(120,148,200,0.35)');
    draw(2.6, 'rgba(255,255,255,0.98)');
    return canvas;
};

const capCount = (width: number) => Math.max(2, Math.ceil(width / CAP_STEP) + 1);

export const startSnow = (canvas: HTMLCanvasElement, layer: HTMLElement, { phone }: { phone: boolean }): SnowEngine => {
    const ctx = canvas.getContext('2d')!;
    const sprites = { soft: softSprite(false), blur: softSprite(true), crystals: [0, 1, 2].map(crystalSprite) };
    const surfaces = new Map<Element, Surface>();
    const byId = new Map<number, Surface>();
    const puffs: Puff[] = [];
    const hooks: ((dt: number) => void)[] = [];
    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let last = performance.now();
    let lastRefresh = -Infinity;
    let time = 0;
    let nextId = 1;
    let originX = 0;
    let originY = 0;
    let layerW = 0;

    const resize = () => {
        W = window.innerWidth;
        H = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        for (const s of surfaces.values()) s.sizedFor = -1;
        lastRefresh = -Infinity;
    };

    const makeFlake = (initial: boolean): Flake => {
        const z = Math.random();
        const far = z < 0.45;
        const near = z > 0.88;
        const crystal = !far && !near && Math.random() < (phone ? 0.1 : 0.16);
        const size = near ? rand(14, 24) : far ? rand(4, 6) : crystal ? rand(15, 23) : rand(7, 11);
        return {
            x: rand(-40, W + 40),
            y: initial ? rand(-40, H) : rand(-60, -15),
            z,
            size,
            vy: near ? rand(70, 95) : far ? rand(16, 28) : rand(32, 52),
            sway: rand(6, 18) * (near ? 1.4 : 1),
            swayFreq: rand(0.35, 0.9),
            phase: rand(0, Math.PI * 2),
            rot: rand(0, Math.PI * 2),
            vr: rand(-0.6, 0.6),
            alpha: near ? rand(0.45, 0.65) : far ? rand(0.45, 0.7) : rand(0.8, 1),
            sprite: near ? sprites.blur : crystal ? sprites.crystals[Math.floor(Math.random() * 3)] : sprites.soft,
            crystal,
            lands: !far && !near,
        };
    };

    resize();
    const flakes: Flake[] = Array.from({ length: phone ? 55 : 150 }, () => makeFlake(true));

    const limitAt = (s: Surface, i: number) => {
        const x = i * CAP_STEP;
        const dist = Math.min(x - s.inset, s.width - s.inset - x);
        if (dist <= 0) return 0;
        return s.max * Math.sqrt(Math.min(1, dist / (s.max * 2.4)));
    };

    const prefill = (s: Surface) => {
        const level = s.ground ? 0.7 : rand(0.62, 0.88);
        const a = rand(0, 6);
        const b = rand(0, 6);
        for (let i = 0; i < s.heights.length; i++) {
            const wave = 0.8 + 0.12 * Math.sin(i * 0.11 + a) + 0.08 * Math.sin(i * 0.37 + b);
            s.heights[i] = Math.min(limitAt(s, i), s.max * level * wave);
        }
        s.dirty = true;
    };

    const resample = (s: Surface, width: number) => {
        const n = capCount(width);
        if (n === s.heights.length) return;
        const next = new Float32Array(n);
        for (let i = 0; i < n; i++) next[i] = s.heights[Math.min(s.heights.length - 1, Math.round((i / (n - 1)) * (s.heights.length - 1)))];
        s.heights = next;
        s.dirty = true;
    };

    const createSurface = (element: Element, ground: boolean, open: boolean, width: number): Surface => {
        const cap = document.createElement('canvas');
        cap.setAttribute('aria-hidden', 'true');
        cap.dataset.snowCap = '';
        Object.assign(cap.style, { position: 'absolute', left: '0', top: '0', zIndex: '1', pointerEvents: 'none', display: 'none' });
        layer.appendChild(cap);
        const radius = ground ? 0 : parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0;
        const s: Surface = {
            id: nextId++,
            element,
            ground,
            open,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            width,
            inset: Math.min(radius, width / 4),
            step: CAP_STEP,
            heights: new Float32Array(capCount(width)),
            max: ground ? (phone ? 12 : 17) : phone ? 9 : 14,
            shown: false,
            seed: rand(0, 6),
            canvas: cap,
            paint: cap.getContext('2d')!,
            dirty: true,
            sizedFor: -1,
            placedAt: '',
            displayed: false,
        };
        prefill(s);
        surfaces.set(element, s);
        byId.set(s.id, s);
        return s;
    };

    const removeSurface = (s: Surface) => {
        s.canvas.remove();
        surfaces.delete(s.element);
        byId.delete(s.id);
    };

    const isShown = (element: Element, rect: DOMRect) => {
        if (rect.width < 40 || rect.height < 16) return false;
        const reveal = element.closest<HTMLElement>('[data-reveal]');
        if (reveal && reveal.dataset.reveal === 'wait') return false;
        if (reveal && reveal.dataset.reveal === 'in' && parseFloat(getComputedStyle(reveal).opacity) < 0.95) return false;
        return getComputedStyle(element).visibility !== 'hidden';
    };

    const refresh = () => {
        const seen = new Set<Element>();

        const nav = document.querySelector('[data-snow-ground]');
        const navRect = nav?.getBoundingClientRect();
        const navShown = !!nav && !!navRect && navRect.width > 0 && navRect.height > 0;
        const groundEl = navShown ? nav : document.querySelector('header');
        if (groundEl) {
            const r = groundEl.getBoundingClientRect();
            const s = surfaces.get(groundEl) ?? createSurface(groundEl, true, !navShown, r.width);
            s.open = !navShown;
            s.shown = r.width > 0;
            seen.add(groundEl);
        }

        document.querySelectorAll('[data-snow]').forEach((element) => {
            const r = element.getBoundingClientRect();
            const shown = isShown(element, r);
            let s = surfaces.get(element);
            if (!s) {
                if (!shown) return;
                s = createSurface(element, false, false, r.width);
            }
            s.shown = shown;
            seen.add(element);
        });

        for (const s of [...surfaces.values()]) if (!seen.has(s.element)) removeSurface(s);
    };

    const measure = () => {
        const origin = layer.getBoundingClientRect();
        originX = origin.left;
        originY = origin.top;
        layerW = origin.width || W;
        for (const s of surfaces.values()) {
            const r = s.element.getBoundingClientRect();
            const edge = s.open ? r.bottom : r.top;
            s.vx = r.left;
            s.vy = edge;
            s.x = r.left - originX;
            s.y = edge - originY;
            if (r.width > 0 && Math.abs(r.width - s.width) > 0.5) {
                resample(s, r.width);
                s.width = r.width;
                s.inset = s.ground ? 0 : Math.min(s.inset, r.width / 4);
            }
        }
    };

    const near = (s: Surface) => s.shown && s.vy > -H && s.vy < H * 2 && s.vx < W && s.vx + s.width > 0;
    const onScreen = (s: Surface) => s.shown && s.vy > -30 && s.vy < H + 30 && s.vx < W && s.vx + s.width > 0;

    const deposit = (s: Surface, x: number, amount: number) => {
        const i = Math.round(x / CAP_STEP);
        const weights = [0.12, 0.22, 0.32, 0.22, 0.12];
        for (let k = -2; k <= 2; k++) {
            const j = i + k;
            if (j < 0 || j >= s.heights.length) continue;
            s.heights[j] = Math.min(limitAt(s, j), s.heights[j] + amount * weights[k + 2]);
        }
        s.dirty = true;
    };

    const relax = (s: Surface) => {
        const cap = s.heights;
        for (let i = 0; i < cap.length - 1; i++) {
            const d = cap[i] - cap[i + 1];
            if (Math.abs(d) > 1.4) {
                const move = (Math.abs(d) - 1.4) * 0.25 * Math.sign(d);
                cap[i] -= move;
                cap[i + 1] = Math.min(limitAt(s, i + 1), cap[i + 1] + move);
                s.dirty = true;
            }
        }
    };

    const sizeCap = (s: Surface) => {
        const cssW = s.width + PAD_X * 2;
        const cssH = PAD_TOP + s.max + PAD_BOTTOM;
        s.canvas.width = Math.max(1, Math.round(cssW * dpr));
        s.canvas.height = Math.max(1, Math.round(cssH * dpr));
        s.canvas.style.width = `${cssW}px`;
        s.canvas.style.height = `${cssH}px`;
        s.sizedFor = s.width;
        s.placedAt = '';
        s.dirty = true;
    };

    const drawCap = (s: Surface) => {
        const paint = s.paint;
        paint.setTransform(dpr, 0, 0, dpr, 0, 0);
        paint.clearRect(0, 0, s.width + PAD_X * 2, PAD_TOP + s.max + PAD_BOTTOM);
        s.dirty = false;
        const cap = s.heights;
        let any = false;
        for (let i = 0; i < cap.length; i++) if (cap[i] > 0.4) { any = true; break; }
        if (!any) return;
        const first = Math.ceil(s.inset / CAP_STEP);
        const lastI = Math.min(cap.length - 1, Math.floor((s.width - s.inset) / CAP_STEP));
        if (lastI <= first) return;

        const x0 = PAD_X;
        const y0 = PAD_TOP + s.max;
        const xa = x0 + first * CAP_STEP;
        const xb = x0 + lastI * CAP_STEP;

        const drip = (i: number) => {
            const depth = Math.min(1, cap[i] / (s.max * 0.6));
            return 0.5 + depth * (1.6 + 1.6 * (0.5 + 0.5 * Math.sin(i * 0.83 + s.seed)));
        };

        const shade = paint.createLinearGradient(0, y0 + 1, 0, y0 + 9);
        shade.addColorStop(0, 'rgba(24,44,100,0.2)');
        shade.addColorStop(1, 'rgba(24,44,100,0)');
        paint.fillStyle = shade;
        paint.fillRect(xa + 3, y0 + 1, xb - xa - 6, 8);

        const top = new Path2D();
        const body = new Path2D();
        let px = xa;
        let py = y0 - cap[first];
        top.moveTo(px, py);
        body.moveTo(px, y0);
        body.lineTo(px, py);
        for (let i = first + 1; i <= lastI; i++) {
            const nx = x0 + i * CAP_STEP;
            const ny = y0 - cap[i];
            top.quadraticCurveTo(px, py, (px + nx) / 2, (py + ny) / 2);
            body.quadraticCurveTo(px, py, (px + nx) / 2, (py + ny) / 2);
            px = nx;
            py = ny;
        }
        top.lineTo(xb, py);
        body.lineTo(xb, py);
        body.lineTo(xb, y0);
        let bx = xb;
        let by = y0 + drip(lastI);
        for (let i = lastI - 1; i >= first; i--) {
            const nx = x0 + i * CAP_STEP;
            const ny = y0 + drip(i);
            body.quadraticCurveTo(bx, by, (bx + nx) / 2, (by + ny) / 2);
            bx = nx;
            by = ny;
        }
        body.lineTo(xa, y0);
        body.closePath();

        const g = paint.createLinearGradient(0, y0 - s.max, 0, y0 + 4);
        g.addColorStop(0, '#ffffff');
        g.addColorStop(0.6, '#f5f8fe');
        g.addColorStop(0.84, '#dfe8f6');
        g.addColorStop(1, '#c4d2ea');
        paint.fillStyle = g;
        paint.fill(body);
        paint.strokeStyle = 'rgba(122,146,192,0.55)';
        paint.lineWidth = 1;
        paint.stroke(top);
    };

    const placeCaps = () => {
        for (const s of surfaces.values()) {
            const show = near(s);
            if (show !== s.displayed) {
                s.canvas.style.display = show ? 'block' : 'none';
                s.displayed = show;
            }
            if (!show) continue;
            if (s.sizedFor !== s.width) sizeCap(s);
            const at = `translate(${(s.x - PAD_X).toFixed(2)}px, ${(s.y - PAD_TOP - s.max).toFixed(2)}px)`;
            if (at !== s.placedAt) {
                s.canvas.style.transform = at;
                s.placedAt = at;
            }
            if (s.dirty) drawCap(s);
        }
    };

    const drawFlake = (f: Flake) => {
        ctx.globalAlpha = f.alpha;
        if (f.crystal) {
            const c = Math.cos(f.rot) * dpr;
            const sn = Math.sin(f.rot) * dpr;
            ctx.setTransform(c, sn, -sn, c, f.x * dpr, f.y * dpr);
            ctx.drawImage(f.sprite, -f.size / 2, -f.size / 2, f.size, f.size);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        } else {
            ctx.drawImage(f.sprite, f.x - f.size / 2, f.y - f.size / 2, f.size, f.size);
        }
    };

    const addPuff = (x: number, y: number, vx: number, vy: number) => {
        if (puffs.length >= 160) return;
        const total = rand(0.45, 0.9);
        puffs.push({ x, y, vx, vy, life: total, total, size: rand(2.5, 5) });
    };

    const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (document.hidden) return;
        time += dt;
        if (now - lastRefresh > REFRESH_MS) {
            lastRefresh = now;
            refresh();
        }
        measure();

        const visible: Surface[] = [];
        for (const s of surfaces.values()) if (onScreen(s)) visible.push(s);

        const wind = 9 * Math.sin(time * 0.05) + 5 * Math.sin(time * 0.13 + 1.7) + 3;
        for (const f of flakes) {
            const prevY = f.y;
            f.phase += dt * f.swayFreq * Math.PI * 2 * 0.25;
            f.x += (wind * (0.35 + 0.65 * f.z) + Math.cos(f.phase) * f.sway) * dt;
            f.y += f.vy * dt;
            f.rot += f.vr * dt;
            if (f.lands) {
                for (const s of visible) {
                    const lx = f.x - s.vx;
                    if (lx < s.inset + 2 || lx > s.width - s.inset - 2) continue;
                    const i = Math.min(s.heights.length - 1, Math.max(0, Math.round(lx / CAP_STEP)));
                    const top = s.vy - s.heights[i];
                    if (prevY < top && f.y >= top) {
                        if (Math.random() < (s.ground ? 0.8 : 0.5)) {
                            deposit(s, lx, f.size * (phone ? 0.34 : 0.22));
                            Object.assign(f, makeFlake(false));
                        }
                        break;
                    }
                }
            }
            if (f.y > H + 20) Object.assign(f, makeFlake(false));
            if (f.x < -60) f.x += W + 120;
            else if (f.x > W + 60) f.x -= W + 120;
        }
        for (const s of visible) relax(s);

        for (const hook of hooks) hook(dt);

        placeCaps();

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        for (const f of flakes) if (f.z < 0.45) drawFlake(f);
        for (let k = puffs.length - 1; k >= 0; k--) {
            const p = puffs[k];
            p.life -= dt;
            if (p.life <= 0) {
                puffs.splice(k, 1);
                continue;
            }
            p.vy += 420 * dt;
            p.vx *= 1 - 1.5 * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            ctx.globalAlpha = Math.min(1, (p.life / p.total) * 1.4) * 0.85;
            ctx.drawImage(sprites.soft, p.x + originX - p.size / 2, p.y + originY - p.size / 2, p.size, p.size);
        }
        for (const f of flakes) if (f.z >= 0.45) drawFlake(f);
        ctx.globalAlpha = 1;
    };

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(frame);

    const visibleStage = (s: Surface | undefined) => (s && s.shown && s.width > 0 ? s : null);

    return {
        stages() {
            const list: Surface[] = [];
            for (const s of surfaces.values()) if (visibleStage(s)) list.push(s);
            return list;
        },
        stage(id) {
            return visibleStage(byId.get(id));
        },
        layerWidth() {
            return layerW || W;
        },
        sweep(id, x, width, strength, dx) {
            const s = byId.get(id);
            if (!s) return 0;
            const from = Math.max(0, Math.floor((x - width / 2) / CAP_STEP));
            const to = Math.min(s.heights.length - 1, Math.ceil((x + width / 2) / CAP_STEP));
            let removed = 0;
            for (let i = from; i <= to; i++) {
                const take = Math.min(s.heights[i], s.heights[i] * strength + strength * 0.6);
                s.heights[i] -= take;
                removed += take;
            }
            if (removed > 0) s.dirty = true;
            const count = Math.min(6, Math.round(removed * 0.5));
            for (let k = 0; k < count; k++) {
                addPuff(s.x + x + rand(-width / 2, width / 2), s.y - rand(1, 5), Math.sign(dx || 1) * rand(25, 90), rand(-120, -45));
            }
            return removed;
        },
        burst(id, x, count) {
            const s = byId.get(id);
            if (!s) return;
            const i = Math.min(s.heights.length - 1, Math.max(0, Math.round(x / CAP_STEP)));
            const lift = s.heights[i];
            for (let k = 0; k < count; k++) {
                addPuff(s.x + x + rand(-14, 14), s.y - lift - rand(0, 3), rand(-110, 110), rand(-150, -60));
            }
        },
        onFrame(callback) {
            hooks.push(callback);
        },
        stop() {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
            hooks.length = 0;
            for (const s of [...surfaces.values()]) removeSurface(s);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
    };
};
