from rest_framework import serializers
from vendors.models import Car  # ← 正確 import，從 vendors app 拿 Car

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'  # 先輸出所有欄位，方便測試
        # 如果想指定欄位（推薦，避免輸出不必要的如 vendor 的完整資料）：
        # fields = ['id', 'name', 'description', 'image', 'car_type', 'vendor', 'price_per_day', 'year']  
        # （根據你的實際欄位調整）