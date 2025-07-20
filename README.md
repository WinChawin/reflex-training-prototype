# reflex-training-prototype
head movement training (Boxing)


reflex-training-prototype/
│
├── app.py              # (1) เซิร์ฟเวอร์หลัก
│
├── static/             # (2) โฟลเดอร์สำหรับไฟล์ทั้งหมดที่ส่งให้ผู้ใช้
│   ├── css/
│   │   └── style.css   # (3) ไฟล์สไตล์ แต่งหน้าตาเว็บ
│   └── js/
│       ├── main.js     # (4) ไฟล์หลักของ JavaScript (ตัวควบคุม)
│       ├── ui.js       # (5) จัดการ UI (คะแนน, เวลา)
│       ├── camera.js   # (6) จัดการการเข้าถึงกล้อง
│       ├── faceDetector.js # (7) จัดการการตรวจจับใบหน้า
│       └── game.js     # (8) Logic และสถานะของเกมทั้งหมด
│
└── templates/          # (9) โฟลเดอร์สำหรับไฟล์ HTML
    └── index.html      # (10) โครงสร้างหลักของหน้าเว็บ
