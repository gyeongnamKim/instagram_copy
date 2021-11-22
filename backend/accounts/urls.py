from django.urls import path
from . import views
from django_pydenticon.urls import image as pydenticon_image
from rest_framework_jwt.views import obtain_jwt_token,refresh_jwt_token,verify_jwt_token

urlpatterns = [
    path('signup/',views.SignupView.as_view(),name='login'),
    path('token/',obtain_jwt_token),
    path('token/refresh/',refresh_jwt_token),
    path('token/verify/',verify_jwt_token),
    path('identicon/image/<path:data>.png',pydenticon_image,name="pydenticon_image"),
    path("suggestions/",views.SuggestionListAPIView.as_view(),name="suggestion_user_list"),
]