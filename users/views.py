from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User
from django.urls import reverse
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.conf import settings
from django.core.mail import send_mail
from django.http import HttpResponse
from .forms import LoginUsers, RegisterUsers, ForgetPassword, ResetPassword
from users.forget_email import RetriveAccount
from django.contrib import auth


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
                auth.login(request, user)
                messages.success(request, "Login bem-sucedido")
                return redirect("http://127.0.0.1:8000/")
            else:
                messages.error(request,"O email digitado não existe no nosso sistema.")


    return render(request, "Forms/Login.html", {"forms": login_forms})


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
    
    token_generator = PasswordResetTokenGenerator()
    def create_reset_link(request, user_id):
        id_url = User.objects.get(id=user_id)
        token = token_generator.make_token(id_url)
        uidb64 = urlsafe_base64_encode(force_bytes(id_url.id))
        reset_link = f"{request.build_absolute_uri(reverse('password_reset_confirm', args=[uidb64, token]))}"
        reset_link_done = f"{request.build_absolute_uri(reverse('password_reset_done', args=[uidb64, token]))}"
        return reset_link

    def create_done_link(request, user_id):
        id_url = User.objects.get(id=user_id) 
        token = token_generator.make_token(id_url)
        uidb64 = urlsafe_base64_encode(force_bytes(id_url.id))
        reset_link_done = f"{request.build_absolute_uri(reverse('password_reset_done', args=[uidb64, token]))}"
        return reset_link_done    


    forget_form = ForgetPassword()
    
    if request.method == 'POST':
        forget_form = ForgetPassword(request.POST)
        if forget_form.is_valid():
            try:

                email_user = forget_form.cleaned_data["email_register_form"] 

                if User.objects.filter(email=email_user).exists():                
                    user = User.objects.get(email=email_user)
                    user_id = user.id
                    reset_link_user = create_reset_link(request, user_id)  
                    
                    done_link_user = create_done_link(request, user_id)
                    print(f"A url para indicar a finalização da redifinição da senha é: {done_link_user}")
                    print(f"A url criada é: {reset_link_user}") 
                    try:
                        RetriveAccount.submit_email(user, reset_link_user)
                        print("Email enviado com sucesso")
                        messages.success(request, "Email enviado com sucesso")
                        return redirect("login_form")
                    except Exception as e:
                        messages.error(request, "Erro ao enviar email")
                        print(f"Erro no envio do email, o erro é: {e}") 
                        return redirect("forget")
                else:
                    print("O email digitado não existe no nosso sistema. Erro 1")
                    return redirect("forget")
            
            except:
                print("O email digitado não existe no nosso sistema. Erro 5")
                return redirect("forget")
                            
    return render(request, "Emails/Forget.html", {"forget":forget_form})


def Reset(request):
    def create_reset_link(request, user_id):
        token_generator = PasswordResetTokenGenerator()
        id_url = User.objects.get(id=user_id)
        token = token_generator.make_token(id_url)
        uidb64 = urlsafe_base64_encode(force_bytes(id_url.id))
        reset_link = f"{request.build_absolute_uri(reverse('password_reset_done', args=[uidb64, token]))}"
        return reset_link
    reset_password = ResetPassword()
    # Aqui, temos que desenvolver apenas a validação da senha do usuário
    # Primeiro, verificar se a senha é valida, segundo, se a senha é a mesma que a antiga, depois salvar
    # Lembrar de Ver o que o chat gpt sugeriu, pois há validações importantes lá.
    
    
    return render(request, "Emails/Reset.html", {"reset":reset_password})


def test_email(request):
    subject = "Teste de Email"
    message = "Esse é um teste simples de envio de email pelo Django."
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        ["matgamer297@gmail.com"],  
    )
    return HttpResponse("Teste de envio de email concluído!")