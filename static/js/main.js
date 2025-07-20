document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const video = document.getElementById('video');
    const canvas = document.getElementById('output-canvas');
    const ctx = canvas.getContext('2d');
    let faceMesh;

    // ================== ฟังก์ชัน onResults (จุดที่สำคัญที่สุด) ==================
    function onResults(results) {
        // Log ที่ 1: ถ้าเห็นข้อความนี้ แสดงว่า MediaPipe ทำงานและส่งผลลัพธ์กลับมาแล้ว
        console.log("SUCCESS: onResults ถูกเรียกแล้ว!", results);

        canvas.width = results.image.width;
        canvas.height = results.image.height;

        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const landmarks = results.multiFaceLandmarks[0];
            if (gameState !== 'STOPPED' && gameState !== 'WAITING') {
                runGameCycle(landmarks);
            }
        }
        
        ctx.restore();
        drawGame(ctx, canvas);
    }
    // =========================================================================

    startButton.addEventListener('click', async () => {
        console.log("1. กดปุ่ม Start แล้ว");
        startButton.style.display = 'none';

        try {
            await setupCamera(video);
            console.log("2. setupCamera ทำงานสำเร็จ");

            faceMesh = createFaceDetector();
            faceMesh.onResults(onResults);
            console.log("3. สร้าง Face Detector และตั้งค่า onResults เรียบร้อย");

            startGame(
                (update) => {
                    updateScoreDisplay(update.score);
                    updateTimerDisplay(update.timeLeft);
                },
                (result) => {
                    alert(`หมดเวลา! คะแนนสุดท้ายของคุณคือ: ${result.finalScore}`);
                    startButton.style.display = 'block';
                }
            );

            const processVideo = async () => {
                if (gameState !== 'STOPPED') {
                    // console.log("กำลังส่งเฟรมให้ MediaPipe..."); // ปิดไว้ก่อนเพราะมันจะแสดงผลเยอะมาก
                    await faceMesh.send({ image: video });
                    requestAnimationFrame(processVideo);
                }
            };

            console.log("4. กำลังจะเริ่ม Process Video Loop...");
            processVideo();

        } catch (error) {
            console.error("เกิดข้อผิดพลาดร้ายแรง:", error);
            alert("เกิดข้อผิดพลาด ไม่สามารถเริ่มกล้องหรือ Face Detector ได้");
        }
    });
});