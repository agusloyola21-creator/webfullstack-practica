
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Post, ViewCount
from apps.category.models import Category
from .serializers import PostSerializer, PostListSerializer
from .pagination import SmallSetPagination,LargeSetPagination,MediumSetPagination
from django.db.models import Q

class BlogListViews(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Post.postobjects.all().exists():
            post = Post.postobjects.all()

            paginator = SmallSetPagination()
            result = paginator.paginate_queryset(post, request)
            serilizer = PostListSerializer(result, many=True)
            

            
            return paginator.get_paginated_response({"post": serilizer.data})
            
        else:
            return Response({'error':'No post found'}, status=status.HTTP_404_NOT_FOUND)
        
class ListPostByCategory(APIView):
    permission_classes = (permissions.AllowAny,)
 
    def get(self, request, format=None):
        if Post.postobjects.all().exists():
            slug = request.query_params.get('slug')
            category = Category.objects.get(slug=slug)

            if not category.parent: # si no tiene categorias padres significa ella es la categoria padre y hay que listarla junto con sus hijas
                categories = [category] + list(category.children.all())
                post = Post.postobjects.filter(category__in = categories)
            else:
                post = Post.postobjects.filter(category=category)

            paginator = SmallSetPagination()
            result = paginator.paginate_queryset(post, request)
            serializer = PostListSerializer(result, many=True)
            return paginator.get_paginated_response({"post": serializer.data})
        else:
            return Response({'error':'No post found'}, status=status.HTTP_404_NOT_FOUND)
            
class PostDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, slug, format=None):
        try:
            post = Post.postobjects.get(slug = slug)
        except Post.DoesNotExist:
            return Response({'error': 'Post does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        # serializar el post

        serializer = PostSerializer(post)

        # Obtener IP del usuario

        address = request.META.get('HTTP_X_FORWARDED_FOR')
        ip = address.split(',')[-1].strip() if address else request.META.get('REMOSTE_ADDR')

            # address.split(','): Devuelve una lista de strings.
            # [-1]: Accede al último elemento de esa lista (un string).
            # .strip(): Elimina espacios en blanco del string y devuelve el string resultante.

        # Registra la vista si aun no fue contada desde esa IP

        if not ViewCount.objects.filter(post = post , ip_address= ip).exists():
            ViewCount.objects.create(post=post, ip_address=ip)
            post.views += 1 
            post.save()
        
        return Response({'post': serializer.data}, status = status.HTTP_200_OK)

class SearchBlogView(APIView):
    def get(self, request, format=None):
        search_term = request.query_params.get('s').strip()   #strip() elimina espaciois en blanco
        
        if not search_term:
            return Response({'error':'Search term not provided'}, status=status.HTTP_400_BAD_REQUEST)

        matches = Post.postobjects.filter(
            Q(title__icontains=search_term) |
            Q(description__icontains=search_term)|
            Q(category__name__icontains=search_term)
        ).distinct() #distinct() elimina post que se repiten

        paginator = SmallSetPagination()
        result = paginator.paginate_queryset(matches, request)
        serializer = PostListSerializer(result, many=True)


        print(matches )
        return paginator.get_paginated_response({"post": serializer.data})
   