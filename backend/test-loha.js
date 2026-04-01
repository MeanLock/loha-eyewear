const { SerialPort } = require('serialport');

const port = new SerialPort({ path: 'COM2', baudRate: 9600 });

let dataBuffer = ''; // Nơi chứa dữ liệu tạm thời

console.log('--- LOHA BRIDGE SERVICE IS READY ---');

port.on('data', (chunk) => {
  // 1. Cộng dồn dữ liệu mới nhận được vào Buffer
  dataBuffer += chunk.toString();

  console.log('... Đang nhận dữ liệu ...');

  // 2. Kiểm tra xem đã nhận hết một đợt đo chưa (Thường máy Tomey kết thúc bằng dấu xuống dòng hoặc ký tự đặc biệt)
  // Ở đây mình giả sử mỗi lần nhấn Send là một đợt
  clearTimeout(this.idleTimer);
  this.idleTimer = setTimeout(() => {
    processMeasurement(dataBuffer);
    dataBuffer = ''; // Xóa buffer để đợi đợt đo tiếp theo
  }, 500); // Nếu sau 500ms không thấy dữ liệu mới -> Coi như đã đo xong
});

function processMeasurement(rawText) {
  console.log('\n=== KẾT QUẢ ĐO TỪ MÁY TOMEY RC-5000 ===');

  // 1. Tách khối Mắt Phải và Mắt Trái
  const rightBlock = rawText.match(/<RIGHT>([\s\S]*?)---/);
  const leftBlock = rawText.match(/<LEFT>([\s\S]*?)PD/);

  // 2. Hàm bóc dòng có dấu * (Dòng trung bình)
  const parseAverage = (block) => {
    if (!block) return null;
    // Tìm dòng có dấu * rồi bóc 3 cụm số: SPH, CYL, AXIS
    const avgMatch = block[1].match(
      /\*\s*([-+]?\d+\.\d+)\s*([-+]?\d+\.\d+)\s*(\d+)/,
    );
    if (avgMatch) {
      return {
        sph: avgMatch[1],
        cyl: avgMatch[2],
        axis: avgMatch[3],
      };
    }
    return null;
  };

  const rightEye = parseAverage(rightBlock);
  const leftEye = parseAverage(leftBlock);
  const pdMatch = rawText.match(/PD=(\d+)mm/);

  console.log('Mắt Phải (R):', rightEye || 'Không tìm thấy');
  console.log('Mắt Trái (L):', leftEye || 'Không tìm thấy');
  console.log('Khoảng cách đồng tử (PD):', pdMatch ? pdMatch[1] : 'N/A');

  // 3. Gửi data về LoHa Server
  if (rightEye && leftEye) {
    // sendToLoHaServer({ rightEye, leftEye, pd: pdMatch[1] });
  }
}
