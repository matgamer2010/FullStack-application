from django.shortcuts import render, redirect
from .forms import LoginUsers, RegisterUsers, Forget
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib import messages

def formLogin(request):
    login_forms = LoginUsers()
    
    if request.method == "POST":
        login_forms = LoginUsers(request.POST)
        if login_forms.is_valid():
            username_form_login = login_forms["username_login_form"].value()
            password_form_login = login_forms["password_login_form"].value()
            
            user = auth.authenticate(
                request,
                username=username_form_login,
                password=password_form_login,
            )
            
            if user is not None:
                messages.success(request, "Login bem-sucedido")
                auth.login(request, user)
                return redirect("http://127.0.0.1:8000/")
            else:
                messages.error(request, "Falha no login")
                

    return render(request, "Forms/Login.html", {"forms":login_forms})

def formRegister(request):
    register_forms = RegisterUsers()
    
    if request.method == "POST":  
        register_forms = RegisterUsers(request.POST)
        if register_forms.is_valid():
            if register_forms.cleaned_data['password_register_form'] != register_forms.cleaned_data['confirm_password_register_form']:
                messages.error(request, "As senhas não são iguais.")
                return render(request, "Forms/Register.html", {"form": register_forms})
            
            name_form_register = register_forms.cleaned_data['username_register_form']
            email_form_register = register_forms.cleaned_data['email_register_form']
            password_form_register = register_forms.cleaned_data['password_register_form']
            
            if User.objects.filter(username=name_form_register).exists():
                messages.error(request, "Já existe um usuário com este nome.")
                return render(request, "Forms/Register.html", {"form": register_forms})
            
            new_user = User.objects.create_user(
                username=name_form_register,
                email=email_form_register,
                password=password_form_register,
            )
            new_user.save()
            return redirect("/forms/login/")
        
    return render(request, "Forms/Register.html", {"form": register_forms})


def Logout(request):
    auth.logout(request)
    messages.success(request, "Você foi deslogado")
    return redirect("login_form")

def Forget(request):
    Forget = Forget()    
    
    return render(request, "Forms/Forget", {"forget":Forget})
