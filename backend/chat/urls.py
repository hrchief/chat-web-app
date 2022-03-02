from django.urls import path
from .views import current_user, UserList, MessageRetrieveUpdateDestroyAPI

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('<int:pk>', MessageRetrieveUpdateDestroyAPI.as_view())
]
