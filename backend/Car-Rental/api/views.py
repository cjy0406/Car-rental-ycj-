from rest_framework import generics
from rest_framework.permissions import AllowAny
from vendors.models import Car  # 同樣從 vendors import Car
from .serializers import CarSerializer

class CarListAPIView(generics.ListAPIView):
    queryset = Car.objects.all()  # 先全部顯示，之後可加 filter 如 .filter(approved=True)
    serializer_class = CarSerializer
    permission_classes = [AllowAny]  # 先讓任何人看得到，之後可改成需登入