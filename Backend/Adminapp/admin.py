from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Category)
admin.site.register(ProductModel)
admin.site.register(ProductWeight)
admin.site.register(FeaturedProduct)
admin.site.register(FeaturedBadge)
admin.site.register(BestDeal)