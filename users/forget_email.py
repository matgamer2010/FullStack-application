from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import get_connection

class RetriveAccount:
    @staticmethod
    def submit_email(user,reset_link_user):
        subject = "Recupere sua senha"
        print("No forget_email.py")
        message = f"Olá {user},\n\nPara redefinir sua senha, clique no link abaixo:\n\n{reset_link_user}\n\nObrigado!"      
        print("Mensagem montada")
        template_name = "Emails/Reset.html"
        print("Template carregado")
        context = {
            "user":user,
            "reset_link":reset_link_user,
            
        }
        print("Contexto montado")
        
        html_message_content = render_to_string(template_name, context)
        
        print("Mensagem renderizada")
        plain_message = strip_tags(html_message_content)
        print("Mensagem limpa")
        
        conn = get_connection(backend="django.core.mail.backends.console.EmailBackend")
        print(f"Conexão configurada manualmente, veja o email:{str(conn)}") 
        
        send_mail(
            subject,
            message,
            plain_message,
            print("Enviando a mensagem limpa"),
            settings.DEFAULT_FROM_EMAIL,
            print("Enviando o email"),
            [user.email],
            print("Capturando o email do usuário"),
            html_message =  html_message_content,
        )
        print("Email enviado - forget_email.py")