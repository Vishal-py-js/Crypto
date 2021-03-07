# from django.shortcuts import render
# from .models import WatchList
# from rest_framework.views import APIView
# from rest_framework import generics
# from .serializers import WatchListSerializer
# from rest_framework.permissions import AllowAny, IsAuthenticated


# class WatchListView(generics.ListCreateAPIView):
#     model = WatchList
#     permission_classes = (AllowAny,)
#     queryset = WatchList.objects.all()
#     serializer_class = WatchListSerializer