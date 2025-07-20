// ฟังก์ชันสำหรับสร้างและตั้งค่า Face Mesh
function createFaceDetector() {
    // สร้าง instance ของ FaceMesh
    const faceMesh = new FaceMesh({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        }
    });

    // ตั้งค่า option ต่างๆ
    faceMesh.setOptions({
        maxNumFaces: 1,            // ตรวจจับแค่ 1 ใบหน้า
        refineLandmarks: true,     // เพิ่มความแม่นยำของจุดบน ตาและปาก
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    console.log("Face detector created.");
    return faceMesh;
}

// ฟังก์ชันสำหรับวาดเส้นบนใบหน้า (เพื่อทดสอบ)
function drawFaceLandmarks(ctx, landmarks) {
    if (!landmarks) return;

    // วาดเส้นเชื่อมทั้งใบหน้า
    drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, { color: '#C0C0C070', lineWidth: 1 });
    // วาดเส้นรอบดวงตา
    drawConnectors(ctx, landmarks, FACEMESH_RIGHT_EYE, { color: '#FF3030' });
    drawConnectors(ctx, landmarks, FACEMESH_LEFT_EYE, { color: '#30FF30' });
    // วาดเส้นรอบริมฝีปาก
    drawConnectors(ctx, landmarks, FACEMESH_LIPS, { color: '#E0E0E0' });
}