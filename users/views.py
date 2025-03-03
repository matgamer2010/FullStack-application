from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.models import User
from django.urls import reverse, reverse_lazy
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.views import PasswordResetCompleteView, PasswordResetDoneView, PasswordResetView, PasswordChangeView
from django.contrib import auth
from django.utils.timezone import now


from allauth.socialaccount.models import SocialAccount
from django.core.files.base import ContentFile

from Api_Clothes.models import DataBaseClothes
from .forms import LoginUsers, RegisterUsers, ConfirmEmail
from users.forget_email import RetriveAccount


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
                messages.error(
                    request, "O email digitado não existe no nosso sistema.")

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
    redirect("login_form")
    return render(request, "Forms/Logout.html")


def MainPage(request, pk=None ,**kwargs):
    photo_url = ''
    status_user = False
    cards = DataBaseClothes.objects.all()
    if request.user.is_authenticated:
        try:
            # Devemos manter a lógica assim pois, e se o usuário não tiver imagem?, ele vai cair na mesma página de quem não está logado?
            # Ou, e se o usuário acabou de deletar sua conta?, ele deve ser redirecionado para a mesma página padrão?
            social_account = SocialAccount.objects.filter(user=request.user, provider="google").first()
            if social_account: 
                photo_url = social_account.extra_data.get("picture", "")
            # Isso deve permanecer assim (status_user como True), pois nem todos os usuários usarão o allauth.
            status_user = True
        except Exception as e:
            print(f"Houve um erro inesperado, o erro é: {e}")
    return render(request, "Main/FakeMainPage.html", {"each_user_image": photo_url, "StatusUser":status_user, "cards": cards}) 

def ProfileUser(request):
    return render(request, "Main/ProfileUser.html") 

def product(request, foto_id):
    product_request = get_object_or_404(DataBaseClothes, pk=foto_id)
    return render(request, "Main/FakeMainPage.html", {"product": product_request})

class Forget(PasswordResetView):

    template_name = "Emails/Forget.html"
    success_url = "password_reset_done"

    def Get(self, request, user):
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uidb64 = urlsafe_base64_encode(force_bytes(user.id))
        reset_link = request.build_absolute_uri(
            reverse('password_reset_confirm', args=[uidb64, token]))
        return reset_link

    def get(self, request, *args, **kwargs):
        forget_forms = ConfirmEmail()
        return render(request, self.template_name, {"forget": forget_forms})

    def post(self, request, *args, **kwargs):
        forget_forms = ConfirmEmail(request.POST)
        if forget_forms.is_valid():
            email_user = forget_forms.cleaned_data["email_register_form"]
            try:
                if User.objects.filter(email=email_user).exists():
                    user = User.objects.get(email=email_user)
                    reset_link = self.Get(request, user)
                    print(f"A URL criada foi: {reset_link}")
                    try:
                        RetriveAccount.submit_email(user, reset_link)
                        messages.success(request, "Email enviado com sucesso")
                        print("Email enviado!")
                        return redirect(self.success_url)
                    except Exception as e:
                        messages.error(request, f"Erro ao enviar email: {e}")
                else:
                    messages.error(request, "O email digitado não existe.")
            except Exception as e:
                messages.error(request, f"Erro inesperado: {e}")

        return render(request, self.template_name, {"forget": forget_forms})


class ChangePassword_done(PasswordResetDoneView):
    template_name = 'Reset/password_reset_done.html'


class Reset_password(PasswordChangeView):
    template_name = "Emails/Reset.html"
    success_url = "password_reset_completed"

    def Post(self, request, *args, **kwargs):
        # Validar as informações contidas aqui.
        pass


class ChagePassword_completed(PasswordResetCompleteView):
    template_url = 'Reset/password_reset_completed.html'
    success_url = reverse_lazy("login_form")
