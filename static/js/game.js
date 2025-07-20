// --- ค่าคงที่ของเกม ---
const SESSION_DURATION = 90; // 90 วินาที
const IDLE_INTERVAL = 1500; // 1.5 วินาที
const GREEN_DURATION = 500; // 0.5 วินาที
const RED_DURATION = 250; // 0.25 วินาที
const SCORE_SUCCESS = 5;
const SCORE_FAIL = -10;

// --- ตัวแปรสถานะเกม ---
let score = 0;
let timeLeft = SESSION_DURATION;
let gameState = 'STOPPED'; // STOPPED, IDLE, GREEN, RED
let gameTimer, stateTimer;
let targetCircle = null; // { x, y, radius }

// --- ฟังก์ชันหลัก ---

function startGame(onUpdate, onEnd) {
    if (gameState !== 'STOPPED') return;
    console.log("Game Starting!");

    // รีเซ็ตค่า
    score = 0;
    timeLeft = SESSION_DURATION;
    gameState = 'IDLE';
    onUpdate({ score, timeLeft });

    // เริ่มนับเวลาถอยหลังของเกม
    gameTimer = setInterval(() => {
        timeLeft--;
        onUpdate({ score, timeLeft });
        if (timeLeft <= 0) {
            endGame(onEnd);
        }
    }, 1000);

    // เริ่มวงจรแรก
    runGameCycle();
}

function endGame(onEnd) {
    console.log("Game Over!");
    clearInterval(gameTimer);
    clearTimeout(stateTimer);
    gameState = 'STOPPED';
    onEnd({ finalScore: score });
}

function runGameCycle(landmarks) {
    if (gameState === 'STOPPED') return;

    switch (gameState) {
        case 'IDLE':
            console.log("State: IDLE -> Waiting 5s");
            gameState = 'WAITING';
            stateTimer = setTimeout(() => {
                gameState = 'GREEN';
            }, IDLE_INTERVAL);
            break;

        case 'GREEN':
            if (landmarks) {
                console.log("State: GREEN -> Showing circle for 3s");
                const mouthPoints = [13, 14, 61, 291, 308, 78, 191, 80, 81, 82, 17, 317, 318, 402, 314];
                let sumX = 0;
                let sumY = 0;
                for (const index of mouthPoints) {
                    // **แก้ไขตรงนี้: พลิกค่าแกน X ของ landmark**
                    sumX += (1.0 - landmarks[index].x);
                    sumY += landmarks[index].y; // แกน Y ไม่ต้องเปลี่ยน
                }
                const mouthCenterX = sumX / mouthPoints.length;
                const mouthCenterY = sumY / mouthPoints.length;

                // การคำนวณความกว้างใบหน้ายังใช้ได้เหมือนเดิม
                const faceLeft = landmarks[234];
                const faceRight = landmarks[454];
                const faceWidth = Math.hypot(faceLeft.x - faceRight.x, faceLeft.y - faceRight.y);

                targetCircle = {
                    x: mouthCenterX,
                    y: mouthCenterY,
                    radius: faceWidth * 0.4
                };

                gameState = 'GREEN_SHOWING';
                stateTimer = setTimeout(() => {
                    gameState = 'RED';
                }, GREEN_DURATION);
            }
            break;

        case 'RED':
            console.log("State: RED -> Checking position for 1s");
            const currentMouthPoints = [13, 14, 61, 291, 308, 78, 191, 80, 81, 82, 17, 317, 318, 402, 314];
            let currentSumX = 0;
            let currentSumY = 0;
            for (const index of currentMouthPoints) {
                // **แก้ไขตรงนี้ด้วย: พลิกค่าแกน X ของ landmark ปัจจุบัน**
                currentSumX += (1.0 - landmarks[index].x);
                currentSumY += landmarks[index].y;
            }
            const currentMouthCenterX = currentSumX / currentMouthPoints.length;
            const currentMouthCenterY = currentSumY / currentMouthPoints.length;

            const distance = Math.hypot(currentMouthCenterX - targetCircle.x, currentMouthCenterY - targetCircle.y);

            if (distance > targetCircle.radius) {
                console.log("หลบทัน! +5");
                score += SCORE_SUCCESS;
            } else {
                console.log("หลบไม่ทัน! -10");
                score += SCORE_FAIL;
            }

            gameState = 'RED_SHOWING';
            stateTimer = setTimeout(() => {
                targetCircle = null;
                gameState = 'IDLE';
            }, RED_DURATION);
            break;
    }
}

function drawGame(ctx, canvas) {
    if (!targetCircle) return;
    
    // แปลงพิกัด (0-1) เป็นพิกัดจริงบน canvas
    const x = targetCircle.x * canvas.width;
    const y = targetCircle.y * canvas.height;
    const radius = targetCircle.radius * canvas.width; // ใช้ width เป็นหลักในการคำนวณ

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    
    if (gameState === 'GREEN_SHOWING') {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; // สีเขียวโปร่งแสง
    } else if (gameState === 'RED_SHOWING') {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // สีแดงโปร่งแสง
    }
    ctx.fill();
}