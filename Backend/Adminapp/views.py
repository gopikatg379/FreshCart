from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import *
from .serialiser import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q



# Create your views here.

@api_view(['POST'])
def add_category(request):
    serializer_obj = CategorySerializer(data=request.data)
    if serializer_obj.is_valid():
        serializer_obj.save()
        return Response({'message': 'Category added successfully'}, status=201)
    else:
        return Response(serializer_obj.errors, status=400)


@api_view(['GET'])
def get_all_categories(request):
    categories = Category.objects.all()
    print(categories)
    serializer_obj = CategorySerializer(categories, many=True)
    return Response(serializer_obj.data)


@api_view(['GET'])
def get_one_category(request, id):
    categories = Category.objects.get(category_id=id)
    serializer_obj = CategorySerializer(categories, many=False)
    return Response(serializer_obj.data)


@api_view(['GET'])
def get_all_products(request):
    product = ProductModel.objects.all()
    serializer_obj = ProductSerializer(product, many=True)
    return Response(serializer_obj.data)


@api_view(['GET'])
def get_featured_products(request):
    featured_products = FeaturedProduct.objects.all()
    serializer_obj = FeaturedSerializer(featured_products, many=True)
    return Response(serializer_obj.data)


@api_view(['GET'])
def get_deal_products(request):
    deal_products = BestDeal.objects.all()
    serializer_obj = DealSerializer(deal_products, many=True)
    return Response(serializer_obj.data)


@api_view(['GET'])
def get_cat_product(request, id):
    category = Category.objects.get(category_id=id)
    cat_product = ProductModel.objects.filter(product_category=category.category_id)
    serializer_obj = ProductSerializer(cat_product, many=True)
    return Response(serializer_obj.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request, id):
    user = request.user
    quantity = request.data.get('quantity', 1)
    try:
        product = ProductModel.objects.get(product_id=id)
    except ProductModel.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    try:
        user = CustomModel.objects.get(username=user)
    except CustomModel.DoesNotExist:
        return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
    cart_item_obj = Cart.objects.create(cart_item=product, quantity=quantity, user=user)
    serializer = CartSerializer(cart_item_obj)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    user = request.user
    user_obj = CustomModel.objects.get(username=user)
    cart_item = Cart.objects.filter(user=user_obj.id)
    serializer = CartSerializer(cart_item, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_user(request):
    serializer_obj = CustomModelSerializer(data=request.data)
    if serializer_obj.is_valid():
        serializer_obj.save()
        return Response('user added successfully', status=200)
    else:
        return Response(serializer_obj.errors, status=400)


@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'detail': 'Username and password are required.'}, status=400)

    user = authenticate(username=username, password=password)
    print(user)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        })
    else:
        return Response({'detail': 'Invalid credentials'}, status=401)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_details(request):
    user = request.user
    obj = CustomModel.objects.get(username=user)
    serializer = CustomModelSerializer(obj)
    return Response(serializer.data)


@api_view(['GET'])
def search_products(request):
    query = request.GET.get('search', '').strip()
    print(query)
    if not query:
        # No search term — return all products
        products = ProductModel.objects.all()
    else:
        # Step 1: find matching products
        matched_products = ProductModel.objects.filter(
            Q(product_name__icontains=query) | Q(product_details__icontains=query)
        )

        # Step 2: get categories of matched products
        matched_categories = matched_products.values_list('product_category', flat=True).distinct()

        # Step 3: include all products in those categories
        products = ProductModel.objects.filter(product_category__in=matched_categories)

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)