// ฟังก์ชันนี้รับ video element เข้ามา แล้วเปิดกล้องใส่ element นั้น
async function setupCamera(videoElement) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('เบราว์เซอร์ของคุณไม่รองรับการใช้งานกล้อง');
        throw new Error('Camera not supported by this browser.');
    }

    // ขออนุญาตใช้กล้อง
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
    });

    // นำสตรีมจากกล้องไปใส่ใน video element
    videoElement.srcObject = stream;

    // รอให้วิดีโอโหลดข้อมูลเสร็จแล้วค่อยเริ่มเล่น
    await new Promise((resolve) => {
        videoElement.onloadedmetadata = () => {
            videoElement.play();
            resolve();
        };
    });

    console.log("กล้องพร้อมใช้งานแล้ว");
    return videoElement;
}