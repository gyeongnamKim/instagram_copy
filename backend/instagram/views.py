from datetime import  timedelta
from django.utils import timezone
from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer
from django.db.models import Q

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [AllowAny] #FIXME: 인증적용

    def get_queryset(self):
        qs = super().get_queryset()
        qs= qs.filter(
            Q(author=self.request.user) |
            Q(author__in = self.request.user.following_set.all())
        )
        return qs