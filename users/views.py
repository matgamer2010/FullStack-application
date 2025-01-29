from django.shortcuts import render, redirect
from .forms import LoginUsers, RegisterUsers, Forget
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib import messages
from django.urls import reverse
from users.forget_email import RetriveAccount
from django.contrib.auth.tokens import PasswordResetTokenGenerator

token_generator = PasswordResetTokenGenerator()
token = token_generator.make_token(User)

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
    
    forget_form = Forget()
    
    if request.method == 'POST':
        forget_form = Forget(request.POST)
        if forget_form.is_valid():
            try:
                email_user = forget_form["email_register_form"]
                if not User.objects.filter(email=email_user).exists():
                   messages.error(request,"O email digitado não existe no nosso sistema.")
                reset_link = f"{request.build_absolute_uri(reverse('password_reset_confirm', args=[User.id]))}?token={token}"
                RetriveAccount(email_user,reset_link)
                messages.success(request,"Perfeito!, enviamos um link para redefinição de senha no seu Email.")
                return redirect("login_form")
            except Exception as e:
                messages.error(request,f"Houve um erro no envio do seu formulário, o erro é:{e}")
                            
    return render(request, "Email/Forget", {"forget":forget_form})


def Reset(request):
    
    # Aqui, temos que desenvolver apenas a validação da senha do usuário
    # primeiro, verificar se a senha é valida, segundo, se a senha é a mesma que a antiga, depois salvar
    # Lembrar de Ver o que o chat gpt sugeriu, pois há validações importantes lá.
    
    return render(request, "Emails/Reset.html")