import { THREE } from "@gracia/web-sdk/aio";

export function createGrid(size = 20, divisions = 40, lineWidth = 0.006) {
    const group = new THREE.Group();
    const half = size * 0.5;
    const step = size / divisions;
    const minor = new THREE.MeshBasicMaterial({ color: 0x555555 });
    const major = new THREE.MeshBasicMaterial({ color: 0x888888 });
    const y = lineWidth * 0.5;

    for (let i = 0; i <= divisions; i++) {
        const pos = -half + i * step;
        const isMajor = i === 0 || i === divisions || i === divisions / 2;
        const mat = isMajor ? major : minor;
        const w = isMajor ? lineWidth * 1.35 : lineWidth;

        const lineX = new THREE.Mesh(new THREE.BoxGeometry(size, w, w), mat);
        lineX.position.set(0, y, pos);
        const lineZ = new THREE.Mesh(new THREE.BoxGeometry(w, w, size), mat);
        lineZ.position.set(pos, y, 0);
        group.add(lineX, lineZ);
    }
    return group;
}

function createLabel(text, color) {
    const canvas = Object.assign(document.createElement("canvas"), { width: 256, height: 64 });
    const ctx = canvas.getContext("2d");
    ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif";
    ctx.fillStyle = `#${new THREE.Color(color).getHexString()}`;
    ctx.textAlign = "center";
    ctx.fillText(text, 128, 40);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.85,
            alphaTest: 0.02,
            premultipliedAlpha: true,
        }),
    );
    sprite.scale.set(0.5, 0.125, 1);
    return sprite;
}

export function createOriginMarker() {
    const onTop = { depthTest: false, depthWrite: false };
    const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 16, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff, ...onTop }),
    );
    const label = createLabel("0, 0, 0", 0xffffff);
    Object.assign(label.material, onTop);
    label.position.set(0, -0.1, 0);

    const group = new THREE.Group().add(dot, label);
    group.traverse((child) => {
        child.renderOrder = -1;
    });
    return group;
}

export function createHuman(height = 1.75) {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
        color: 0xbfc5d2,
        roughness: 0.9,
        metalness: 0,
        side: THREE.DoubleSide,
    });

    const headR = height * 0.065;
    const headY = height - headR;
    const shoulderY = headY - headR * 1.55;
    const hipY = height * 0.52;
    const legR = height * 0.042;
    const torsoR = height * 0.105;
    const armR = legR * 0.72;

    const leg = (x) => {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(legR, legR * 0.85, hipY, 10), mat);
        m.position.set(x, hipY * 0.5, 0);
        return m;
    };
    group.add(leg(-torsoR * 0.35), leg(torsoR * 0.35));

    const torsoH = shoulderY - hipY;
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(torsoR * 0.82, torsoR * 0.95, torsoH, 12), mat);
    torso.position.y = hipY + torsoH * 0.5;

    const head = new THREE.Mesh(new THREE.SphereGeometry(headR, 16, 12), mat);
    head.position.y = headY;
    group.add(torso, head);

    const armLen = height * 0.36;
    const arm = (x) => {
        const g = new THREE.Group();
        const limbLen = armLen * 0.9;
        const limb = new THREE.Mesh(new THREE.CylinderGeometry(armR, armR * 0.42, limbLen, 8), mat);
        limb.position.y = -limbLen * 0.5;
        const handR = armR * 0.28;
        const hand = new THREE.Mesh(new THREE.SphereGeometry(handR, 8, 6), mat);
        hand.position.y = -limbLen - handR * 0.45;
        g.add(limb, hand);
        g.position.set(x, shoulderY, 0);
        return g;
    };
    group.add(arm(-torsoR - armR), arm(torsoR + armR));

    return group;
}

function createSightLine(from, to, color) {
    const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 10, 6),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 }),
    );
    dot.position.copy(to);

    const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([from, to]),
        new THREE.LineDashedMaterial({
            color,
            transparent: true,
            opacity: 0.5,
            dashSize: 0.05,
            gapSize: 0.03,
        }),
    );
    line.computeLineDistances();
    return [dot, line];
}

/** Marks where a viewer's eye sits, with its frustum, so scale reads correctly. */
export function createEyeMarker(eyePos, targetPos, fov, label, color, labelOffset = { x: 0, y: 0.15, z: 0 }) {
    const group = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
    const wireMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 });

    const eye = new THREE.Vector3(eyePos.x, eyePos.y, eyePos.z);
    const target = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);
    const dir = new THREE.Vector3().subVectors(target, eye).normalize();

    const eyeSphere = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 8), mat);
    eyeSphere.position.copy(eye);
    group.add(eyeSphere, ...createSightLine(eye, target, color));

    const len = 0.25;
    const halfV = Math.tan(((fov * Math.PI) / 180) * 0.5) * len;
    const halfH = halfV * (16 / 9);
    const right = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0)).normalize();
    const up = new THREE.Vector3().crossVectors(right, dir).normalize();
    const far = eye.clone().add(dir.clone().multiplyScalar(len));
    const corners = [
        [halfH, halfV],
        [-halfH, halfV],
        [-halfH, -halfV],
        [halfH, -halfV],
    ].map(([h, v]) =>
        far.clone().add(right.clone().multiplyScalar(h)).add(up.clone().multiplyScalar(v)),
    );

    const points = [];
    for (let i = 0; i < 4; i++) points.push(eye, corners[i], corners[i], corners[(i + 1) % 4]);
    group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points), wireMat));

    const sprite = createLabel(label, color);
    sprite.position.copy(eye).add(new THREE.Vector3(labelOffset.x, labelOffset.y, labelOffset.z));
    group.add(sprite);

    group.traverse((child) => {
        child.raycast = () => {};
    });
    return group;
}

/** Marks where a VR viewer's eyes start; the ring says the headset, not the content, decides where they look. */
export function createHeadMarker(eyePos, label, color) {
    const group = new THREE.Group();
    const eye = new THREE.Vector3(eyePos.x, eyePos.y, eyePos.z);

    const eyeSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 12, 8),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }),
    );
    eyeSphere.position.copy(eye);

    const ring = [];
    for (let i = 0; i <= 48; i++) {
        const a = (i / 48) * Math.PI * 2;
        ring.push(eye.clone().add(new THREE.Vector3(Math.cos(a) * 0.25, 0, Math.sin(a) * 0.25)));
    }
    const lookAround = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(ring),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.5 }),
    );

    const sprite = createLabel(label, color);
    sprite.position.copy(eye).add(new THREE.Vector3(0, 0.15, 0));

    const ahead = eye.clone().add(new THREE.Vector3(0, 0, -0.5));
    group.add(eyeSphere, lookAround, ...createSightLine(eye, ahead, color), sprite);
    group.traverse((child) => {
        child.raycast = () => {};
    });
    return group;
}
