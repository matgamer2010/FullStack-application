from django import forms

# Lembrar-se de que, os Label's devem ser em português para serem exibidos corretamente na página web
class LoginUsers(forms.Form):
  username_login_form = forms.CharField(
    label= "Usuário",
    required = True,
    max_length= 100,
    widget = forms.TextInput(
      attrs= {
        "class": "InputLoginUser",
        "placeholder": "Digite seu nome de usuário",
      }
    )
  )
  
  password_login_form = forms.CharField(
    label="Senha",
    required=True,
    max_length= 70,
    widget= forms.PasswordInput(
      attrs= {
        "class": "InputLoginPassword",
        "placeholder": "Digite sua Senha",
      }
    )
  )
class RegisterUsers(forms.Form):
  
  styles_user = {"border":"none", "background-color":"red",}  
  username_register_form = forms.CharField(
    label="Insira um Nome que será público aos usuários",
    required=True,
    max_length=100,
    widget= forms.TextInput(
      attrs={
        "class":"UsernameRegister",
        "placeholder":"Escreva o nome do seu usuário",
        "style":styles_user,
      }
    )
  )
  
  styles_email= {"border":"none", "background-color":"red",}
  email_register_form = forms.EmailField(
    label="Insira um Email válido",
    required=True,
    max_length=70,
    widget= forms.EmailInput(
      attrs={
        "class":"InputRegisterEmail",
        "placeholder":"john@xpto.com",
        "style": styles_email,        
      }
    )
  )
  
  styles_password = {"border":"none", "background-color":"red",}
  password_register_form = forms.CharField(
    label= "Digite uma Senha válida",
    required=True,
    min_length=8,
    max_length=70,
    widget=forms.PasswordInput(
      attrs={
        "class":"InputRegisterPassword",
        "style": styles_password,
      }
    )
  )
  
  styles_confirm_password = {"border":"none", "background-color":"red"}
  confirm_password_register_form = forms.CharField(
    label= "Confirme sua Senha",
    required=True,
    min_length=8,
    max_length=70,
    widget=forms.PasswordInput(
      attrs={
        "class":"InputRegisterPassword_2",
        "style": styles_confirm_password,
        }
    )
  )

class ConfirmEmail(forms.Form):

  email_register_form = forms.EmailField(
    label="Insira um Email válido para recuperação",
    required=True,
    max_length=70,
    widget= forms.EmailInput(
      attrs={
        "class":"InputForgetEmail",
      }
    )
  )
  
class ResetPasswordDone(forms.Form):
  
  password_reset_form = forms.CharField(
    label="Insira sua nova senha",
    required=True,
    min_length=8,
    max_length=70,
    widget= forms.PasswordInput(
      attrs={
        "class":"InputResetPassword",
      }
    )
  )
  
  confirm_password_reset_form = forms.CharField(
    label="Confirme sua nova senha",
    required=True,
    min_length=8,
    max_length=70,
    widget= forms.PasswordInput(
      attrs={
        "class":"InputResetPassword_2",
      }
    )
  )
  