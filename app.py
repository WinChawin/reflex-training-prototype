# 1. นำเข้า Library ที่จำเป็นจาก Flask
from flask import Flask, render_template

# 2. สร้าง instance ของ Flask application
# Flask จะรู้โดยอัตโนมัติว่า 'templates' และ 'static' เป็นโฟลเดอร์มาตรฐาน
app = Flask(__name__)

# 3. สร้าง "Route" หรือเส้นทางสำหรับหน้าแรกของเว็บ (URL หลัก)
@app.route('/')
def home():
    # 4. เมื่อมีคนเข้ามาที่หน้าแรก ให้ส่งไฟล์ index.html กลับไปแสดงผล
    # Flask จะมองหาไฟล์นี้ในโฟลเดอร์ 'templates' โดยอัตโนมัติ
    return render_template('index.html')

# 5. ส่วนที่ทำให้รันไฟล์นี้ได้โดยตรงด้วยคำสั่ง "python app.py"
if __name__ == '__main__':
    # การใส่ debug=True จะช่วยให้เมื่อคุณแก้ไขโค้ด เซิร์ฟเวอร์จะรีสตาร์ทเอง
    app.run(debug=True)