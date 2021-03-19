from django.shortcuts import render
from django.http import JsonResponse
import json

# Create your views here.

def index(request):
    return render(request, "app_cafeteria/index.html")

def login(request):
    return render(request, "app_cafeteria/login.html")

def register(request):
    return render(request, "app_cafeteria/register.html")
    
def product(request):
    return render(request, "app_cafeteria/product.html")

def datos(request):
    archivoJson = open("static/datos.json", "r")
    data = json.load(archivoJson)
    return JsonResponse(data, safe=False)

def listar_usuarios(request):
    producto = Producto
