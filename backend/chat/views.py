from django.db.models.query import QuerySet
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.http import HttpResponseRedirect
from django.http.response import Http404, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from .serializers import MessageSerializer, UserSerializer, UserSerializerWithToken
from .models import Message
from django.contrib.auth.models import User


class MessageView(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
    permission_classes = (permissions.AllowAny,)


class MessageRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        print("message get")
        return Message.objects.filter(id=self.kwargs.get('pk', None))


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class HelloView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        serializer_class = MessageSerializer
        content = serializer_class()
        return Response(content.data)


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
