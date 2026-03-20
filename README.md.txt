# 汽车租赁平台 - 毕业设计演示

前后端分离的汽车租赁系统，支持多商家入驻、车辆上架、管理员审核、顾客预订。

## 项目简介

本项目采用 **前后端分离** 架构：
- 后端：Django + Django REST Framework，提供 RESTful API
- 前端：React + Vite，实现动态车辆展示与交互
- 数据库：SQLite（开发阶段），后期可切换 MySQL
- 认证：JWT（Simple JWT）
- 支付：沙盒模拟

## 技术栈

- 后端：Django 5.x + DRF + SQLite
- 前端：React + Vite + Axios
- 认证：JWT
- 跨域：CORS
- UI：原生 CSS + Bootstrap（可选）

## 项目结构
.
├── backend/                  # Django 后端
│   ├── manage.py
│   ├── car_rental/
│   ├── vendors/
│   └── ...
├── frontend/                 # React 前端演示页
│   ├── src/
│   │   ├── App.jsx           # 车辆列表 + 搜索 + 预订
│   │   └── ...
│   └── package.json
└── README.md


## 如何运行

### 后端

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
API：http://127.0.0.1:8000/api/cars/后台：http://127.0.0.1:8000/admin/

前端
cd frontend
npm install
npm run dev
访问：http://localhost:5173/

