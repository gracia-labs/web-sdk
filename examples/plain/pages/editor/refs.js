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

export function createAxes(length = 2, radius = 0.008) {
    const group = new THREE.Group();
    const tipRadius = radius * 1.8;
    const tipHeight = radius * 3.5;
    const shaftLen = length - tipHeight;

    const addAxis = (color, rotX, rotZ, pos) => {
        const mat = new THREE.MeshBasicMaterial({ color });
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, shaftLen, 16), mat);
        shaft.position.copy(pos);
        shaft.rotation.set(rotX, 0, rotZ);

        const tip = new THREE.Mesh(new THREE.ConeGeometry(tipRadius, tipHeight, 16), mat);
        tip.position
            .copy(pos)
            .add(new THREE.Vector3(0, shaftLen * 0.5 + tipHeight * 0.5, 0).applyEuler(shaft.rotation));
        tip.rotation.copy(shaft.rotation);
        group.add(shaft, tip);
    };

    addAxis(0xff4040, 0, -Math.PI / 2, new THREE.Vector3(shaftLen * 0.5, 0, 0));
    addAxis(0x40ff40, 0, 0, new THREE.Vector3(0, shaftLen * 0.5, 0));
    addAxis(0x4080ff, Math.PI / 2, 0, new THREE.Vector3(0, 0, shaftLen * 0.5));
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

/** Marks where a viewer's eye sits, with its frustum, so scale reads correctly. */
export function createEyeMarker(eyePos, targetPos, fov, label, color) {
    const group = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
    const wireMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 });

    const eye = new THREE.Vector3(eyePos.x, eyePos.y, eyePos.z);
    const target = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);
    const dir = new THREE.Vector3().subVectors(target, eye).normalize();

    const eyeSphere = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 8), mat);
    eyeSphere.position.copy(eye);

    const targetSphere = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 6), mat.clone());
    targetSphere.material.opacity = 0.6;
    targetSphere.position.copy(target);

    const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([eye, target]),
        new THREE.LineDashedMaterial({
            color,
            transparent: true,
            opacity: 0.5,
            dashSize: 0.05,
            gapSize: 0.03,
        }),
    );
    line.computeLineDistances();
    group.add(eyeSphere, targetSphere, line);

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

    const canvas = Object.assign(document.createElement("canvas"), { width: 256, height: 64 });
    const ctx = canvas.getContext("2d");
    ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif";
    ctx.fillStyle = `#${new THREE.Color(color).getHexString()}`;
    ctx.textAlign = "center";
    ctx.fillText(label, 128, 40);

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
    sprite.position.copy(eye).add(new THREE.Vector3(0, 0.15, 0));
    sprite.scale.set(0.5, 0.125, 1);
    group.add(sprite);

    group.traverse((child) => {
        child.raycast = () => {};
    });
    return group;
}
