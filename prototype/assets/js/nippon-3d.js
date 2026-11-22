/* ==========================================================
   Nippon Paint Vinilex 3D Pro Max Studio — Tb. Andalan
   ========================================================== */

(function initNippon3DShowcase() {
  const stage = document.getElementById("np3dStage");
  const canvasWrap = document.getElementById("np3dCanvas");
  const section = document.getElementById("studio-cat");
  const dotEl = document.getElementById("np3dDot");
  const stageColorLabel = document.getElementById("np3dStageColor");
  const spinBtn = document.getElementById("np3dSpinBtn");
  const resetBtn = document.getElementById("np3dResetBtn");
  const flipBtn = document.getElementById("np3dFlipBtn");
  const wireBtn = document.getElementById("np3dWireBtn");
  const fullBtn = document.getElementById("np3dFullBtn");

  if (!stage || !canvasWrap || !section) return;

  let currentSwatch = {
    hex: "#B82937",
    name: "Crimson Red",
    code: "NP R 1357A"
  };

  let scene, camera, renderer, controls;
  let pailGroup, labelMaterial, redLidMat, ledRingMat, dynamicPointLight;
  let wireframeMaterials = [];
  let isVisible = true;
  let autoRotate = true;
  let showingBack = false;
  let targetRotationY = 0.22;
  let isWireframe = false;

  function drawRoundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function generateVinilexTexture(tintHex, tintLabel) {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    // Latar belakang putih mutiara kemasan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    bgGrad.addColorStop(0, "#f3f4f6");
    bgGrad.addColorStop(0.5, "#f9fafb");
    bgGrad.addColorStop(1, "#e5e7eb");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 2048, 1024);

    // 1. Pita Merah Melengkung Nippon Paint (dimulai setelah gap putih atas)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 95);
    ctx.quadraticCurveTo(1024, 155, 2048, 95);
    ctx.lineTo(2048, 365);
    ctx.quadraticCurveTo(1024, 465, 0, 365);
    ctx.closePath();

    const redBandGrad = ctx.createLinearGradient(0, 95, 2048, 420);
    redBandGrad.addColorStop(0, "#a30d1c");
    redBandGrad.addColorStop(0.28, "#dc1c2e");
    redBandGrad.addColorStop(0.5, "#ef2b3d");
    redBandGrad.addColorStop(0.72, "#c81224");
    redBandGrad.addColorStop(1, "#990b19");
    ctx.fillStyle = redBandGrad;
    ctx.fill();

    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 7;
    ctx.stroke();
    ctx.restore();

    // 2. Logo Resmi Nippon Paint (Kotak Biru Tua + Bingkai Putih + Kotak Merah + Huruf 'n')
    const lx = 735;
    const ly = 152;
    const lw = 175;
    const lh = 175;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = "#0e1938";
    drawRoundedRect(ctx, lx, ly, lw, lh, 16);
    ctx.fill();
    ctx.shadowColor = "transparent";

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 7;
    drawRoundedRect(ctx, lx + 9, ly + 9, lw - 18, lh - 18, 11);
    ctx.stroke();

    ctx.fillStyle = "#e11d2e";
    ctx.fillRect(lx + 24, ly + 24, lw - 48, lh - 48);

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(lx + 45, ly + 148);
    ctx.lineTo(lx + 45, ly + 46);
    ctx.lineTo(lx + 92, ly + 46);
    ctx.quadraticCurveTo(lx + 134, ly + 46, lx + 134, ly + 90);
    ctx.lineTo(lx + 134, ly + 148);
    ctx.lineTo(lx + 102, ly + 148);
    ctx.lineTo(lx + 102, ly + 92);
    ctx.quadraticCurveTo(lx + 102, ly + 74, lx + 86, ly + 74);
    ctx.lineTo(lx + 77, ly + 74);
    ctx.lineTo(lx + 77, ly + 148);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 3. Teks "NIPPON PAINT" tebal miring
    ctx.save();
    ctx.fillStyle = "#f8fafc";
    ctx.font = "italic 900 84px Arial, Helvetica, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("NIPPON", 935, 228);
    ctx.fillText("PAINT", 935, 312);
    ctx.restore();

    // 4. Sapuan Kuas Dinamis di belakang "Vinilex"
    ctx.save();
    ctx.strokeStyle = tintHex;
    ctx.lineCap = "round";
    ctx.lineWidth = 34;
    ctx.beginPath();
    ctx.moveTo(765, 695);
    ctx.bezierCurveTo(860, 560, 1040, 495, 1295, 535);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(745, 725);
    ctx.bezierCurveTo(850, 605, 1020, 540, 1250, 565);
    ctx.stroke();
    ctx.restore();

    // 5. Tipografi Utama "Vinilex" + "Interior & Eksterior"
    ctx.save();
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = "900 172px Arial, Helvetica, sans-serif";
    ctx.lineWidth = 13;
    ctx.strokeStyle = "#18181b";
    ctx.strokeText("Vinilex", 1035, 620);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Vinilex", 1035, 620);

    ctx.font = "bold 34px Arial, Helvetica, sans-serif";
    ctx.fillStyle = "#1f2937";
    ctx.fillText("Interior & Eksterior", 1110, 668);
    ctx.restore();

    // 6. Ilustrasi Mawar Merah di Kiri Bawah
    ctx.save();
    const rx = 640;
    const ry = 845;
    const roseColors = ["#7f0917", "#a80f22", "#c8162c", "#940b1c", "#df2238"];
    for (let layer = 0; layer < 3; layer++) {
      const petals = 7 - layer;
      const rad = 78 - layer * 20;
      for (let i = 0; i < petals; i++) {
        ctx.save();
        ctx.translate(rx, ry);
        ctx.rotate((i * Math.PI * 2) / petals + layer * 0.5);
        ctx.fillStyle = roseColors[(i + layer) % roseColors.length];
        ctx.beginPath();
        ctx.ellipse(0, -rad * 0.5, rad * 0.52, rad * 0.78, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.restore();

    // 7. Sofa & Deretan Bantal Piramida 3D Putih & Abu-abu Gelap
    ctx.save();
    const sofaGrad = ctx.createLinearGradient(0, 860, 0, 995);
    sofaGrad.addColorStop(0, "#e5e7eb");
    sofaGrad.addColorStop(0.4, "#f9fafb");
    sofaGrad.addColorStop(1, "#d1d5db");
    ctx.fillStyle = sofaGrad;
    ctx.beginPath();
    ctx.moveTo(710, 910);
    ctx.quadraticCurveTo(1060, 875, 1380, 825);
    ctx.lineTo(1380, 985);
    ctx.lineTo(710, 995);
    ctx.closePath();
    ctx.fill();

    function drawPyramidPillow(x, y, w, h, leftColor, rightColor) {
      ctx.fillStyle = "rgba(0,0,0,0.16)";
      ctx.beginPath();
      ctx.ellipse(x, y + 6, w * 0.52, 12, -0.08, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = leftColor;
      ctx.beginPath();
      ctx.moveTo(x - w * 0.5, y);
      ctx.quadraticCurveTo(x - w * 0.22, y - h * 0.55, x - 4, y - h);
      ctx.lineTo(x + 4, y + 4);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = rightColor;
      ctx.beginPath();
      ctx.moveTo(x - 4, y - h);
      ctx.quadraticCurveTo(x + w * 0.28, y - h * 0.5, x + w * 0.5, y - 4);
      ctx.lineTo(x + 4, y + 4);
      ctx.closePath();
      ctx.fill();
    }

    drawPyramidPillow(855, 895, 135, 130, "#f3f4f6", "#d1d5db");
    drawPyramidPillow(995, 925, 115, 115, "#6b7280", "#4b5563");
    drawPyramidPillow(1090, 875, 105, 105, "#e5e7eb", "#cbd5e1");
    drawPyramidPillow(1145, 905, 105, 105, "#52525b", "#3f3f46");
    drawPyramidPillow(1225, 845, 95, 98, "#f3f4f6", "#d1d5db");
    drawPyramidPillow(1265, 875, 95, 100, "#4b5563", "#374151");
    ctx.restore();

    // 8. Blok Merah Vertikal & Kotak Barcode di Sisi Kanan
    ctx.save();
    ctx.fillStyle = "#c81224";
    ctx.fillRect(1375, 360, 145, 620);

    ctx.fillStyle = "#ffffff";
    drawRoundedRect(ctx, 1395, 765, 110, 140, 8);
    ctx.fill();

    ctx.fillStyle = "#111827";
    for (let bx = 1412; bx < 1490; bx += 6) {
      ctx.fillRect(bx, 835, bx % 12 === 0 ? 3 : 1.5, 48);
    }
    ctx.restore();

    // 9. Sisi Belakang Kemasan (Spesifikasi Teknis + Badge Warna Tinting)
    ctx.save();
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 34px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("SPESIFIKASI TEKNIS VINILEX", 110, 460);

    ctx.font = "23px Arial, sans-serif";
    ctx.fillStyle = "#374151";
    const specs = [
      "• Daya Sebar Teoritis : 10 – 12 m² / liter / lapis",
      "• Waktu Kering Sentuh : 15 – 30 menit (30°C)",
      "• Pengenceran         : Air bersih 10% – 20%",
      "• Aplikasi            : Kuas, Rol, atau Spray",
      "• Keunggulan          : Anti-Jamur, Anti-Pudar & Green Label"
    ];
    specs.forEach((line, idx) => {
      ctx.fillText(line, 110, 520 + idx * 46);
    });

    ctx.fillStyle = "#111827";
    drawRoundedRect(ctx, 110, 775, 450, 105, 16);
    ctx.fill();

    ctx.fillStyle = tintHex;
    drawRoundedRect(ctx, 132, 795, 65, 65, 12);
    ctx.fill();

    ctx.fillStyle = "#E8C766";
    ctx.font = "bold 18px Arial, sans-serif";
    ctx.fillText("WARNA TINTING AKTIF:", 218, 822);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 23px Arial, sans-serif";
    ctx.fillText(tintLabel, 218, 855);
    ctx.restore();

    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 985, 2048, 39);

    const texture = new THREE.CanvasTexture(canvas);
    if (THREE.sRGBEncoding) texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    texture.wrapS = THREE.RepeatWrapping;
    texture.offset.x = 0.25;
    texture.needsUpdate = true;
    return texture;
  }

  function buildSceneModels() {
    pailGroup = new THREE.Group();
    scene.add(pailGroup);

    const whitePlastic = new THREE.MeshPhysicalMaterial({
      color: 0xf5f6f8,
      roughness: 0.26,
      metalness: 0.02,
      clearcoat: 0.4,
      clearcoatRoughness: 0.22
    });

    redLidMat = new THREE.MeshPhysicalMaterial({
      color: 0xb82937,
      roughness: 0.22,
      metalness: 0.05,
      clearcoat: 0.65,
      clearcoatRoughness: 0.18
    });

    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xe2e4e8,
      roughness: 0.35,
      metalness: 0.08
    });

    const topR = 1.04;
    const botR = 0.89;
    const bodyHeight = 2.08;

    // 1. Badan Utama Ember Tapered
    const bodyMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(topR, botR, bodyHeight, 96, 1, false),
      whitePlastic
    );
    bodyMesh.position.y = 1.12;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    pailGroup.add(bodyMesh);

    function createRing(radius, tube, y, material) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 16, 96), material);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y;
      ring.castShadow = true;
      pailGroup.add(ring);
      return ring;
    }

    createRing(0.905, 0.032, 0.11, whitePlastic);
    const baseCap = new THREE.Mesh(new THREE.CylinderGeometry(0.89, 0.89, 0.08, 72), whitePlastic);
    baseCap.position.y = 0.06;
    pailGroup.add(baseCap);

    // 2. Tutup Ganda
    createRing(1.065, 0.032, 2.13, whitePlastic);
    const whiteLidLip = new THREE.Mesh(new THREE.CylinderGeometry(1.11, 1.08, 0.08, 96), whitePlastic);
    whiteLidLip.position.y = 2.18;
    whiteLidLip.castShadow = true;
    pailGroup.add(whiteLidLip);

    createRing(1.105, 0.034, 2.24, redLidMat);
    const redLidTop = new THREE.Mesh(new THREE.CylinderGeometry(1.09, 1.11, 0.065, 96), redLidMat);
    redLidTop.position.y = 2.25;
    redLidTop.castShadow = true;
    pailGroup.add(redLidTop);

    // 3. Label Vinilex 2048x1024
    labelMaterial = new THREE.MeshStandardMaterial({
      map: generateVinilexTexture(currentSwatch.hex, `${currentSwatch.name} (${currentSwatch.code})`),
      roughness: 0.34,
      metalness: 0.03
    });
    const labelCylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(topR + 0.004, botR + 0.004, bodyHeight - 0.06, 96, 1, true),
      labelMaterial
    );
    labelCylinder.position.y = 1.12;
    pailGroup.add(labelCylinder);

    // 4. Kuping Gagang & Gagang Ayun Menjuntai
    for (const side of [-1, 1]) {
      const earGroup = new THREE.Group();
      const basePlate = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.14), handleMat);
      const pivotPin = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.11, 24), handleMat);
      pivotPin.rotation.z = Math.PI / 2;
      pivotPin.position.x = side * 0.045;
      earGroup.add(basePlate, pivotPin);
      earGroup.position.set(side * 1.03, 1.98, 0);
      pailGroup.add(earGroup);
    }

    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.07, 1.98, 0.0),
      new THREE.Vector3(-1.14, 1.62, 0.35),
      new THREE.Vector3(-0.88, 1.18, 0.78),
      new THREE.Vector3(-0.42, 0.92, 1.04),
      new THREE.Vector3(0.0, 0.85, 1.11),
      new THREE.Vector3(0.42, 0.92, 1.04),
      new THREE.Vector3(0.88, 1.18, 0.78),
      new THREE.Vector3(1.14, 1.62, 0.35),
      new THREE.Vector3(1.07, 1.98, 0.0)
    ]);
    const handleMesh = new THREE.Mesh(new THREE.TubeGeometry(handleCurve, 96, 0.026, 14, false), handleMat);
    handleMesh.castShadow = true;
    pailGroup.add(handleMesh);

    wireframeMaterials = [whitePlastic, redLidMat, handleMat, labelMaterial];

    // 5. Pedestal Turntable Pro Max dengan Cincin LED Bercahaya di Bawah Ember
    const pedestalGroup = new THREE.Group();
    const pedBaseMat = new THREE.MeshStandardMaterial({
      color: 0x1c2028,
      metalness: 0.72,
      roughness: 0.28
    });
    const pedBase = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.85, 0.12, 96), pedBaseMat);
    pedBase.position.y = -0.06;
    pedBase.receiveShadow = true;
    pedestalGroup.add(pedBase);

    const pedTopRim = new THREE.Mesh(new THREE.TorusGeometry(1.74, 0.02, 12, 96), pedBaseMat);
    pedTopRim.rotation.x = Math.PI / 2;
    pedTopRim.position.y = 0.0;
    pedestalGroup.add(pedTopRim);

    ledRingMat = new THREE.MeshBasicMaterial({
      color: 0xe8f0ff,
      transparent: true,
      opacity: 0.88
    });
    const ledRing = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.016, 12, 96), ledRingMat);
    ledRing.rotation.x = Math.PI / 2;
    ledRing.position.y = 0.005;
    pedestalGroup.add(ledRing);

    const shadowFloor = new THREE.Mesh(
      new THREE.CircleGeometry(1.55, 64),
      new THREE.ShadowMaterial({ opacity: 0.45 })
    );
    shadowFloor.rotation.x = -Math.PI / 2;
    shadowFloor.position.y = 0.006;
    shadowFloor.receiveShadow = true;
    pedestalGroup.add(shadowFloor);

    scene.add(pedestalGroup);

    pailGroup.rotation.y = 0.22;
  }

  function resizeRenderer() {
    if (!renderer || !camera) return;
    const w = stage.clientWidth || 480;
    const h = stage.clientHeight || 580;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function initThree() {
    if (typeof THREE === "undefined") return;

    scene = new THREE.Scene();
    const w = stage.clientWidth || 480;
    const h = stage.clientHeight || 580;
    camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 100);
    camera.position.set(0, 2.35, 6.2);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    canvasWrap.appendChild(renderer.domElement);

    // Pencahayaan Studio Pro Max
    scene.add(new THREE.HemisphereLight(0xffffff, 0x4b5563, 1.65));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3.8, 6.5, 5.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.1);
    fillLight.position.set(-4.5, 2.5, 3.0);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.7);
    rimLight.position.set(0, 4.5, -5.5);
    scene.add(rimLight);

    dynamicPointLight = new THREE.PointLight(currentSwatch.hex, 0.85, 10);
    dynamicPointLight.position.set(2.2, 2.0, 3.2);
    scene.add(dynamicPointLight);

    buildSceneModels();

    if (typeof THREE.OrbitControls === "function") {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 1.12, 0);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.minDistance = 3.6;
      controls.maxDistance = 9.0;
      controls.maxPolarAngle = Math.PI * 0.54;
      controls.minPolarAngle = 0.22;
    }

    function animate() {
      window.requestAnimationFrame(animate);
      if (!isVisible) return;

      if (pailGroup) {
        if (autoRotate) {
          pailGroup.rotation.y += 0.004;
          targetRotationY = pailGroup.rotation.y;
        } else {
          pailGroup.rotation.y += (targetRotationY - pailGroup.rotation.y) * 0.08;
        }
      }

      if (controls) controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", resizeRenderer);
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        entries => {
          isVisible = entries[0].isIntersecting;
        },
        { threshold: 0.05 }
      );
      obs.observe(section);
    }
  }

  // Tombol Kontrol 3D
  if (spinBtn) {
    spinBtn.addEventListener("click", () => {
      autoRotate = !autoRotate;
      spinBtn.textContent = autoRotate ? "⏸ Putar Otomatis" : "▶ Putar Otomatis";
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      showingBack = false;
      autoRotate = true;
      targetRotationY = 0.22;
      if (pailGroup) pailGroup.rotation.y = 0.22;
      if (camera && controls) {
        camera.position.set(0, 2.35, 6.2);
        controls.target.set(0, 1.12, 0);
        controls.update();
      }
      if (spinBtn) spinBtn.textContent = "⏸ Putar Otomatis";
      if (flipBtn) flipBtn.textContent = "📄 Lihat Spek Belakang";
    });
  }

  if (flipBtn) {
    flipBtn.addEventListener("click", () => {
      autoRotate = false;
      if (spinBtn) spinBtn.textContent = "▶ Putar Otomatis";
      showingBack = !showingBack;
      targetRotationY = showingBack ? Math.PI + 0.22 : 0.22;
      flipBtn.textContent = showingBack ? "🎨 Lihat Depan Kemasan" : "📄 Lihat Spek Belakang";
    });
  }

  if (wireBtn) {
    wireBtn.addEventListener("click", () => {
      isWireframe = !isWireframe;
      wireBtn.classList.toggle("active", isWireframe);
      wireframeMaterials.forEach(mat => {
        if (mat) mat.wireframe = isWireframe;
      });
    });
  }

  if (fullBtn) {
    fullBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        stage.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.();
      }
    });
  }

  // Integrasi Real-Time Swatch Palet Warna
  document.querySelectorAll(".np3d-swatch").forEach(btn => {
    btn.addEventListener("click", () => {
      const hex = btn.getAttribute("data-hex");
      const name = btn.getAttribute("data-name");
      const code = btn.getAttribute("data-code");
      currentSwatch = { hex, name, code };

      document.querySelectorAll(".np3d-swatch").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const fullLabel = `${name} (${code})`;
      if (dotEl) dotEl.style.background = hex;
      if (stageColorLabel) stageColorLabel.textContent = fullLabel;

      if (labelMaterial && typeof THREE !== "undefined") {
        if (labelMaterial.map) labelMaterial.map.dispose();
        labelMaterial.map = generateVinilexTexture(hex, fullLabel);
        labelMaterial.needsUpdate = true;

        if (redLidMat) redLidMat.color.set(hex);
        if (dynamicPointLight) dynamicPointLight.color.set(hex);
      }
    });
  });

  // Modal Pemesanan Cepat
  window.showNp3dOrderModal = function (productName) {
    const modal = document.getElementById("np3dOrderModal");
    const title = document.getElementById("np3dModalTitle");
    const colorInfo = document.getElementById("np3dModalColor");
    const fb = document.getElementById("np3dModalFeedback");
    if (!modal) return;
    if (title) title.textContent = productName;
    if (colorInfo) colorInfo.textContent = `${currentSwatch.name} (${currentSwatch.code})`;
    if (fb) fb.classList.remove("show");
    modal.classList.add("show");
  };

  window.closeNp3dOrderModal = function () {
    const modal = document.getElementById("np3dOrderModal");
    if (modal) modal.classList.remove("show");
  };

  window.submitNp3dOrder = function () {
    const nameEl = document.getElementById("np3dCustName");
    const qtyEl = document.getElementById("np3dCustQty");
    const titleEl = document.getElementById("np3dModalTitle");
    const fb = document.getElementById("np3dModalFeedback");

    const custName = (nameEl && nameEl.value.trim()) || "Pelanggan";
    const qty = (qtyEl && qtyEl.value) || 1;
    const product = (titleEl && titleEl.textContent) || "Nippon Paint";

    if (fb) {
      fb.innerHTML = `Mengalihkan ke WhatsApp untuk <b>${qty} kaleng ${product}</b> warna <b>${currentSwatch.name} (${currentSwatch.code})</b>...`;
      fb.classList.add("show");
    }

    const msg = `Halo ${typeof CONFIG !== "undefined" ? CONFIG.storeName : "TB. Andalan Bogor"}, saya ingin pesan cat Nippon Paint (Studio Tinting 3D):\n\n• Produk: ${product}\n• Warna: ${currentSwatch.name} (${currentSwatch.code})\n• Jumlah: ${qty} kaleng/pail\n• Nama Pemesan: ${custName}`;
    if (typeof openWA === "function") {
      openWA(msg);
    }
  };

  initThree();
})();
