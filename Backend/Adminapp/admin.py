from django.contrib import admin
from .models import Category,ProductModel,ProductWeight,FeaturedProduct,FeaturedBadge,BestDeal
# Register your models here.
admin.site.register(Category)
admin.site.register(ProductModel)
admin.site.register(ProductWeight)
admin.site.register(FeaturedProduct)
admin.site.register(FeaturedBadge)
admin.site.register(BestDeal)