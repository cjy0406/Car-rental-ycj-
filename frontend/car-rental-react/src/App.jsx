import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');  // 搜索關鍵字
  const [showPayment, setShowPayment] = useState(false);     // 是否顯示支付彈窗
  const [selectedCar, setSelectedCar] = useState(null);      // 當前選中的車輛

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cars/')
      .then(response => {
        setCars(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('無法加載車輛數據，請確認 Django 伺服器正在運行');
        setLoading(false);
      });
  }, []);

  const handleBooking = (car) => {
  setSelectedCar(car);
  setShowPayment(true);
};

  const handlePay = () => {
  alert(`支付成功！\n訂單號：ORDER-${Date.now()}\n車輛：${selectedCar.name || '未知車型'}\n金額：¥${selectedCar.price_per_day || '0.00'}\n（沙盒支付模擬完成，訂單已創建）`);
  setShowPayment(false);
  setSelectedCar(null);
};

  // 過濾車輛（按名稱或類型搜索）
  const filteredCars = cars.filter(car => {
    const searchLower = search.toLowerCase();
    return (
      (car.name || '').toLowerCase().includes(searchLower) ||
      (car.car_type || '').toLowerCase().includes(searchLower)
    );
  });

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>加載中...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '100px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>車輛列表（React 前端演示）</h1>

      {/* 搜索框 */}
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="搜索車輛名稱或類型..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px 15px',
            width: '400px',
            fontSize: '1.1em',
            border: '1px solid #ccc',
            borderRadius: '8px',
            outline: 'none'
          }}
        />
      </div>

      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        從 Django API 動態加載數據，展示前後端分離
      </p>

      {filteredCars.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>
          {search ? '沒有匹配的車輛' : '暫無車輛'}
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredCars.map(car => (
            <div key={car.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <img 
                src={car.image || 'https://via.placeholder.com/300x200?text=無圖片'}
                alt={car.name}
                style={{ 
                  width: '100%',
                  height: 'auto',  // 改成 auto，讓圖片保持原始比例，不變形
                  maxHeight: '220px',  // 限制最大高度，避免太高
                  objectFit: 'contain'  // 改成 contain，完整顯示圖片，不裁剪
                }}
              />
              <h3>{car.name || '未知車型'}</h3>
              <p>類型：{car.car_type || '未分類'}</p>
              <p>年份：{car.model_year || '未知'}</p>
              <p style={{ fontWeight: 'bold', color: '#c0392b' }}>
                每日租金：¥ {car.price_per_day || '0.00'}
              </p>
              <p style={{ color: car.is_available ? 'green' : 'red' }}>
                狀態：{car.is_available ? '可租' : '已租出'}
              </p>
              <button 
                onClick={() => handleBooking(car.name)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: car.is_available ? '#3498db' : '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: car.is_available ? 'pointer' : 'not-allowed'
                }}
                disabled={!car.is_available}
              >
                {car.is_available ? '立即預訂' : '暫不可租'}
              </button>
            </div>
          ))}
        </div>
      )}
      {/* 模擬支付彈窗 */}
{showPayment && selectedCar && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }}>
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '12px',
      width: '400px',
      maxWidth: '90%',
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
    }}>
      <h2 style={{ marginBottom: '20px' }}>支付訂單</h2>
      <p><strong>車輛：</strong>{selectedCar.name || '未知車型'}</p>
      <p><strong>每日租金：</strong>¥ {selectedCar.price_per_day || '0.00'}</p>
      <p><strong>訂單號：</strong>ORDER-{Date.now()}</p>
      <p style={{ color: '#e74c3c', fontWeight: 'bold', margin: '20px 0' }}>
        總金額：¥ {selectedCar.price_per_day || '0.00'}（沙盒模擬）
      </p>

      <button
        onClick={handlePay}
        style={{
          padding: '12px 30px',
          background: '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.2em',
          cursor: 'pointer',
          marginRight: '15px'
        }}
      >
        立即支付
      </button>

      <button
        onClick={() => setShowPayment(false)}
        style={{
          padding: '12px 30px',
          background: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.2em',
          cursor: 'pointer'
        }}
      >
        取消
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default App;