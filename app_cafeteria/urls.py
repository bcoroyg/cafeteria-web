from django.urls import path
# importar view de app_cafeteria
from app_cafeteria import views

urlpatterns = [
    path('', views.index,name="Home"),
    path('datos/', views.datos, name="datos"),
    path('login', views.login, name="Login"),
    path('register', views.register, name="Register"),
    path('product', views.product, name="Product"),
]