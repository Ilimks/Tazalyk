import {
    CapsuleGeometry,
    Color,
    ConeGeometry,
    CylinderGeometry,
    DirectionalLight,
    Group,
    HemisphereLight,
    Matrix4,
    Mesh,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    Object3D,
    OrthographicCamera,
    Scene,
    SphereGeometry,
    TorusGeometry,
    Vector3,
    WebGLRenderer,
    BoxGeometry,
    type BufferGeometry,
    type Material,
} from 'three';
import type { SnowEngine, StageView } from './snow';

const TILT = 0.2;
const MODEL_HEIGHT = 2.02;
const HIPS_Y = 0.76;
const BROOM_PIVOT_Y = 1.2;
const BROOM_LENGTH = 1.52;

interface Arm {
    shoulder: Group;
    elbow: Group;
    upper: number;
    fore: number;
}

interface Leg {
    hip: Group;
    knee: Group;
}

const std = (color: string, roughness = 0.75, metalness = 0) =>
    new MeshStandardMaterial({ color: new Color(color), roughness, metalness });

const mesh = (geometry: BufferGeometry, material: Material, x = 0, y = 0, z = 0) => {
    const node = new Mesh(geometry, material);
    node.position.set(x, y, z);
    return node;
};

const ring = (radius: number, tube: number, material: Material, y: number, squash = 1) => {
    const node = mesh(new TorusGeometry(radius, tube, 10, 28), material, 0, y, 0);
    node.rotation.x = Math.PI / 2;
    node.scale.y = squash;
    return node;
};

const buildSanta = () => {
    const M = {
        suit: new MeshPhysicalMaterial({ color: new Color('#cc2027'), roughness: 0.62, sheen: 1, sheenRoughness: 0.45, sheenColor: new Color('#ff9a9a') }),
        sack: new MeshPhysicalMaterial({ color: new Color('#97161d'), roughness: 0.8, sheen: 0.6, sheenColor: new Color('#e66a6a') }),
        fur: std('#fbf8f2', 1),
        beard: std('#f6f4ef', 0.95),
        boots: std('#14151a', 0.32),
        belt: std('#17181c', 0.4),
        gold: std('#e2b33c', 0.3, 0.85),
        skin: std('#f0c3a1', 0.65),
        cheek: std('#f2a29b', 0.7),
        nose: std('#eea08b', 0.55),
        eye: std('#1a1414', 0.25),
        gloves: std('#f5f3ee', 0.9),
        cord: std('#c8a25a', 0.8),
        wood: std('#b88a55', 0.7),
        straw: std('#c9a45a', 1),
        twig: std('#8a6a3c', 1),
    };

    const root = new Group();
    const hips = new Group();
    hips.position.y = HIPS_Y;
    root.add(hips);

    const makeLeg = (side: number): Leg => {
        const hip = new Group();
        hip.position.set(0.125 * side, -0.02, 0);
        hip.add(mesh(new CapsuleGeometry(0.1, 0.19, 6, 14), M.suit, 0, -0.15, 0));
        const knee = new Group();
        knee.position.y = -0.33;
        hip.add(knee);
        knee.add(mesh(new CapsuleGeometry(0.094, 0.16, 6, 14), M.suit, 0, -0.13, 0));
        knee.add(ring(0.096, 0.04, M.fur, -0.27));
        const boot = mesh(new SphereGeometry(0.118, 18, 12), M.boots, 0, -0.36, 0.055);
        boot.scale.set(0.95, 0.62, 1.55);
        knee.add(boot);
        hips.add(hip);
        return { hip, knee };
    };
    const legs = [makeLeg(-1), makeLeg(1)];

    const torso = new Group();
    hips.add(torso);
    const belly = mesh(new SphereGeometry(0.3, 28, 20), M.suit, 0, 0.25, 0);
    belly.scale.set(1, 0.95, 0.92);
    torso.add(belly);
    const chest = mesh(new SphereGeometry(0.235, 24, 18), M.suit, 0, 0.52, -0.01);
    chest.scale.z = 0.9;
    torso.add(chest);
    const hem = ring(0.272, 0.05, M.fur, 0.03);
    hem.scale.set(1, 0.92, 1);
    torso.add(hem);
    const belt = ring(0.292, 0.036, M.belt, 0.17);
    belt.scale.set(1, 0.92, 0.9);
    torso.add(belt);
    torso.add(mesh(new BoxGeometry(0.11, 0.085, 0.02), M.gold, 0, 0.17, 0.288));
    torso.add(mesh(new BoxGeometry(0.06, 0.042, 0.024), M.belt, 0, 0.17, 0.29));
    for (const [y, z] of [[0.33, 0.27], [0.43, 0.25], [0.56, 0.215]]) torso.add(mesh(new SphereGeometry(0.02, 10, 8), M.gold, 0, y, z));
    const sack = mesh(new SphereGeometry(0.27, 22, 16), M.sack, -0.06, 0.52, -0.34);
    sack.scale.set(0.95, 1.12, 0.78);
    torso.add(sack);
    torso.add(mesh(new CylinderGeometry(0.045, 0.07, 0.12, 12), M.sack, -0.08, 0.86, -0.36));
    const knot = ring(0.05, 0.016, M.cord, 0.82, 1);
    knot.position.set(-0.08, 0.82, -0.36);
    torso.add(knot);

    const neck = new Group();
    neck.position.y = 0.74;
    torso.add(neck);
    const head = new Group();
    head.position.y = 0.13;
    neck.add(head);
    const face = mesh(new SphereGeometry(0.14, 24, 18), M.skin);
    face.scale.y = 1.05;
    head.add(face);
    const hair = mesh(new SphereGeometry(0.148, 18, 14), M.beard, 0, -0.02, -0.035);
    hair.scale.set(1.02, 0.92, 0.92);
    head.add(hair);
    const beard = mesh(new SphereGeometry(0.15, 20, 16), M.beard, 0, -0.1, 0.065);
    beard.scale.set(1.02, 1.18, 0.74);
    head.add(beard);
    for (const side of [-1, 1]) {
        const moustache = mesh(new SphereGeometry(0.05, 12, 10), M.beard, 0.048 * side, -0.035, 0.128);
        moustache.scale.set(1.45, 0.62, 0.7);
        moustache.rotation.z = -0.32 * side;
        head.add(moustache);
        const cheek = mesh(new SphereGeometry(0.034, 12, 10), M.cheek, 0.075 * side, 0.005, 0.112);
        cheek.scale.z = 0.6;
        head.add(cheek);
        head.add(mesh(new SphereGeometry(0.016, 10, 8), M.eye, 0.047 * side, 0.045, 0.126));
        const brow = mesh(new CapsuleGeometry(0.014, 0.04, 4, 8), M.beard, 0.05 * side, 0.083, 0.122);
        brow.rotation.z = Math.PI / 2 + 0.25 * side;
        head.add(brow);
    }
    head.add(mesh(new SphereGeometry(0.031, 14, 10), M.nose, 0, 0.005, 0.145));
    head.add(ring(0.138, 0.046, M.fur, 0.085));
    head.add(mesh(new CylinderGeometry(0.085, 0.138, 0.17, 22), M.suit, 0, 0.17, -0.01));
    const hatTip = new Group();
    hatTip.position.set(0, 0.245, -0.01);
    head.add(hatTip);
    hatTip.add(mesh(new ConeGeometry(0.085, 0.25, 18), M.suit, 0, 0.12, 0));
    hatTip.add(mesh(new SphereGeometry(0.055, 14, 12), M.fur, 0, 0.25, 0));

    const makeArm = (side: number): Arm => {
        const shoulder = new Group();
        shoulder.position.set(0.255 * side, 0.6, 0);
        shoulder.add(mesh(new CapsuleGeometry(0.072, 0.15, 6, 14), M.suit, 0, -0.12, 0));
        const elbow = new Group();
        elbow.position.y = -0.25;
        shoulder.add(elbow);
        elbow.add(mesh(new CapsuleGeometry(0.064, 0.14, 6, 14), M.suit, 0, -0.1, 0));
        elbow.add(ring(0.066, 0.03, M.fur, -0.2));
        elbow.add(mesh(new SphereGeometry(0.068, 14, 12), M.gloves, 0, -0.27, 0));
        torso.add(shoulder);
        return { shoulder, elbow, upper: 0.25, fore: 0.27 };
    };
    const arms = [makeArm(-1), makeArm(1)];

    const broomYaw = new Group();
    broomYaw.position.set(0.05, BROOM_PIVOT_Y, 0.36);
    root.add(broomYaw);
    const broomTilt = new Group();
    broomYaw.add(broomTilt);
    broomTilt.add(mesh(new CylinderGeometry(0.019, 0.021, 1.12, 10), M.wood, 0, -0.52, 0));
    broomTilt.add(ring(0.032, 0.013, M.belt, -1.08));
    const bundle = mesh(new ConeGeometry(0.15, 0.44, 18, 1), M.straw, 0, -1.3, 0);
    bundle.scale.z = 0.55;
    broomTilt.add(bundle);
    const spread = 0.3;
    for (let k = 0; k < 18; k++) {
        const a = (k / 18) * Math.PI * 2 + (k % 2) * 0.17;
        const twig = mesh(new CylinderGeometry(0.004, 0.007, 0.5, 4), k % 3 ? M.twig : M.straw, Math.cos(a) * 0.085, -1.32, Math.sin(a) * 0.085 * 0.55);
        twig.rotation.set(-spread * Math.sin(a) * 0.55, 0, spread * Math.cos(a));
        broomTilt.add(twig);
    }
    const grips = [new Object3D(), new Object3D()];
    grips[0].position.y = -0.06;
    grips[1].position.y = -0.46;
    broomTilt.add(grips[0], grips[1]);
    const tip = new Object3D();
    tip.position.y = -BROOM_LENGTH;
    broomTilt.add(tip);

    return { root, hips, torso, belly, head, hatTip, legs, arms, broomYaw, broomTilt, grips, tip, materials: Object.values(M) };
};

const solveArm = (arm: Arm, target: Vector3, pole: Vector3) => {
    const parent = arm.shoulder.parent!;
    const s = arm.shoulder.position.clone();
    const t = parent.worldToLocal(target.clone());
    const d = t.clone().sub(s);
    const dist = Math.min(Math.max(d.length(), Math.abs(arm.upper - arm.fore) + 1e-3), arm.upper + arm.fore - 1e-3);
    const dn = d.normalize();
    const cosA = (arm.upper ** 2 + dist ** 2 - arm.fore ** 2) / (2 * arm.upper * dist);
    const alpha = Math.acos(Math.min(1, Math.max(-1, cosA)));
    const side = pole.clone().sub(dn.clone().multiplyScalar(pole.dot(dn))).normalize();
    const upperDir = dn.clone().multiplyScalar(Math.cos(alpha)).add(side.multiplyScalar(Math.sin(alpha))).normalize();
    const elbowPos = s.clone().add(upperDir.clone().multiplyScalar(arm.upper));
    const target2 = s.clone().add(dn.clone().multiplyScalar(dist));
    const foreDir = target2.sub(elbowPos).normalize();
    const x = new Vector3().crossVectors(upperDir, foreDir);
    if (x.lengthSq() < 1e-6) x.set(1, 0, 0);
    x.normalize();
    const y = upperDir.clone().negate();
    const z = new Vector3().crossVectors(x, y).normalize();
    arm.shoulder.quaternion.setFromRotationMatrix(new Matrix4().makeBasis(x, y, z));
    const local = foreDir.clone().applyQuaternion(arm.shoulder.quaternion.clone().invert());
    arm.elbow.rotation.set(Math.atan2(-local.z, -local.y), 0, 0);
};

export interface Sweeper {
    stop(): void;
}

type Stage = Readonly<StageView>;
type State = 'walk' | 'sweep' | 'turn' | 'wave' | 'crouch' | 'fly' | 'land';

interface Jump {
    to: number;
    tx: number;
    ax: number;
    ay: number;
    arc: number;
    drop: boolean;
    duration: number;
    t: number;
}

const SOLID = 'button, input, select, textarea, img, svg, video';
const CROUCH_S = 0.16;
const LAND_S = 0.24;
const SETTLE_S = 0.8;
const GRAVITY = 1900;
const HOP_CHANCE = 0.15;

export const startSweeper = (canvas: HTMLCanvasElement, snow: SnowEngine): Sweeper => {
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setClearColor(0x000000, 0);
    const scene = new Scene();
    scene.add(new HemisphereLight(0xeef3ff, 0x8a8f9c, 1.45));
    const key = new DirectionalLight(0xfff6ea, 2.4);
    key.position.set(-0.6, 1, 0.9);
    scene.add(key);
    const rim = new DirectionalLight(0xd6e4ff, 1.2);
    rim.position.set(0.7, 0.6, -1);
    scene.add(rim);

    const santa = buildSanta();
    scene.add(santa.root);
    const camera = new OrthographicCamera(0, 1, 1, 0, -2000, 2000);

    const GROUND = 18;
    let BW = 0;
    let CH = 0;
    let scale = 1;
    let speed = 28;
    let phone = false;
    let bodyPx = 58;
    let placedAt = '';
    let shown = false;

    const layout = () => {
        phone = window.innerWidth <= 1000;
        bodyPx = phone ? 40 : 58;
        scale = bodyPx / MODEL_HEIGHT;
        speed = phone ? 20 : 28;
        CH = Math.round(bodyPx * 1.45 + 26);
        BW = Math.round(bodyPx * 3.6);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(BW, CH, false);
        canvas.style.width = `${BW}px`;
        canvas.style.height = `${CH}px`;
        camera.left = -BW / 2;
        camera.right = BW / 2;
        camera.top = CH - GROUND;
        camera.bottom = -GROUND;
        camera.position.set(0, Math.sin(TILT) * 1000, Math.cos(TILT) * 1000);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
        santa.root.scale.setScalar(scale);
        placedAt = '';
    };
    layout();

    let stageId = 0;
    let lx = 0;
    let dir: 1 | -1 = 1;
    let yaw = Math.PI / 2 - 0.85;
    let state: State = 'walk';
    let target = 0;
    let timer = 0;
    let walkPhase = 0;
    let sweepPhase = 0;
    let wavePhase = 0;
    let lastTipX = 0;
    let feet = 0;
    let settle = 0;
    let checkAt = 0;
    let jump: Jump | null = null;
    let sweepSide: 1 | -1 = 1;
    let stroll = false;
    let busy: [number, number][] = [];
    let busyCheckedAt = -Infinity;

    const margin = (st: Stage) => (st.ground ? (phone ? 24 : 44) : Math.max(st.inset + 6, phone ? 22 : 30));
    const roomy = (st: Stage) => st.ground || st.width >= margin(st) * 2 + (phone ? 70 : 100);
    const inView = (st: Stage) => st.vx >= -1 && st.vx + st.width <= window.innerWidth + 1;
    const welcoming = (st: Stage) => roomy(st) && inView(st) && st.vy >= bodyPx + 6 && st.vy <= window.innerHeight * 0.82;
    const lost = (st: Stage) => !inView(st) || st.vy < bodyPx * 0.45 || st.vy > window.innerHeight - 6;
    const clampX = (st: Stage, x: number) => Math.min(st.width - margin(st), Math.max(margin(st), x));
    const snowAt = (st: Stage, x: number) => {
        const i = Math.round(x / st.step);
        return i >= 0 && i < st.heights.length ? st.heights[i] : 0;
    };

    const lines = document.createRange();
    const obstaclesFor = (st: Stage) => {
        const list: [number, number][] = [];
        const container = st.ground ? st.element.closest('header') ?? st.element : st.element.parentElement?.closest('section, main') ?? document.body;
        const top = st.vy - bodyPx;
        const tall = bodyPx * 3;
        const skip = (node: Node) => {
            const element = node instanceof Element ? node : node.parentElement;
            if (!element) return true;
            return st.ground ? !!element.closest('[data-snow-ground]') : st.element.contains(element);
        };
        const add = (r: DOMRect) => {
            if (!r.width || !r.height || r.width > window.innerWidth * 0.6 || r.height > tall) return;
            if (r.bottom < top || r.top > st.vy || r.right < st.vx || r.left > st.vx + st.width) return;
            list.push([r.left - st.vx - 6, r.right - st.vx + 6]);
        };
        container.querySelectorAll(SOLID).forEach((element) => {
            if (!skip(element)) add(element.getBoundingClientRect());
        });
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            if (!node.textContent?.trim() || skip(node)) continue;
            lines.selectNodeContents(node);
            for (const r of Array.from(lines.getClientRects())) add(r);
        }
        return list;
    };

    const refreshBusy = (st: Stage) => {
        busy = obstaclesFor(st);
        busyCheckedAt = performance.now();
    };

    const isFree = (st: Stage, x: number, list = busy) => {
        const half = 0.38 * scale;
        if (x - half < margin(st) || x + half > st.width - margin(st)) return false;
        return !list.some(([a, b]) => x + half > a && x - half < b);
    };

    const rooms = new Map<number, { at: number; free: boolean }>();
    const hasRoom = (st: Stage) => {
        const now = performance.now();
        const known = rooms.get(st.id);
        if (known && now - known.at < 1000) return known.free;
        const list = obstaclesFor(st);
        let free = false;
        for (let x = margin(st); x <= st.width - margin(st) && !free; x += 6) free = isFree(st, x, list);
        rooms.set(st.id, { at: now, free });
        return free;
    };

    const chooseTarget = (st: Stage) => {
        refreshBusy(st);
        const m = margin(st);
        const span = Math.max(0, st.width - m * 2);
        const reach = 1.05 * scale;
        let best = -1;
        let bestSide: 1 | -1 = 1;
        let bestScore = -Infinity;
        for (const strict of [true, false]) {
            for (let px = m; px <= st.width - m; px += 2) {
                if (strict && !isFree(st, px)) continue;
                for (const side of [1, -1] as const) {
                    const score = snowAt(st, px + side * reach) - Math.abs(px - lx) * 0.004 + Math.random() * 0.8;
                    if (score > bestScore) {
                        bestScore = score;
                        best = px;
                        bestSide = side;
                    }
                }
            }
            if (best >= 0) break;
        }
        target = best >= 0 ? best : m + Math.random() * span;
        sweepSide = bestSide;
        stroll = Math.abs(target - lx) < 60 && Math.random() < 0.45;
        if (stroll) {
            const free: number[] = [];
            for (let px = m; px <= st.width - m; px += 6) if (isFree(st, px)) free.push(px);
            target = free.length ? free[Math.floor(Math.random() * free.length)] : m + Math.random() * span;
        }
    };

    const pickStage = (from: { x: number; y: number }, exclude: number, within = Infinity) => {
        let best: Stage | null = null;
        let bestX = 0;
        let bestScore = Infinity;
        const candidates = snow.stages().filter((st) => st.id !== exclude && welcoming(st));
        for (const strict of [true, false]) {
            for (const st of candidates) {
                if (strict && !hasRoom(st)) continue;
                const x = clampX(st, from.x - st.vx);
                const distance = Math.hypot(st.vx + x - from.x, st.vy - from.y);
                if (distance > within) continue;
                const score = distance + Math.random() * 60;
                if (score < bestScore) {
                    bestScore = score;
                    best = st;
                    bestX = x;
                }
            }
            if (best) break;
        }
        return best ? { stage: best, x: bestX } : null;
    };

    const freeSpotNear = (st: Stage, x: number) => {
        refreshBusy(st);
        for (let d = 0; d <= st.width; d += 4) {
            if (isFree(st, x - d)) return x - d;
            if (isFree(st, x + d)) return x + d;
        }
        return clampX(st, x);
    };

    const startJump = (to: Stage, near: number, from: Stage | null) => {
        const H = window.innerHeight;
        const tx = freeSpotNear(to, near);
        const fromSeen = !!from && from.vy > -CH && from.vy < H + CH;
        const bx = to.x + tx;
        const by = to.y - snowAt(to, tx) * 0.5;
        if (!from || !fromSeen || Math.abs(by - from.y) > H * 0.75) {
            const ay = to.y - to.vy - (CH - GROUND);
            jump = { to: to.id, tx, ax: bx, ay, arc: 0, drop: true, duration: Math.min(0.95, Math.max(0.4, Math.sqrt((2 * Math.max(40, by - ay)) / GRAVITY))), t: 0 };
            state = 'fly';
            return;
        }
        const ax = from.x + lx;
        const ay = from.y - feet;
        const dx = bx - ax;
        const distance = Math.hypot(dx, by - ay);
        jump = { to: to.id, tx, ax, ay, arc: Math.min(150, 28 + Math.abs(dx) * 0.16 + Math.abs(by - ay) * 0.12), drop: false, duration: Math.min(1.05, 0.5 + distance / 1100), t: 0 };
        if (Math.abs(dx) > 4) dir = dx > 0 ? 1 : -1;
        state = 'crouch';
        timer = CROUCH_S;
    };

    const land = (to: Stage, tx: number) => {
        stageId = to.id;
        lx = clampX(to, tx);
        jump = null;
        state = 'land';
        timer = LAND_S;
        settle = SETTLE_S + LAND_S;
        feet = snowAt(to, lx) * 0.5;
        snow.burst(to.id, lx, phone ? 6 : 9);
        snow.sweep(to.id, lx, 0.5 * scale, 0.25, dir);
        busyCheckedAt = -Infinity;
    };

    const enter = () => {
        const list = snow.stages();
        const ground = list.find((st) => st.ground && welcoming(st));
        const first = ground ?? pickStage({ x: window.innerWidth * 0.3, y: window.innerHeight * 0.4 }, 0)?.stage;
        if (!first) return false;
        stageId = first.id;
        lx = clampX(first, first.ground ? Math.min(first.width * 0.3, 260) : first.width / 2);
        state = 'walk';
        chooseTarget(first);
        return true;
    };

    const setShown = (value: boolean) => {
        if (value === shown) return;
        canvas.style.visibility = value ? 'visible' : 'hidden';
        shown = value;
    };

    const place = (px: number, py: number, clip: string) => {
        const room = snow.layerWidth();
        const left = Math.max(0, Math.min(room - BW, px - BW / 2));
        santa.root.position.x = px - (left + BW / 2);
        const transform = `translate3d(${left.toFixed(2)}px, ${(py - (CH - GROUND)).toFixed(2)}px, 0)`;
        const at = `${transform}|${clip}`;
        if (at === placedAt) return;
        canvas.style.transform = transform;
        canvas.style.clipPath = clip;
        placedAt = at;
    };

    const pole = [new Vector3(-0.7, -0.4, -1), new Vector3(0.7, -0.4, -1)];
    const tmp = new Vector3();
    const wave = new Vector3();

    const holdBroom = () => {
        santa.root.updateMatrixWorld(true);
        solveArm(santa.arms[0], santa.grips[0].getWorldPosition(tmp), pole[0]);
        solveArm(santa.arms[1], santa.grips[1].getWorldPosition(tmp), pole[1]);
    };

    const fly = (dt: number) => {
        const j = jump!;
        const to = snow.stage(j.to);
        if (!to) {
            jump = null;
            state = 'walk';
            return;
        }
        j.t = Math.min(1, j.t + dt / j.duration);
        const t = j.t;
        const tx = clampX(to, j.tx);
        const bx = to.x + tx;
        const by = to.y - snowAt(to, tx) * 0.5;
        const px = j.ax + (bx - j.ax) * t;
        const py = j.drop ? j.ay + (by - j.ay) * t * t : j.ay + (by - j.ay) * t - 4 * j.arc * t * (1 - t);
        setShown(true);
        place(px, py, 'none');

        const along = dir > 0 ? Math.PI / 2 - 0.85 : -Math.PI / 2 + 0.85;
        yaw += (along - yaw) * Math.min(1, dt * 10);
        santa.root.position.y = 0;
        santa.root.rotation.y = yaw;
        const tuck = j.drop ? 0.45 : 1 - Math.abs(t - 0.5) * 0.9;
        for (const leg of santa.legs) {
            leg.hip.rotation.x = -0.55 * tuck;
            leg.knee.rotation.x = 0.15 + 0.9 * tuck;
        }
        santa.hips.position.y = HIPS_Y;
        santa.hips.rotation.set(0, 0, 0);
        santa.belly.scale.y = 0.95;
        santa.torso.rotation.set(0.14 * tuck, 0, 0);
        santa.head.rotation.set(-0.08, 0, 0);
        santa.hatTip.rotation.x = -0.95 - 0.35 * Math.sin(t * Math.PI);
        santa.hatTip.rotation.z = 0.15 * Math.sin(t * Math.PI * 3);
        santa.broomYaw.rotation.y = 0;
        santa.broomTilt.rotation.x = -1.2;
        santa.broomTilt.rotation.z = 0.08;
        holdBroom();
        renderer.render(scene, camera);
        if (t >= 1) land(to, tx);
    };

    const animate = (dt: number) => {
        if (state === 'fly' && jump) {
            fly(dt);
            return;
        }
        const st = stageId ? snow.stage(stageId) : null;
        if (!st) {
            setShown(false);
            if (stageId === 0) {
                enter();
                return;
            }
            const next = pickStage({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 }, 0);
            if (next) startJump(next.stage, next.x, null);
            return;
        }

        const H = window.innerHeight;
        settle = Math.max(0, settle - dt);
        if (settle <= 0 && state !== 'crouch' && state !== 'land' && performance.now() >= checkAt && lost(st)) {
            checkAt = performance.now() + 200;
            const next = pickStage({ x: st.vx + lx, y: st.vy }, st.id);
            if (next) {
                startJump(next.stage, next.x, st);
                if (state === 'fly') return;
            }
        }
        if (st.vy < -CH || st.vy > H + CH) {
            setShown(false);
            return;
        }
        if (lx < margin(st) || lx > st.width - margin(st)) lx = clampX(st, lx);

        timer -= dt;
        const wanted: 1 | -1 = target >= lx ? 1 : -1;
        let stride = 0;
        let sweeping = 0;
        let waving = 0;
        let crouch = 0;

        if (performance.now() - busyCheckedAt > 1000) refreshBusy(st);

        if (state === 'walk') {
            if (wanted !== dir && Math.abs(target - lx) > 3) {
                dir = wanted;
                state = 'turn';
                timer = 0.6;
            } else if (Math.abs(target - lx) <= 3 && stroll) {
                stroll = false;
                chooseTarget(st);
                stroll = false;
            } else if (Math.abs(target - lx) <= 3) {
                if (dir !== sweepSide) {
                    dir = sweepSide;
                    state = 'turn';
                    timer = 0.6;
                    target = lx;
                } else {
                    state = 'sweep';
                    timer = 3.4 + Math.random() * 2.6;
                    sweepPhase = 0;
                }
            } else {
                const step = Math.min(Math.abs(target - lx), speed * dt);
                lx += dir * step;
                walkPhase += (step / (0.5 * scale)) * Math.PI;
                stride = 1;
            }
        } else if (state === 'turn') {
            if (timer <= 0) state = 'walk';
        } else if (state === 'sweep') {
            sweepPhase += dt * 4.2;
            sweeping = 1;
            if (timer <= 0) {
                const hop = Math.random() < HOP_CHANCE ? pickStage({ x: st.vx + lx, y: st.vy }, st.id, H * 0.45) : null;
                if (hop) {
                    startJump(hop.stage, hop.x, st);
                } else if (Math.random() < 0.18 && isFree(st, lx)) {
                    state = 'wave';
                    timer = 3;
                    wavePhase = 0;
                } else {
                    chooseTarget(st);
                    state = 'walk';
                }
            }
        } else if (state === 'wave') {
            waving = 1;
            wavePhase += dt;
            if (timer <= 0) {
                chooseTarget(st);
                state = 'walk';
            }
        } else if (state === 'crouch') {
            crouch = 1 - Math.max(0, timer) / CROUCH_S;
            if (timer <= 0) state = 'fly';
        } else if (state === 'land') {
            crouch = Math.max(0, timer) / LAND_S;
            if (timer <= 0) {
                state = 'walk';
                chooseTarget(st);
            }
        }

        setShown(true);
        place(st.x + lx, st.y, st.open ? `inset(0 0 ${GROUND - 1}px 0)` : 'none');

        const along = dir > 0 ? Math.PI / 2 - 0.85 : -Math.PI / 2 + 0.85;
        const wantYaw = waving ? dir * 0.35 : along;
        yaw += (wantYaw - yaw) * Math.min(1, dt * 6);
        feet += (snowAt(st, lx) * 0.5 - feet) * Math.min(1, dt * 8);
        santa.root.position.y = feet;
        santa.root.rotation.y = yaw;

        const s = Math.sin(walkPhase);
        const lift = stride * 0.42;
        santa.legs[0].hip.rotation.x = -s * lift - 0.35 * crouch;
        santa.legs[1].hip.rotation.x = s * lift - 0.35 * crouch;
        santa.legs[0].knee.rotation.x = stride * (0.08 + 0.5 * Math.max(0, Math.sin(walkPhase - 1.1))) + 0.7 * crouch;
        santa.legs[1].knee.rotation.x = stride * (0.08 + 0.5 * Math.max(0, Math.sin(walkPhase + Math.PI - 1.1))) + 0.7 * crouch;
        santa.hips.position.y = HIPS_Y + stride * 0.02 * Math.cos(walkPhase * 2) - sweeping * 0.025 - 0.11 * crouch;
        santa.hips.rotation.y = stride * 0.07 * s;
        santa.hips.rotation.z = stride * 0.04 * s;
        santa.belly.scale.y = 0.95 + 0.02 * stride * Math.cos(walkPhase * 2) - 0.03 * crouch;
        const sw = Math.sin(sweepPhase);
        santa.hatTip.rotation.x = -0.95 + 0.12 * stride * Math.sin(walkPhase * 2) + 0.08 * sweeping * sw;
        santa.hatTip.rotation.z = 0.12 * sweeping * sw;

        santa.torso.rotation.y = sweeping * 0.3 * sw - stride * 0.05 * s;
        santa.torso.rotation.x = sweeping * 0.12 + 0.16 * crouch;
        santa.head.rotation.x = waving * -0.12 + sweeping * 0.1;
        santa.head.rotation.y = waving * 0.25 * Math.sin(wavePhase * 1.3);
        santa.broomYaw.rotation.y = sweeping * 0.6 * sw + stride * 0.05 * s;

        santa.root.updateMatrixWorld(true);
        const tipGuess = lx + Math.sin(yaw) * scale * 1.25;
        const surface = (snowAt(st, tipGuess) - feet) / scale + (stride ? 0.05 : 0);
        const h = BROOM_PIVOT_Y - surface;
        santa.broomTilt.rotation.x = waving ? -0.1 : -Math.acos(Math.min(0.999, Math.max(0.2, h / BROOM_LENGTH)));
        santa.broomTilt.rotation.z = waving ? 0.05 : 0.08;

        santa.root.updateMatrixWorld(true);
        if (waving) {
            const shoulder = santa.arms[0].shoulder;
            wave.set(shoulder.position.x - 0.12, shoulder.position.y + 0.42, 0.12 + 0.12 * Math.sin(wavePhase * 7));
            wave.x += 0.1 * Math.sin(wavePhase * 7);
            solveArm(santa.arms[0], santa.torso.localToWorld(wave.clone()), new Vector3(-1, -0.2, 0.2));
            solveArm(santa.arms[1], santa.grips[1].getWorldPosition(tmp), pole[1]);
        } else {
            holdBroom();
        }

        const tipX = lx + santa.tip.getWorldPosition(tmp).x - santa.root.position.x;
        if (sweeping) {
            const v = (tipX - lastTipX) / Math.max(dt, 1e-3);
            snow.sweep(st.id, tipX, 0.34 * scale, Math.min(0.5, Math.abs(v) * dt * 0.06), v);
        } else if (stride) {
            snow.sweep(st.id, tipX, 0.26 * scale, 0.05, dir);
        }
        lastTipX = tipX;

        renderer.render(scene, camera);
    };

    snow.onFrame(animate);
    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    return {
        stop() {
            window.removeEventListener('resize', onResize);
            const geometries = new Set<BufferGeometry>();
            santa.root.traverse((node) => {
                if (node instanceof Mesh) geometries.add(node.geometry);
            });
            geometries.forEach((geometry) => geometry.dispose());
            santa.materials.forEach((material) => material.dispose());
            renderer.dispose();
            renderer.forceContextLoss();
        },
    };
};
