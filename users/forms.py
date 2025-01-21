from django import forms

class LoginUsers(forms.Form):
  email_login_form = forms.EmailField(
    label= "email_login_form",
    required = True,
    max_length= 100,
    widget = forms.TextInput(
      attrs= {
        "class": "InputLoginEmail",
        "placeholder": "john@xpto.com",
      }
    )
  )
  password_login_form = forms.CharField(
    label="password_login_form",
    required=True,
    max_length= 70,
    widget= forms.PasswordInput(
      attrs= {
        "class": "InputLoginPassword",
      }
    )
  )
  
class RegisterUsers(forms.Form):
  
  styles_user = {"border":"none", "background-color":"red",}  
  username_register_form = forms.CharField(
    label="username_register_form",
    required=True,
    max_length=100,
    widget= forms.TextInput(
      attrs={
        "class":"username_register",
        "placeholder":"Escreva o nome do seu usuário",
        "style":styles_user,
      }
    )
  )
  
  styles_email= {"border":"none", "background-color":"red",}
  email_register_form = forms.EmailField(
    label="email_register_form",
    required=True,
    max_length=70,
    widget= forms.EmailInput(
      attrs={
        "class":"email_register",
        "placeholder":"john@xpto.com",
        "style": styles_email,        
      }
    )
  )
  
  styles_password = {"border":"none", "background-color":"red",}
  password_register_form = forms.CharField(
    label= "passwrod_register",
    required=True,
    max_length=70,
    widget=forms.PasswordInput(
      attrs={
        "class":"password_register",
        "style": styles_password,
      }
    )
  )
  
  styles_confirm_password = {"border":"none", "background-color":"red"}
  confirm_password_register_form = forms.CharField(
    label= "confirm_passwrod_register",
    required=True,
    max_length=70,
    widget=forms.PasswordInput(
      attrs={
        "class":"confirm_password_register",
        "style": styles_confirm_password,
      }
    )
  )