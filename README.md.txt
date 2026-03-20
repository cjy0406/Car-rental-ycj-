# 汽车租赁平台 - 毕业设计演示

前后端分离的汽车租赁系统，支持多商家入驻、车辆上架、管理员审核、顾客预订。

## 项目简介

本项目是一个基于 Django 和 React 的汽车租赁平台演示系统。  
后端使用 Django + Django REST Framework 提供 API，前端使用 React + Vite 实现动态展示页面，实现完整的前后端分离架构。

## 技术栈

- **后端**：Django 5.x + Django REST Framework + SQLite（开发阶段）
- **前端**：React + Vite + Axios
- **认证**：JWT（Simple JWT）
- **跨域**：CORS
- **其他**：模拟沙盒支付、管理员审核机制、多商家支持

## 项目结构.
├── backend/                  # Django 后端完整项目
│   ├── manage.py
│   ├── car_rental/           # 项目设置
│   ├── vendors/              # 商家 & 车辆模型
│   ├── core/                 # 核心功能
│   ├── venv/                 # 虚拟环境（已忽略）
│   ├── requirements.txt
│   └── ...
├── frontend/                 # React 前端演示页
│   ├── src/
│   │   ├── App.jsx           # 主页面（车辆列表 + 搜索 + 预订）
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── README.md
└── .gitignore


## 如何运行

 ## 1. 后端（Django）

```bash
# 进入后端目录
cd backend

# 创建并激活虚拟环境（如果没有 venv）
python -m venv venv
venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 迁移数据库
python manage.py migrate

# 启动服务器
python manage.py runserver
API 测试地址：
http://127.0.0.1:8000/api/cars/后台管理：
http://127.0.0.1:8000/admin/

## 2. 前端（React）
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
访问地址：
http://localhost:5173/ （端口可能为 5173 或 5174，根据终端输出）


